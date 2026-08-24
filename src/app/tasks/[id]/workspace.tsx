"use client";
/* eslint-disable react/jsx-no-comment-textnodes */

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { tasks } from "@/lib/tasks";
import type { Task } from "@/lib/tasks";

function getMimeType(type: Task["artifactType"]): string {
  switch (type) {
    case "image":
      return "image/jpeg";
    case "binary":
      return "application/octet-stream";
    case "html":
      return "text/html";
    default:
      return "text/plain";
  }
}

function getFileExtension(type: Task["artifactType"]): string {
  switch (type) {
    case "image":
      return ".jpg";
    case "binary":
      return ".bin";
    case "html":
      return ".html";
    default:
      return ".txt";
  }
}

export default function TaskWorkspace({ task }: { task: Task }) {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(false);
  const [solved, setSolved] = useState(
    () =>
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("yggdrasil-solved") ?? "[]").includes(
        task.id,
      ),
  );
  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer.trim().toLowerCase() !== task.answer) {
      setMessage("REJECTED // SIGNAL DOES NOT MATCH");
      return;
    }
    const current: string[] = JSON.parse(
      localStorage.getItem("yggdrasil-solved") ?? "[]",
    );
    if (!current.includes(task.id)) {
      localStorage.setItem(
        "yggdrasil-solved",
        JSON.stringify([...current, task.id]),
      );
      const next = [...current, task.id];
      if (next.length === tasks.length)
        localStorage.setItem("yggdrasil-end", String(Date.now()));
      fetch("/api/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solved: next }),
      }).catch(() => {});
    }
    setSolved(true);
    setMessage(`ACCEPTED // FRAGMENT ${task.fragment} ADDED TO TEAM BUFFER`);
  }
  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => setAdmin(Boolean(data.session?.admin)))
      .catch(() => {});
  }, []);

  const artifactLines = task.artifact.split("\n").filter((line) => line.trim().length > 0);

  return (
    <main className="workspace task-workspace">
      <header className="terminal-header">
        <Link href="/dashboard" className="brand">
          <span className="brand-mark">Y</span> YGGDRASIL
        </Link>
        <span>TASK {task.id} / MIDGARD</span>
        <span>TEAM CHANNEL // ACTIVE</span>
      </header>
      <div className="workspace-nav">
        <Link href="/dashboard" className="nav-left">{"<- TASK MAP"}</Link>
        <span className="nav-right">
          NODE {task.id} / {solved ? "RECOVERED" : "UNRESOLVED"}
        </span>
      </div>
      <section className="task-hero">
        <div>
          <p className="eyebrow">
            SIGNAL {task.id} // {task.layers}
          </p>
          <h1>{task.title}</h1>
          <p>{task.text}</p>
        </div>
        <div className="fragment-target">
          <span>OUTPUT FRAGMENT</span>
          <strong>{solved ? task.fragment : "--:--"}</strong>
          <small>{solved ? "SECURED IN TEAM BUFFER" : "AWAITING SOLVE"}</small>
        </div>
      </section>
      <div className="fragment-runway">
        {tasks.map((t) => (
          <span
            className={
              t.id === task.id
                ? "current"
                : solved && Number(t.id) < Number(task.id)
                  ? "passed"
                  : ""
            }
            key={t.id}
          >
            {t.id}
          </span>
        ))}
      </div>
      <section className="workspace-grid">
        <div className="artifact">
          <div className="artifact-header">
            <div className="terminal-label">// ATTACHED ARTIFACT / {task.artifactFilename}</div>
            <a
              href={`data:${getMimeType(task.artifactType)};charset=utf-8,${encodeURIComponent(task.artifact)}`}
              download={task.artifactFilename}
              className="artifact-download"
            >
              DOWNLOAD {getFileExtension(task.artifactType).toUpperCase()}
            </a>
          </div>
          <p className="artifact-directive">{task.directive}</p>
          <pre className="artifact-text">
            {artifactLines.map((line, idx) => (
              <div key={idx} className="artifact-line">
                {line}
              </div>
            ))}
          </pre>
          <div className="artifact-footer">
            <span className="footer-label">TOOLS</span>
            <div className="footer-tools">
              {task.tools.map((tool) => (
                <span key={tool} className="artifact-tool">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="clue">
          <form onSubmit={check}>
            <label htmlFor="answer" className="terminal-label">TEAM RESPONSE</label>
            <div className="response-input">
              <input
                id="answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="enter response"
                disabled={solved}
              />
              <button type="submit" disabled={solved} className="check-button">
                {solved ? "SECURED" : "CHECK"} <b>{"->"}</b>
              </button>
            </div>
          </form>
          {message && (
            <p className={solved ? "accepted" : "rejected"}>{message}</p>
          )}
          {admin && !solved && (
            <div className="root-key">
              <span className="terminal-label">// ROOT OVERRIDE / ODIN</span>
              <p>
                ANSWER KEY: <b>{task.answer}</b>
              </p>
              <button
                type="button"
                className="root-inject"
                onClick={() => setAnswer(task.answer)}
              >
                INJECT RESPONSE <b>{"->"}</b>
              </button>
            </div>
          )}
        </div>
      </section>
      <footer className="task-footer">
        <span className="footer-left">
          {task.id === "01" ? (
            "ENTRY SIGNAL"
          ) : (
            <Link
              href={`/tasks/${String(Number(task.id) - 1).padStart(2, "0")}`}
            >
              {"<- "}PREVIOUS
            </Link>
          )}
        </span>
        {task.id !== "05" && (
          <Link href={`/tasks/${String(Number(task.id) + 1).padStart(2, "0")}`} className="footer-right">
            NEXT SIGNAL {"->"}
          </Link>
        )}
      </footer>
    </main>
  );
}