import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/lib/session";
import { getCell, putCell } from "@/lib/cells";
import { tasks } from "@/lib/tasks";

export async function POST(request: Request) {
  const session = decodeSession(
    (await cookies()).get(SESSION_COOKIE)?.value,
  );
  if (!session)
    return NextResponse.json({ error: "NO SESSION" }, { status: 401 });

  const cell = await getCell(session.team);
  if (!cell)
    return NextResponse.json({ error: "NO CELL" }, { status: 404 });

  let body: { solved?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    /* heartbeat only */
  }

  const solved = Array.isArray(body.solved) ? body.solved : cell.solved;
  const score = tasks
    .filter((task) => solved.includes(task.id))
    .reduce((sum, task) => sum + task.points, 0);

  await putCell({
    ...cell,
    solved,
    score,
    finishedAt:
      solved.length === tasks.length
        ? (cell.finishedAt ?? Date.now())
        : undefined,
    lastSeen: Date.now(),
  });
  return NextResponse.json({ ok: true, score, solved });
}
