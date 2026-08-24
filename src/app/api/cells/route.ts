import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/lib/session";
import { allCells, getCell, isOnline, putCell } from "@/lib/cells";

async function requireAdmin(request: Request) {
  const session = decodeSession(
    (await cookies()).get(SESSION_COOKIE)?.value,
  );
  return session?.admin ? session : null;
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request)))
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const cells = await allCells();
  return NextResponse.json({
    cells: cells
      .filter((cell) => !cell.admin)
      .map((cell) => ({
        team: cell.team,
        members: cell.members,
        score: cell.score,
        solved: cell.solved.length,
        online: isOnline(cell),
        lastSeen: cell.lastSeen,
      })),
  });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin(request)))
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  let body: { team?: string; score?: number; reset?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "BAD PAYLOAD" }, { status: 400 });
  }
  const team = String(body.team ?? "");
  const cell = await getCell(team);
  if (!cell)
    return NextResponse.json({ error: "NO CELL" }, { status: 404 });
  if (body.reset) {
    await putCell({ ...cell, score: 0, solved: [], lastSeen: Date.now() });
  } else if (typeof body.score === "number") {
    await putCell({
      ...cell,
      score: Math.max(0, Math.round(body.score)),
      lastSeen: Date.now(),
    });
  }
  return NextResponse.json({ ok: true });
}
