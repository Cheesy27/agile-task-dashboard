"use client";

import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Build Task Dashboard",
      description:
        "Create a full-stack task management application with Next.js, TypeScript, and Tailwind CSS.",
      status: "in-progress",
      priority: "high",
      assignee: "Lucas Pereira",
      dueDate: "2026-01-20T00:00:00.000Z",
      createdAt: "2026-01-14T00:00:00.000Z",
      updatedAt: "2026-01-14T00:00:00.000Z",
    },
    {
      id: "task-2",
      title: "Write Unit Tests",
      description:
        "Add comprehensive test coverage using Jest and React Testing Library for TDD.",
      status: "todo",
      priority: "medium",
      assignee: "Jane Smith",
      dueDate: "2026-01-25T00:00:00.000Z",
      createdAt: "2026-01-14T00:00:00.000Z",
      updatedAt: "2026-01-14T00:00:00.000Z",
    },
    {
      id: "task-3",
      title: "Set Up Azure DevOps",
      description: "Configure Azure DevOps pipeline, repositories, and boards.",
      status: "todo",
      priority: "low",
      assignee: "Bob Johnson",
      dueDate: "2026-02-01T00:00:00.000Z",
      createdAt: "2026-01-14T00:00:00.000Z",
      updatedAt: "2026-01-14T00:00:00.000Z",
    },
    {
      id: "task-4",
      title: "Watch Star Wars Episode IV to VI",
      description: "Start Wars movie marathon of the best Episodes.",
      status: "in-progress",
      priority: "urgent",
      assignee: "Alice Williams",
      dueDate: "2026-01-18T00:00:00.000Z",
      createdAt: "2026-01-14T00:00:00.000Z",
      updatedAt: "2026-01-14T00:00:00.000Z",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task,
      );
      setTasks(updatedTasks);
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    openEditForm(task);
  };

  const handleDelete = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Agile Task Dashboard
            </h1>
            <p className="text-gray-600">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} •
              {tasks.filter((t) => t.status === "done").length} completed
            </p>
          </div>
          <button
            onClick={openCreateForm}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <span className="text-xl mr-2">+</span>New Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {isFormOpen && (
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            initialData={editingTask || undefined}
          />
        )}
      </div>
    </main>
  );
}
