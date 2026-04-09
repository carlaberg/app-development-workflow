# App Dev Workflow Plan

## Problem Statement
Build a lightweight, async-friendly workflow for developing React Native apps with Expo and distributing them to friends and family via TestFlight — with minimal time investment per session.

The workflow must support:
- Quickly capturing ideas and bug reports (text or voice dictation on phone)
- Automatically converting those notes into structured backlog tickets
- Delegating investigation and implementation to an AI agent
- A proper test suite to prevent regressions across agent-driven iterations

---

## Proposed Approach

### 1. App Stack
- **React Native** with **Expo** (managed workflow)
- **EAS Build** for building and submitting to TestFlight
- **EAS Update** for OTA updates (minor fixes without a full TestFlight submission)

### 2. Idea & Bug Capture
- Use a low-friction input channel — options:
  - **Apple Shortcuts + Notes/Reminders**: Dictate on phone → saved to a note or file
  - **Telegram/WhatsApp bot**: Send a voice/text message → bot transcribes and appends to `backlog.md`
  - **Email**: Email a dedicated address → auto-appends entry to `backlog.md`
- A lightweight automation (Apple Shortcut, n8n, or a custom script) picks up new entries and:
  - Transcribes audio if needed (Whisper API or iOS native dictation)
  - Appends a raw entry to `backlog.md` for triage

### 3. Backlog Management with `backlog.md`
- `backlog.md` lives in the repo root and is the single source of truth for all ideas and bugs
- Structure:

  ```markdown
  ## Backlog

  ### [IDEA] Short title
  > Captured: 2026-04-07
  Description of the idea or bug as captured (raw, unedited).
  Status: `raw` | `refined` | `agent-ready` | `in-progress` | `done`

  ---
  ```

- **Triage flow**:
  1. New entry arrives as `raw` (from voice/text capture)
  2. Review and refine when you have a moment → mark as `refined`
  3. Mark as `agent-ready` when ready for the agent to pick up
  4. Agent picks it up, implements, marks as `in-progress` then `done`

- Optionally, a script converts `agent-ready` items in `backlog.md` into GitHub Issues for richer tracking (labels, assignees, milestones)

### 4. Agent-Driven Development
- Use **GitHub Copilot CLI** to:
  - Read `backlog.md`, find `agent-ready` items
  - Investigate, implement, write/update tests
  - Open a PR and update the backlog item to `done`
- Workflow per ticket:
  1. Agent picks the next `agent-ready` item from `backlog.md`
  2. Creates a branch, implements, runs tests
  3. Opens a PR; on merge → EAS Build triggers a new TestFlight build
  4. Agent updates `backlog.md` status to `done`

### 5. Testing Strategy
- **Unit tests**: Jest + React Native Testing Library
- **Integration/E2E tests**: Maestro or Detox for critical user flows
- **CI**: GitHub Actions runs tests on every PR before merge
- Agent always runs and passes existing tests before opening a PR

### 6. Distribution
- **EAS Build** configured for iOS + TestFlight
- Friends/family added as internal testers in App Store Connect
- Builds auto-submitted to TestFlight on merge to `main`

---

## Key Decisions / Open Questions
- [ ] Which capture channel to start with? (Apple Shortcuts vs bot vs email)
- [ ] Transcription: Whisper API or rely on iOS native dictation?
- [ ] Start with a fresh Expo app or migrate an existing project?
- [ ] Maestro vs Detox for E2E testing?
- [ ] Promote `backlog.md` items to GitHub Issues, or keep it file-only?

---

## Milestones
1. Scaffold Expo app + EAS Build configured for TestFlight
2. First TestFlight build distributed to testers
3. `backlog.md` format agreed + idea-capture pipeline live
4. Jest + CI pipeline set up
5. First agent-implemented feature from `backlog.md` merged via PR
6. E2E tests added for core flows
