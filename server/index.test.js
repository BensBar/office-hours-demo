import { after, before, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "todos.json");
const PORT = "3101";
const BASE_URL = `http://127.0.0.1:${PORT}`;

let serverProcess;
const originalTodos = fs.readFileSync(DATA_FILE, "utf8");

async function waitForServer(url, timeoutMs = 5000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error("Server did not start in time");
}

before(async () => {
  serverProcess = spawn("node", ["index.js"], {
    cwd: __dirname,
    env: { ...process.env, PORT }
  });

  await waitForServer(`${BASE_URL}/health`);
});

beforeEach(() => {
  fs.writeFileSync(DATA_FILE, originalTodos);
});

after(() => {
  if (serverProcess) {
    serverProcess.kill("SIGTERM");
  }
  fs.writeFileSync(DATA_FILE, originalTodos);
});

test("POST /api/todos creates a todo with unique id", async () => {
  const existingTodos = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const maxId = existingTodos.reduce((max, todo) => Math.max(max, todo.id), 0);

  const response = await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: "  buy milk  " })
  });

  assert.equal(response.status, 201);
  const created = await response.json();
  assert.equal(created.id, maxId + 1);
  assert.equal(created.title, "buy milk");
  assert.equal(created.done, false);

  const todosResponse = await fetch(`${BASE_URL}/api/todos`);
  const todos = await todosResponse.json();
  assert.ok(todos.some((todo) => todo.id === created.id && todo.title === "buy milk"));
});

test("POST /api/todos returns 400 for invalid title", async () => {
  const response = await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: "   " })
  });

  assert.equal(response.status, 400);
});
