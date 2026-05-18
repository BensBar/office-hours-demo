import { useEffect, useState } from "react";
import Header from "./Header.jsx";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <main>
        <h2>Todos</h2>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {todos.map((t) => (
              <li key={t.id} className={t.done ? "done" : ""}>
                {t.title}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
