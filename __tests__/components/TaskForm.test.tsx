import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "@/components/TaskForm";

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("renders form with required elements", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Check title appears
    expect(screen.getByText(/create new task/i)).toBeInTheDocument();

    // Check buttons exist
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("submits form with entered data", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Fill out ALL required fields
    await user.type(
      screen.getByPlaceholderText(/enter task title/i),
      "New Task",
    );
    await user.type(
      screen.getByPlaceholderText(/describe the task/i),
      "Task description",
    );
    await user.type(
      screen.getByPlaceholderText(/who's responsible/i),
      "John Doe",
    );

    // Select status (dropdown)
    const statusSelect = screen.getByLabelText(/status/i);
    await user.selectOptions(statusSelect, "in-progress");

    // Select priority (dropdown)
    const prioritySelect = screen.getByLabelText(/priority/i);
    await user.selectOptions(prioritySelect, "high");

    // Fill due date
    const dueDateInput = screen.getByLabelText(/due date/i);
    await user.type(dueDateInput, "2026-02-15");

    // Submit
    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    // Check if onSubmit was called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Task",
        description: "Task description",
        assignee: "John Doe",
        status: "in-progress",
        priority: "high",
      }),
    );
  });
});
