"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useState } from "react";

type Row = {
  rank: number;
  team: string;
  members: string;
  score: number;
  solved: number;
  total: number;
  online: boolean;
  finished: boolean;
  elapsed: number;
};

function clock(ms: number) {
  const total = Math.floor(ms / 1000);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function ScoreboardPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [team, setTeam] = useState("TEAM UNNAMED");
  useEffect(() => {
    setTeam(localStorage.getItem("yggdrasil-team") ?? "TEAM UNNAMED");
    const load = () =>
      fetch("/api/leaderboard")
        .then((res) => res.json())
        .then((data) => setRows(data.cells ?? []))
        .catch(() => {});
    load();
    const poll = window.setInterval(load, 5000);
    return () => window.clearInterval(poll);
  }, []);
  return (
    <main className="terminal-page scoreboard-page">
      <header className="terminal-header">
        <Link href="/dashboard" className="brand">
          <span className="brand-mark">Y</span> YGGDRASIL
        </Link>
        <span>TEAM TELEMETRY / LIVE</span>
        <span>ROUND 01 // MIDGARD</span>
      </header>
      <section className="scoreboard-intro">
        <p className="eyebrow">PUBLIC CHANNEL // STANDINGS</p>
        <h1>TEAM SCOREBOARD</h1>
        <p>
          Concurrent operator cells. Shared fragments. Ranked on points, then
          time. One sequence reaches the root first.
        </p>
      </section>
      <section className="score-table">
        <div className="table-head">
          <span>RANK</span>
          <span>CELL</span>
          <span>PROGRESS</span>
          <span>TIME</span>
          <span>SCORE</span>
        </div>
        {rows.length === 0 && (
          <div className="standing empty-standing">
            <span>--</span>
            <strong>NO CELLS REGISTERED</strong>
            <small>awaiting first transmission</small>
            <b>0 PTS</b>
          </div>
        )}
        {rows.map((row) => (
          <div
            className={
              row.team === team ? "standing your-team" : "standing"
            }
            key={row.team}
          >
            <span>
              {row.rank}
              {row.online && <i className="live-dot" aria-label="online" />}
            </span>
            <strong>
              {row.team}
              {row.finished && <em className="finished-mark"> ROOT CLEARED</em>}
            </strong>
            <small>
              {row.solved} / {row.total}
            </small>
            <small className="mono">{clock(row.elapsed)}</small>
            <b>{row.score} PTS</b>
          </div>
        ))}
      </section>
      <footer className="dashboard-footer">
        <Link href="/dashboard">&lt;- TASK MAP</Link>
        <span>YGGDRASIL AI // STANDINGS ARE NOT FINAL</span>
      </footer>
    </main>
  );
}
