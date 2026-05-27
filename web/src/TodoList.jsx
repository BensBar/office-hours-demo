import { useState } from "react";

export default function TodoList({ todos }) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? todos.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
    : todos;

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          aria-label="Search todos"
          placeholder="Search todos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={() => setSearch("")}>Clear</button>
      </div>
      <ul>
        {filtered.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
