import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  decodeSession,
  encodeSession,
  type CellSession,
} from "@/lib/session";
import { delCell, getCell, putCell } from "@/lib/cells";
import { tasks } from "@/lib/tasks";

const SEVEN_DAYS = 60 * 60 * 24 * 7;

export async function GET(request: Request) {
  const session = decodeSession(
    (await cookies()).get(SESSION_COOKIE)?.value,
  );
  return NextResponse.json({ session });
}

export async function POST(request: Request) {
  let body: { team?: string; members?: string; admin?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "BAD PAYLOAD" }, { status: 400 });
  }
  const team = String(body.team ?? "TEAM UNNAMED").toUpperCase().slice(0, 24);
  const members = String(body.members ?? "5");
  const admin = Boolean(body.admin);
  const session: CellSession = {
    team,
    members,
    startedAt: Date.now(),
    admin,
  };

  const existing = await getCell(team);
  await putCell({
    team,
    members,
    score: existing?.score ?? 0,
    solved: existing?.solved ?? [],
    startedAt: session.startedAt,
    lastSeen: Date.now(),
    admin,
    active: true,
  });

  const response = NextResponse.json({ session });
  response.cookies.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: SEVEN_DAYS,
  });
  return response;
}

export async function DELETE(request: Request) {
  const session = decodeSession(
    (await cookies()).get(SESSION_COOKIE)?.value,
  );
  if (session && !session.admin) {
    const cell = await getCell(session.team);
    if (cell) {
      const solved = cell.solved.length;
      const score =
        solved === tasks.length
          ? cell.score
          : Math.round((cell.score * 3) / 4);
      await putCell({ ...cell, score, active: false, lastSeen: Date.now() });
    } else {
      await delCell(session.team);
    }
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
