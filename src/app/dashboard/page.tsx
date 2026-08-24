"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useState } from "react";
import { tasks } from "@/lib/tasks";

export default function Dashboard() {
  const [team, setTeam] = useState("TEAM UNNAMED");
  const [members, setMembers] = useState("5");
  const [solved, setSolved] = useState<string[]>([]);
  const [admin, setAdmin] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [finalElapsed, setFinalElapsed] = useState<number | null>(null);
  const [keyRevealed, setKeyRevealed] = useState(false);
  useEffect(() => {
    setTeam(localStorage.getItem("yggdrasil-team") ?? "TEAM UNNAMED");
    setMembers(localStorage.getItem("yggdrasil-members") ?? "5");
    setSolved(JSON.parse(localStorage.getItem("yggdrasil-solved") ?? "[]"));
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => setAdmin(Boolean(data.session?.admin)))
      .catch(() => {});
    const start = Number(
      localStorage.getItem("yggdrasil-start") ?? Date.now(),
    );
    const end = localStorage.getItem("yggdrasil-end");
    if (end) {
      setFinalElapsed(Number(end) - start);
      return;
    }
    const solvedNow = JSON.parse(
      localStorage.getItem("yggdrasil-solved") ?? "[]",
    ) as string[];
    if (solvedNow.length >= tasks.length) {
      setFinalElapsed(Date.now() - start);
      return;
    }
    const tick = () => setElapsed(Date.now() - start);
    tick();
    const timer = window.setInterval(tick, 1000);
    const beat = () =>
      fetch("/api/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solved }),
      }).catch(() => {});
    beat();
    const hb = window.setInterval(beat, 20_000);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(hb);
    };
  }, []);
  const progress = Math.round((solved.length / tasks.length) * 100);
  const complete = solved.length === tasks.length;
  const score = tasks
    .filter((task) => solved.includes(task.id))
    .reduce((sum, task) => sum + task.points, 0);
  const shownElapsed = finalElapsed ?? elapsed;
  const clock = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  const masterKey = `MIDGARD-ROOT :: ${tasks
    .map((task) => task.fragment.replace("MID-", ""))
    .join(" · ")}`;
  function logout() {
    ["yggdrasil-team", "yggdrasil-members", "yggdrasil-solved", "yggdrasil-start", "yggdrasil-end", "yggdrasil-admin"].forEach((k) =>
      localStorage.removeItem(k),
    );
    fetch("/api/session", { method: "DELETE" }).finally(() =>
      window.location.href = "/",
    );
  }
  return (
    <main className="terminal-page fragment-dashboard">
      <header className="terminal-header">
        <Link href="/" className="brand">
          <span className="brand-mark">ᛦ</span> YGGDRASIL
        </Link>
        <span>DEMO ROUND 01 / MIDGARD</span>
        {admin ? (
          <span className="admin-badge">CLEARANCE: ODIN</span>
        ) : (
          <span>
            {team} // {members} OPERATORS
          </span>
        )}
        <button
          type="button"
          className="logout-button"
          onClick={logout}
        >
          LOGOUT
        </button>
      </header>

      <section className="map-head">
        <div className="map-title">
          <p className="eyebrow">SESSION ACTIVE // TEAM CHANNEL</p>
          <h1>FRAGMENT MAP</h1>
          <p className="map-sub">
            Five signals feed one sequence. Every recovered fragment changes the
            route to root.
          </p>
        </div>
        <div className="map-buffer">
          <span>
            SHARED BUFFER / {solved.length} OF {tasks.length}
          </span>
          <b>{progress}%</b>
          <div className="map-meter">
            <i style={{ width: `${progress}%` }} />
          </div>
          <small>SEQUENCE STATUS: {complete ? "COMPLETE" : "INCOMPLETE"}</small>
          <small>
            SESSION CLOCK / {clock(shownElapsed)}
            {complete ? " // FINAL" : ""}
          </small>
        </div>
      </section>

      {complete && (
        <section className="root-cleared">
          <p className="eyebrow">ALL FRAGMENTS RECOVERED // SEQUENCE WHOLE</p>
          <h2>ROOT NODE CLEARED</h2>
          <p className="cleared-copy">
            The gate recognizes the cell. One key remains behind the root.
          </p>
          <div className="cleared-stats">
            <span>
              TIME <b>{clock(shownElapsed)}</b>
            </span>
            <span>
              SCORE <b>{score} PTS</b>
            </span>
          </div>
          {keyRevealed ? (
            <b className="master-key">{masterKey}</b>
          ) : (
            <button
              type="button"
              className="master-unlock"
              onClick={() => setKeyRevealed(true)}
            >
              UNLOCK MASTER KEY
            </button>
          )}
        </section>
      )}

      <section className="topo-strip" aria-hidden>
        <span className="topo-label">ENTRY</span>
        <i className="topo-line" />
        <div className="topo-nodes">
          {tasks.map((task) => (
            <i
              key={task.id}
              className={`topo-node ${
                solved.includes(task.id) ? "recovered" : ""
              }`}
            />
          ))}
        </div>
        <i className="topo-line" />
        <span className={`topo-gate ${complete ? "open" : ""}`}>
          ROOT {complete ? "OPEN" : "LOCKED"}
        </span>
      </section>

      <section className="signal-list">
        {tasks.map((task) => {
          const done = solved.includes(task.id);
          return (
            <Link
              className={`signal-row ${done ? "recovered" : ""}`}
              href={`/tasks/${task.id}`}
              key={task.id}
            >
              <span className="signal-id">{task.id}</span>
              <i className="signal-dot" />
              <div className="signal-body">
                <strong>{task.title}</strong>
                <small>{task.layers}</small>
              </div>
              <b className="signal-value">
                {done ? task.fragment : `${task.points} PTS`}
              </b>
              <span className="signal-arrow">-&gt;</span>
            </Link>
          );
        })}
      </section>

      <section className="map-rail">
        <span>CELL / {team}</span>
        <span>{members} OPERATORS</span>
        <span>INTEGRITY NOMINAL</span>
        <span>GATE {complete ? "KEY COMPLETE" : "AWAITING KEY"}</span>
        {admin && <Link href="/admin">ROOT CONSOLE -&gt;</Link>}
        <Link href="/scoreboard">PUBLIC TELEMETRY -&gt;</Link>
      </section>

      <footer className="dashboard-footer">
        <Link href="/tasks/03">RESUME SIGNAL -&gt;</Link>
        <Link href="/briefing">BRIEFING</Link>
        <span>RATATOSKR // CHANNEL OPEN</span>
      </footer>
    </main>
  );
}
