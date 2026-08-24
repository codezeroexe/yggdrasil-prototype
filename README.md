# The Yggdrasil Protocol

Demo Round 01 for a university CTF platform pitch. This prototype models multiple competing teams, with five members per team by default. Each team works through five fixed, mixed-layer tasks and combines the resulting fragments at the Gatekeeper.

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000` and press any key to wake the terminal.

## What's in the prototype

- **Containment terminal onboarding** — a blank CRT that wakes on keypress, then walks each team through cell registration as a typed conversation: create or reconnect, cell designation, operator count (3–6), and access code, with per-field validation and a `cells` command that lists registered cells.
- **Fragment map** — a unified signal list of all five tasks with recovered/open states, a shared-buffer progress meter, a session clock, and a topology strip tracing ENTRY to the ROOT gate.
- **Task workspaces** — each task ships with a downloadable artifact (HTML, image metadata, encoded text, binary, or request log), a directive, tool hints, and flag validation. Solving a task secures its fragment into the team buffer.
- **Root cleared sequence** — recovering all five fragments stops the session clock, raises a ROOT NODE CLEARED panel with final time and score (825 PTS max), and offers an UNLOCK MASTER KEY action that assembles `MIDGARD-ROOT` from the five fragments.
- **Hidden admin console** — typing `odin` followed by 4–5 digits at the first prompt opens a root channel with the full answer key, all-cell telemetry, and session controls (mark all recovered, reset session, exit root).
- **CRT presentation layer** — phosphor bloom, deep vignette, scanline roll, flicker, and jitter applied site-wide.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 with a custom terminal design system in `globals.css`
- Cookie session + `proxy.ts` route gating: no URL access without an active session, reloads persist, logout clears everything
- Vercel KV (Upstash) for shared cell state: live-session heartbeats, scores, and admin overrides — with an in-memory fallback when unconfigured

## Hosting on Vercel

1. Push the repo and import it into Vercel — no extra config needed to build.
2. In the Vercel dashboard, open the project → **Storage** → create a **KV (Upstash)** database and connect it to the project. This injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
3. Redeploy. Without KV configured the app still runs, but the admin console cannot see or control remote cells (each instance falls back to isolated in-memory state).

## Scope notes

The challenge seed is based on the supplied NZCSC/NCSCS writeups and covers Web, Crypto, Forensics, Steganography, Reverse Engineering, and logic exploitation. The current demo uses local client state only. Authentication, challenge containers, secure flag validation, persistent scoring, and organizer controls are the next production layer.

See [PITCH_DECK.md](PITCH_DECK.md) for the professor-facing funding pitch.
