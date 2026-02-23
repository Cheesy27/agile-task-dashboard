"use client";

import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onComplete?: (taskId: string) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onComplete,
}: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const showCompleteButton = onComplete && task.status !== "done";

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all"
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {task.title}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>👤 {task.assignee}</span>
        <span>📅 {formatDate(task.dueDate)}</span>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-200">
        {onEdit && <button onClick={() => onEdit(task)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(task.id)}>Delete</button>}
        {showCompleteButton && (
          <button onClick={() => onComplete(task.id)}>✓ Mark Complete</button>
        )}
      </div>
    </div>
  );
}
