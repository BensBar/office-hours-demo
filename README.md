# catalyst-pod3-demo

Demo repo for **Catalyst 2.0 — Session 1 (Pod 3)** on May 19, 2026.

A tiny Express + React TODO app used as the workshop sandbox for two labs:

- **Lab 1 — Copilot code review** on PR #1 (rough POST handler)
- **Lab 2 — Coding agent** on Issue #2 (add dark mode toggle)

## Quick start

```bash
# install everything
npm install --workspaces

# run API (port 3001)
npm run dev --workspace server

# in another terminal, run web (port 5173)
npm run dev --workspace web
```

Open http://localhost:5173 — the existing todos load from the API.

## Repo layout

```
server/   Express API. GET /api/todos works. POST is intentionally rough on the PR branch.
web/      Vite + React frontend. Header has no dark mode (Issue #2 target).
workshop/ Markdown bodies for the seeded issues and PR.
scripts/  Helpers to seed issues + PR on GitHub via `gh` CLI.
```

## For workshop facilitator

After `gh repo create`, run `./scripts/seed-github.sh` to file the two issues and open PR #1.
