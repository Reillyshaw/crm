"use client";
import React, { useState, useEffect } from "react";
import TaskDetailsModal from "./TaskDetailsModal";

type Task = {
  id: number;
  title: string;
  status: string;
  assignees: string[];
  comments: number;
  time: string;
};

const columns = [
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export default function TaskboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  // Example create, update, delete functions (to be wired to UI later)
  async function createTask(task: Partial<Task>) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks(prev => [...prev, newTask]);
  }

  async function updateTask(id: number, updates: Partial<Task>) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  }

  async function deleteTask(id: number) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="flex gap-8 overflow-x-auto min-h-[80vh]">
      {columns.map(col => (
        <div key={col.key} className="bg-black border border-white rounded-2xl w-96 min-h-[70vh] flex flex-col shadow-lg">
          <div className="p-6 border-b border-white text-white font-extrabold text-2xl tracking-wide bg-black rounded-t-2xl">{col.label}</div>
          <div className="flex-1 p-4 space-y-6">
            {loading ? (
              <div className="text-white">Loading...</div>
            ) : (
              tasks.filter(t => t.status === col.key).map(task => (
                <div key={task.id} className="bg-black border border-white rounded-xl p-6 shadow-md cursor-pointer hover:bg-gray-900 hover:text-white transition flex flex-col gap-2 group" onClick={() => setSelectedTask(task)}>
                  <div className="font-bold text-lg group-hover:text-white">{task.title}</div>
                  <div className="flex items-center text-sm mt-2 gap-4">
                    <span className="bg-white text-black px-3 py-1 rounded-full font-semibold">{task.time}</span>
                    <span className="text-white flex items-center gap-1">💬 {task.comments}</span>
                    <span className="text-white flex items-center gap-1">👤 {task.assignees?.join(", ")}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
      {/* Modal */}
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
} 