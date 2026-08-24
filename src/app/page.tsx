"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RUNE, TREE_ART } from "../lib/art";

type Step = "mode" | "name" | "members" | "code";
type Transcript = { question: string; response: string };

const CELLS: Array<[string, string, string]> = [
  ["ROOTBOUND", "05 / 05", "ACTIVE"],
  ["NULLBYTE", "04 / 05", "ACTIVE"],
  ["RATATOSKR", "03 / 05", "ACTIVE"],
  ["TEAM UNNAMED", "02 / 05", "SYNCING"],
];

function TypedLine({ children }: { children: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setText(children.slice(0, index));
      if (index >= children.length) window.clearInterval(timer);
    }, 22);
    return () => window.clearInterval(timer);
  }, [children]);
  return (
    <p className="ai-prompt line-flicker">
      <span>YGGDRASIL AI:</span> {text}
      <i />
    </p>
  );
}

export default function Onboarding() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wakeAt = useRef(0);
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<"new" | "login">("new");
  const [value, setValue] = useState("");
  const [team, setTeam] = useState("");
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [error, setError] = useState("");
  const [roster, setRoster] = useState(false);
  const [awake, setAwake] = useState(false);
  useEffect(() => {
    if (awake) return;
    const wake = () => {
      wakeAt.current = Date.now();
      setAwake(true);
    };
    window.addEventListener("keydown", wake);
    window.addEventListener("keyup", wake);
    return () => {
      window.removeEventListener("keydown", wake);
      window.removeEventListener("keyup", wake);
    };
  }, [awake]);
  if (!awake) {
    return (
      <main className="onboarding onboarding-wake">
        <div className="onboarding-grid" />
        <pre className="backdrop-art" aria-hidden>
          {TREE_ART}
        </pre>
        <p className="wake-text">PRESS ANY KEY</p>
      </main>
    );
  }
  const questions: Record<Step, string> = {
    mode: "Are you creating a new operator cell, or reconnecting to one?",
    name:
      mode === "new"
        ? "What should I call your cell?"
        : "Transmit the existing cell identifier.",
    members: "How many operators are in this cell?",
    code: "Transmit the cell access code.",
  };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Date.now() - wakeAt.current < 500) return;
    const response = value.trim();
    if (!response) {
      setError("RESPONSE REQUIRED");
      return;
    }
    setError("");
    if (step === "mode") {
      const normalized = response.toLowerCase();
      if (normalized === "cells") {
        setRoster(true);
        setValue("");
        return;
      }
      if (/^odin\s*\d{4,5}$/.test(normalized)) {
        setError("");
        localStorage.setItem("yggdrasil-admin", "odin");
        fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ team: "ODIN", members: "1", admin: true }),
        }).finally(() => router.push("/admin"));
        return;
      }
      if (!normalized.startsWith("c") && !normalized.startsWith("r")) {
        setError("UNRECOGNIZED COMMAND // RESPOND WITH CREATE OR RECONNECT");
        return;
      }
      setTranscript((current) => [
        ...current,
        { question: questions[step], response },
      ]);
      const nextMode = normalized.startsWith("r") ? "login" : "new";
      setMode(nextMode);
      setStep("name");
    } else if (step === "name") {
      if (!/^[A-Za-z0-9][A-Za-z0-9 -]{1,23}$/.test(response)) {
        setError(
          "INVALID CELL ID // 2-24 CHARACTERS, LETTERS DIGITS SPACES DASHES ONLY",
        );
        return;
      }
      setTranscript((current) => [
        ...current,
        { question: questions[step], response },
      ]);
      setTeam(response.toUpperCase());
      setStep(mode === "new" ? "members" : "code");
    } else if (step === "members") {
      const count = Number(response);
      if (!Number.isInteger(count) || count < 3 || count > 6) {
        setError("REJECTED // CELL SIZE MUST BE AN INTEGER BETWEEN 3 AND 6");
        return;
      }
      setTranscript((current) => [
        ...current,
        { question: questions[step], response },
      ]);
      finish(response);
    } else {
      if (!/^[A-Za-z0-9-]{4,}$/.test(response)) {
        setError("ACCESS CODE REJECTED // MIN 4 CHARACTERS, NO SPACES");
        return;
      }
      setTranscript((current) => [
        ...current,
        { question: questions[step], response },
      ]);
      finish(response);
    }
    setValue("");
  }
  function finish(finalValue: string) {
    if (!localStorage.getItem("yggdrasil-start"))
      localStorage.setItem("yggdrasil-start", String(Date.now()));
    localStorage.setItem("yggdrasil-team", team.toUpperCase());
    localStorage.setItem(
      "yggdrasil-members",
      step === "members" ? finalValue : "5",
    );
    localStorage.setItem("yggdrasil-solved", JSON.stringify([]));
    fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team: team.toUpperCase(),
        members: step === "members" ? finalValue : "5",
        admin: false,
      }),
    }).finally(() => router.push("/dashboard"));
  }
  return (
    <main className="onboarding">
      <div className="onboarding-grid" />
      <pre className="backdrop-art" aria-hidden>
        {TREE_ART}
      </pre>
      <section className="boot-window conversation">
        <header>
          <span className="brand-mark">{RUNE}</span>
          <span>YGGDRASIL AI // CONTAINMENT TERMINAL</span>
          <span className="window-state">SESSION: {step.toUpperCase()}</span>
        </header>
        <div className="conversation-log">
          <div className="boot-log boot-sequence">
            <p>
              <span>[00:00:01]</span> CORE: <b>ONLINE</b>
            </p>
            <p>
              <span>[00:00:02]</span> AUTONOMY: <i>UNVERIFIED</i>
            </p>
            <p>
              <span>[00:00:03]</span> OPERATOR HANDSHAKE: <b>REQUIRED</b>
            </p>
          </div>
          {transcript.map((line, index) => (
            <div className="history-line" key={`${line.response}-${index}`}>
              <p>
                <span className="prefix-ai">YGGDRASIL AI:</span> {line.question}
              </p>
              <p>
                <span className="prefix-op">operator:</span> {line.response}
              </p>
            </div>
          ))}
          {roster && (
            <div className="cell-roster">
              <p className="roster-head">REGISTERED CELLS // MIDGARD BRANCH</p>
              {CELLS.map(([name, progress, status]) => (
                <p className="roster-row" key={name}>
                  <b>{name}</b>
                  <span>{progress}</span>
                  <i>{status}</i>
                </p>
              ))}
            </div>
          )}
          <TypedLine key={step + mode}>{questions[step]}</TypedLine>
          {step === "mode" && (
            <p className="response-hint">
              respond with <b>create</b> or <b>reconnect</b>
            </p>
          )}
          {step === "name" && (
            <p className="response-hint">
              {mode === "new" ? (
                <>
                  choose a short <b>cell designation</b>
                </>
              ) : (
                <>
                  the <b>registered identifier</b>, e.g. <b>ROOTBOUND</b>
                </>
              )}
            </p>
          )}
          {step === "members" && (
            <p className="response-hint">
              a number from <b>3</b> to <b>6</b> · five is standard
            </p>
          )}
          {step === "code" && (
            <p className="response-hint">
              format <b>MIDGARD-XXXX</b>
            </p>
          )}
        </div>
        <form onSubmit={submit}>
          <div
            className="cli-line"
            onClick={() => inputRef.current?.focus()}
          >
            <span className="cli-prompt">operator:</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                if (error) setError("");
              }}
              autoFocus
              aria-label="Terminal response"
            />
            <span
              className={"cli-cursor" + (value ? " hidden" : "")}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
        </form>
        <footer>
          <span>YGGDRASIL AI / DEMO ROUND 01</span>
          <span>TYPE A RESPONSE / ENTER TO TRANSMIT</span>
        </footer>
      </section>
    </main>
  );
}
