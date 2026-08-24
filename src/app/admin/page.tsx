"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tasks } from "../../lib/tasks";

export default function AdminPage() {
  const [team, setTeam] = useState("TEAM UNNAMED");
  const [members, setMembers] = useState("5");
  const [solved, setSolved] = useState<string[]>([]);
  const [cells, setCells] = useState<
    Array<{
      team: string;
      members: string;
      score: number;
      solved: number;
      online: boolean;
    }>
  >([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data.session?.admin) {
          window.location.href = "/dashboard";
          return;
        }
        setTeam(localStorage.getItem("yggdrasil-team") ?? "TEAM UNNAMED");
        setMembers(localStorage.getItem("yggdrasil-members") ?? "5");
        setSolved(JSON.parse(localStorage.getItem("yggdrasil-solved") ?? "[]"));
      })
      .catch(() => {
        window.location.href = "/";
      });
  }, []);
  useEffect(() => {
    const load = () =>
      fetch("/api/cells")
        .then((res) => res.json())
        .then((data) => setCells(data.cells ?? []))
        .catch(() => {});
    load();
    const poll = window.setInterval(load, 4000);
    return () => window.clearInterval(poll);
  }, []);
  function patchCell(team: string, score: number) {
    fetch("/api/cells", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team, score }),
    }).catch(() => {});
  }
  function resetCell(team: string) {
    fetch("/api/cells", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team, reset: true }),
    }).catch(() => {});
  }
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
          <span className="brand-mark">ᛦ</span> YGGDRASIL
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
          <div className="terminal-label">// LIVE CELLS / ACTIVE SESSIONS</div>
          <div className="admin-grid">
            <div className="table-head">
              <span>STATUS</span>
              <span>CELL</span>
              <span>SOLVED</span>
              <span>SCORE CONTROL</span>
            </div>
            {cells.length === 0 && (
              <div className="admin-row">
                <span>—</span>
                <div className="admin-task">
                  <strong>NO SESSIONS DETECTED</strong>
                  <small>waiting for cells to register…</small>
                </div>
                <small>—</small>
                <b>—</b>
              </div>
            )}
            {cells.map((cell) => (
              <div className="admin-row" key={cell.team}>
                <span className={cell.online ? "green" : ""}>
                  {cell.online ? "● ONLINE" : "○ OFFLINE"}
                </span>
                <div className="admin-task">
                  <strong>{cell.team}</strong>
                  <small>{cell.members} OPERATORS</small>
                </div>
                <small>{cell.solved} / 5</small>
                <div className="score-control">
                  <b>{cell.score}</b>
                  <button
                    type="button"
                    onClick={() => patchCell(cell.team, cell.score - 25)}
                    aria-label={`deduct 25 from ${cell.team}`}
                  >
                    -25
                  </button>
                  <button
                    type="button"
                    onClick={() => patchCell(cell.team, cell.score + 25)}
                    aria-label={`add 25 to ${cell.team}`}
                  >
                    +25
                  </button>
                  <input
                    value={drafts[cell.team] ?? ""}
                    placeholder="set"
                    inputMode="numeric"
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [cell.team]: event.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const parsed = Number(drafts[cell.team]);
                      if (Number.isFinite(parsed))
                        patchCell(cell.team, parsed);
                      setDrafts((current) => ({
                        ...current,
                        [cell.team]: "",
                      }));
                    }}
                  >
                    SET
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => resetCell(cell.team)}
                  >
                    RESET
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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
              <span>STATUS</span>
              <span>SCORE</span>
            </div>
            {cells.length === 0 && (
              <div className="admin-row">
                <span>—</span>
                <div className="admin-task">
                  <strong>NO CELLS REGISTERED</strong>
                </div>
                <small>—</small>
                <b>—</b>
              </div>
            )}
            {cells.map((cell) => (
              <div className="admin-row" key={cell.team}>
                <span>{cell.online ? "●" : "○"}</span>
                <div className="admin-task">
                  <strong>{cell.team}</strong>
                  <small>{cell.members} OPERATORS</small>
                </div>
                <small className={cell.online ? "green" : ""}>
                  {cell.online ? "ONLINE" : "OFFLINE"}
                </small>
                <b>{cell.score} PTS</b>
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
