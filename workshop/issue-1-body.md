# Add `/api/todos` POST handler with validation

The `POST /api/todos` endpoint currently returns `501 Not Implemented`. We need it to actually create a todo.

## Acceptance criteria

- Accepts JSON body: `{ "title": string }`
- Returns `201` with the created todo (including a unique `id` and `done: false`)
- Returns `400` if `title` is missing, empty, or not a string
- Returns `400` if `title` is longer than 200 characters
- Persists the new todo to `server/todos.json` so a subsequent `GET /api/todos` returns it
- Add at least one Node test in `server/` covering happy path and one validation failure

## Notes

- See existing `GET /api/todos` in `server/index.js` for the storage pattern.
- The new id should not collide with existing ids.
