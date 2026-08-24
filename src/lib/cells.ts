export type Cell = {
  team: string;
  members: string;
  score: number;
  solved: string[];
  startedAt: number;
  lastSeen: number;
  admin: boolean;
  active: boolean;
};

const ONLINE_WINDOW_MS = 60_000;

const memory = new Map<string, Cell>();

export const kvEnabled = Boolean(
  (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
);

const key = (team: string) => `cell:${team.toLowerCase()}`;

export async function putCell(cell: Cell): Promise<void> {
  if (!kvEnabled) {
    memory.set(key(cell.team), cell);
    return;
  }
  const { kv } = await import("@vercel/kv");
  await kv.set(key(cell.team), cell);
}

export async function getCell(team: string): Promise<Cell | null> {
  if (!kvEnabled) return memory.get(key(team)) ?? null;
  const { kv } = await import("@vercel/kv");
  return ((await kv.get(key(team))) as Cell | null) ?? null;
}

export async function allCells(): Promise<Cell[]> {
  if (!kvEnabled) return [...memory.values()];
  const { kv } = await import("@vercel/kv");
  const keys = await kv.keys("cell:*");
  const cells = await Promise.all(keys.map((k) => kv.get<Cell>(k)));
  return cells.filter((c): c is Cell => Boolean(c));
}

export async function delCell(team: string): Promise<void> {
  if (!kvEnabled) {
    memory.delete(key(team));
    return;
  }
  const { kv } = await import("@vercel/kv");
  await kv.del(key(team));
}

export function isOnline(cell: Cell): boolean {
  return cell.active && Date.now() - cell.lastSeen < ONLINE_WINDOW_MS;
}
