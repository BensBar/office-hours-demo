// Replaces server/index.js on branch `feat/add-todo-post`.
// INTENTIONALLY ROUGH — this is the Lab 1 review target.
// Issues seeded for Copilot review to catch:
//   - no input validation (missing/empty title, wrong types, oversized payload)
//   - id generation can collide (Math.random)
//   - magic number 999999
//   - sync fs writes inside request handler (no error handling)
//   - no tests
//   - swallows JSON parse errors
//   - inconsistent response shape vs GET
import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "todos.json");

const app = express();
app.use(cors());
app.use(express.json());

function readTodos() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

function getNextTodoId(todos) {
  const maxId = todos.reduce((max, todo) => {
    if (Number.isInteger(todo.id) && todo.id > max) {
      return todo.id;
    }

    return max;
  }, 0);

  return maxId + 1;
}

app.get("/api/todos", (_req, res) => {
  res.json(readTodos());
});

app.post("/api/todos", (req, res) => {
  const body = req.body ?? {};
  const { title } = body;

  if (
    typeof title !== "string" ||
    title.trim().length === 0 ||
    title.length > 200
  ) {
    return res.status(400).json({ error: "Invalid title" });
  }

  try {
    const todos = readTodos();
    const newTodo = {
      id: getNextTodoId(todos),
      title: title.trim(),
      done: false
    };
    todos.push(newTodo);
    writeTodos(todos);

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error("Failed to create todo", error);
    return res.status(500).json({ error: "Failed to create todo" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
