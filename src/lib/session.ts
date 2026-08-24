export type CellSession = {
  team: string;
  members: string;
  startedAt: number;
  admin: boolean;
};

export const SESSION_COOKIE = "yggs";

export function encodeSession(session: CellSession): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(session))));
}

export function decodeSession(raw: string | undefined): CellSession | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(raw))));
    if (
      typeof parsed.team !== "string" ||
      typeof parsed.startedAt !== "number"
    )
      return null;
    return {
      team: parsed.team,
      members: String(parsed.members ?? "5"),
      startedAt: parsed.startedAt,
      admin: Boolean(parsed.admin),
    };
  } catch {
    return null;
  }
}
