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

app.get("/api/todos", (_req, res) => {
  res.json(readTodos());
});

app.post("/api/todos", (_req, res) => {
  // TODO: implement POST handler (see Issue #1 / PR #1)
  res.status(501).json({ error: "Not implemented" });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
