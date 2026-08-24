"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tasks } from "../../lib/tasks";
import { teams } from "../../lib/teams";

export default function AdminPage() {
  const [team, setTeam] = useState("TEAM UNNAMED");
  const [members, setMembers] = useState("5");
  const [solved, setSolved] = useState<string[]>([]);
  useEffect(() => {
    if (!localStorage.getItem("yggdrasil-admin")) {
      window.location.href = "/";
      return;
    }
    setTeam(localStorage.getItem("yggdrasil-team") ?? "TEAM UNNAMED");
    setMembers(localStorage.getItem("yggdrasil-members") ?? "5");
    setSolved(JSON.parse(localStorage.getItem("yggdrasil-solved") ?? "[]"));
  }, []);
  const progress = Math.round((solved.length / tasks.length) * 100);
  function resetSession() {
    localStorage.removeItem("yggdrasil-solved");
    localStorage.removeItem("yggdrasil-team");
    localStorage.removeItem("yggdrasil-members");
    window.location.href = "/";
  }
  function exitRoot() {
    localStorage.removeItem("yggdrasil-admin");
    window.location.href = "/dashboard";
  }
  function markAll() {
    localStorage.setItem(
      "yggdrasil-solved",
      JSON.stringify(tasks.map((task) => task.id)),
    );
    if (!localStorage.getItem("yggdrasil-end"))
      localStorage.setItem("yggdrasil-end", String(Date.now()));
    setSolved(tasks.map((task) => task.id));
  }
  return (
    <main className="terminal-page admin-page">
      <header className="terminal-header">
        <Link href="/dashboard" className="brand">
          <span className="brand-mark">Y</span> YGGDRASIL
        </Link>
        <span>ROOT CHANNEL // RESTRICTED</span>
        <span className="window-state">CLEARANCE: ODIN</span>
      </header>

      <section className="scoreboard-intro">
        <p className="eyebrow">HIDDEN NODE // ROOT VISIBILITY</p>
        <h1>ADMIN CONSOLE</h1>
        <p>
          Full root visibility. Every layer, every fragment, every answer. This
          channel does not exist.
        </p>
      </section>

      <section className="admin-sections">
        <div className="admin-panel">
          <div className="terminal-label">// SESSION</div>
          <div className="admin-session">
            <div>
              <span>CELL</span>
              <b>{team}</b>
            </div>
            <div>
              <span>OPERATORS</span>
              <b>{members}</b>
            </div>
            <div>
              <span>BUFFER</span>
              <b>
                {solved.length} / {tasks.length} ({progress}%)
              </b>
            </div>
            <div>
              <span>CHANNEL</span>
              <b className="green">ROOT</b>
            </div>
          </div>
          <div className="admin-controls">
            <button type="button" onClick={markAll}>
              MARK ALL RECOVERED
            </button>
            <button type="button" onClick={resetSession}>
              RESET SESSION
            </button>
            <button type="button" onClick={exitRoot}>
              EXIT ROOT
            </button>
          </div>
        </div>

        <div className="admin-panel">
          <div className="terminal-label">// ANSWER KEY / ROUND 01 MIDGARD</div>
          <div className="admin-grid">
            <div className="table-head">
              <span>ID</span>
              <span>TASK</span>
              <span>FRAGMENT</span>
              <span>ANSWER</span>
            </div>
            {tasks.map((task) => (
              <div className="admin-row" key={task.id}>
                <span className={solved.includes(task.id) ? "green" : ""}>
                  {task.id}
                </span>
                <div className="admin-task">
                  <strong>{task.title}</strong>
                  <small>
                    {task.layers} · {task.points} PTS · HINT: {task.hint}
                  </small>
                </div>
                <small>{solved.includes(task.id) ? task.fragment : "--:--"}</small>
                <b>{task.answer}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="terminal-label">// ALL CELL TELEMETRY</div>
          <div className="admin-grid">
            <div className="table-head">
              <span>RANK</span>
              <span>CELL</span>
              <span>PROGRESS</span>
              <span>SCORE</span>
            </div>
            {teams.map(([rank, name, score, prog]) => (
              <div className="admin-row" key={name}>
                <span>{rank}</span>
                <div className="admin-task">
                  <strong>{name}</strong>
                </div>
                <small>{prog}</small>
                <b>{score} PTS</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="dashboard-footer">
        <Link href="/dashboard">{"<- TASK MAP"}</Link>
        <span>YGGDRASIL AI // ROOT ACCESS LOGGED</span>
      </footer>
    </main>
  );
}
