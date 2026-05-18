# Add /api/todos POST handler

Closes #1.

Adds a working POST handler so the frontend can create todos.

## What changed
- `server/index.js`: implemented POST handler that appends to `todos.json`.
- Returns the created todo with a new id.

## Testing
Manually tested with curl:
```
curl -X POST http://localhost:3001/api/todos -H 'Content-Type: application/json' -d '{"title":"buy milk"}'
```
Works.

> **Workshop note:** this PR is intentionally rough. It's the target for Lab 1 (Copilot code review) — devs will ask Copilot to review it and triage the feedback.
