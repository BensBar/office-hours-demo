import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import TodoList from "./TodoList.jsx";

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
        {loading ? <p>Loading…</p> : <TodoList todos={todos} />}
      </main>
    </div>
  );
}
