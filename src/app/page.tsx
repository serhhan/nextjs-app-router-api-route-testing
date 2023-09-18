"use client";

import { useState, useEffect } from "react";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("/api/todo");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (task === "") return;

    const response = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    const newTodo: Todo = await response.json();

    setTodos([...todos, newTodo]);
    setTask("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <input
          type="text"
          className="border p-2 rounded w-full mb-4 text-black"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Todo
        </button>
        <ul className="mt-4 space-y-4">
          {todos &&
            todos.map((todo) => (
              <li key={todo.id} className="border p-2 rounded bg-gray-200">
                {todo.task}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
