"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useState } from "react";
import { teams } from "@/lib/teams";

export default function ScoreboardPage() {
  const [team, setTeam] = useState("TEAM UNNAMED");
  useEffect(
    () => setTeam(localStorage.getItem("yggdrasil-team") ?? "TEAM UNNAMED"),
    [],
  );
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
          Concurrent operator cells. Shared fragments. One sequence reaches the
          root first.
        </p>
      </section>
      <section className="score-table">
        <div className="table-head">
          <span>RANK</span>
          <span>CELL</span>
          <span>BUFFER</span>
          <span>SCORE</span>
        </div>
        {teams.map(([rank, name, score, progress]) => (
          <div
            className={name === team ? "standing your-team" : "standing"}
            key={name}
          >
            <span>{rank}</span>
            <strong>{name}</strong>
            <small>{progress}</small>
            <b>{score} PTS</b>
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
