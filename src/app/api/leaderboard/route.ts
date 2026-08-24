import { NextResponse } from "next/server";
import { allCells, isOnline } from "@/lib/cells";
import { tasks } from "@/lib/tasks";

// Public leaderboard: ranked by score, then by time for ties.
export async function GET() {
  const cells = await allCells();
  const rows = cells
    .filter((cell) => !cell.admin)
    .map((cell) => ({
      team: cell.team,
      members: cell.members,
      score: cell.score,
      solved: cell.solved.length,
      total: tasks.length,
      online: isOnline(cell),
      finished: Boolean(cell.finishedAt),
      elapsed: Math.max(
        0,
        (cell.finishedAt ?? Date.now()) - cell.startedAt,
      ),
    }));
  rows.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.elapsed !== b.elapsed) return a.elapsed - b.elapsed;
    return a.team.localeCompare(b.team);
  });
  return NextResponse.json({
    cells: rows.map((row, index) => ({ rank: index + 1, ...row })),
  });
}
