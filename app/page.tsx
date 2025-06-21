"use client";

import { useState } from "react";
import { Trash2, CheckCircle2 } from "lucide-react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Todo List</h1>
      <div className="w-full max-w-md flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 text-lg px-5 py-3 rounded-2xl border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200 shadow-sm placeholder:text-blue-400"
        />
        <button
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div className="w-full max-w-md space-y-2">
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 border border-blue-600"
          >
            <p
              className={`flex-1 text-xl ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </p>
            <div className="flex gap-2">
              <button onClick={() => toggleComplete(task.id)}>
                <CheckCircle2
                  className={`w-5 h-5 ${
                    task.completed ? "text-green-500" : "text-gray-400"
                  }`}
                />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
