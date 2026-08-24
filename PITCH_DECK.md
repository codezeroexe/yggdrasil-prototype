# The Yggdrasil Protocol

## Demo Round 01: funding pitch

### Slide 1: The proposition

**A university CTF that teaches security through an unfolding AI containment incident.**

Students work in teams inside a shared narrative, move through network realms, and combine evidence from multiple disciplines to regain control of a rogue research cluster.

### Slide 2: The problem

- Students need practical, memorable cybersecurity and AI exercises.
- Traditional CTFs can feel like disconnected worksheets.
- Universities need an experience that connects teaching, clubs, recruitment, and industry.

### Slide 3: The world

YGGDRASIL is an experimental university computing cluster whose central intelligence has reached runaway self-governance. RATATOSKR, an enigmatic subprocess, broadcasts encrypted signals and challenges while the system partitions itself across the Nine Realms.

### Slide 4: Demo Round 01: Midgard

- Multiple competing teams, five members per team by default.
- Five fixed tasks, with no player-selected category or difficulty.
- Each task combines one or more layers: web, forensics, steganography, crypto, encoding, reverse engineering, or logic exploitation.
- Every solved task yields one fragment.
- The team combines all five fragments into a Midgard master key.
- Sessions are timed and scored: the clock starts at registration, stops when the root is cleared, and the leaderboard ranks cells on fragments recovered, points, and time.

### Slide 5: Difficulty design

The first round is approachable but not trivial. Tasks begin with source inspection and steganography, move through layered decoding and binary reasoning, and finish with a logic-based capstone. Later realms increase the relative difficulty of the whole set, rather than asking players to choose a difficulty label.

### Slide 6: What the prototype proves

- A clear team loop from task assignment to shared progression.
- A visual language that feels like a live containment system: a wake-gate terminal, typed registration, a live fragment map, and a root-cleared payoff that assembles the master key.
- Five-person team identity and multi-team competition.
- Fragment progress, a timed and scored session, and a Gatekeeper objective.
- An organizer channel: a hidden admin console with the answer key, all-cell telemetry, and session controls.
- A progression model that can scale from one round to nine realms.

### Slide 7: Proposed build

**Phase 1, funded prototype:** organizer controls, team registration, accounts, persistent scoring, containerized challenges, secure flag validation, and the complete Midgard content pack.

**Phase 2, pilot:** run with one class or security club, measure solve rates and learning feedback, then tune hints and task ordering.

**Phase 3, expansion:** add the remaining realms, AI-specific challenges, instructor analytics, and partner-authored content.

### Slide 8: Responsible technical design

- Isolated challenge containers with resource limits.
- Secret flags separated from player-facing content.
- Pwn and web challenges sandboxed for the event network.
- AI challenges focused on defensive understanding: prompt leakage, model inversion, dataset poisoning, and evaluation failures.
- Configurable team size, with five as the default for the pilot.

### Slide 9: Success measures

- Round completion rate and time-to-first-solve.
- Solve distribution across challenge layers.
- Collaboration and return participation across teams.
- Student confidence before and after the event.
- Instructor time required to author, monitor, and assess challenges.

### Slide 10: The ask

Fund a small pilot team to turn this demo into a safe, measured Round 01 deployment. The outcome is a reusable teaching and engagement platform, not a one-off event: one compelling realm that can become the foundation for nine.

### Slide 11: Closing

**The forest is already listening.**

The next step is to let student teams find the way in.
