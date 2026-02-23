
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types";

// Sample task data for testing
const mockTask: Task = {
  id: "test-1",
  title: "Test Task",
  description: "This is a test task",
  status: "todo",
  priority: "high",
  assignee: "Test User",
  dueDate: "2026-01-20T00:00:00.000Z",
  createdAt: "2026-01-14T00:00:00.000Z",
  updatedAt: "2026-01-14T00:00:00.000Z",
};

describe("TaskCard", () => {
  it("renders task title", () => {
    render(<TaskCard task={mockTask} />);

    const titleElement = screen.getByText("Test Task");
    expect(titleElement).toBeInTheDocument();
  });
});

it("renders task description", () => {
  render(<TaskCard task={mockTask} />);

  expect(screen.getByText("This is a test task")).toBeInTheDocument();
});

it("renders priority badge", () => {
  render(<TaskCard task={mockTask} />);

  expect(screen.getByText("high")).toBeInTheDocument();
});

it("renders assignee name", () => {
  render(<TaskCard task={mockTask} />);

  expect(screen.getByText(/Test User/)).toBeInTheDocument();
});

it("calls onEdit when Edit button is clicked", () => {
  const mockOnEdit = jest.fn(); // Mock function (fake function)

  render(<TaskCard task={mockTask} onEdit={mockOnEdit} />);

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
});

it("calls onDelete when Delete button is clicked", () => {
  const mockOnDelete = jest.fn();

  render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);

  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
});

it("applies correct color class for urgent priority", () => {
  const urgentTask = { ...mockTask, priority: "urgent" as const };

  render(<TaskCard task={urgentTask} />);

  const badge = screen.getByText("urgent");
  expect(badge).toHaveClass("bg-red-100");
});

it("calls onComplete when task is marked complete", () => {
  const mockOnComplete = jest.fn();
  const todoTask = { ...mockTask, status: "todo" as const };

  render(<TaskCard task={todoTask} onComplete={mockOnComplete} />);

  const completeButton = screen.getByText(/Mark Complete/i);
  fireEvent.click(completeButton);

  expect(mockOnComplete).toHaveBeenCalledWith(mockTask.id);
});
