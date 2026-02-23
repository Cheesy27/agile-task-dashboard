import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

describe("Create Task Flow", () => {
  it("creates a new task and displays it in the list", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Initially, should see 4 default tasks (with role="article")
    const initialCards = screen.getAllByRole("article");
    expect(initialCards).toHaveLength(4);

    // Click "New Task" button
    const newTaskButton = screen.getByRole("button", { name: /new task/i });
    await user.click(newTaskButton);

    // Form should appear
    expect(screen.getByText(/create new task/i)).toBeInTheDocument();

    // Fill out ALL required fields
    await user.type(screen.getByLabelText(/title/i), "Integration Test Task");
    await user.type(
      screen.getByLabelText(/description/i),
      "Testing the full user flow",
    );

    // Select status
    const statusSelect = screen.getByLabelText(/status/i);
    await user.selectOptions(statusSelect, "todo");

    // Select priority
    const prioritySelect = screen.getByLabelText(/priority/i);
    await user.selectOptions(prioritySelect, "medium");

    // Fill assignee
    await user.type(screen.getByLabelText(/assignee/i), "Test User");

    // Fill due date
    await user.type(screen.getByLabelText(/due date/i), "2026-03-01");

    // Submit form
    const createButton = screen.getByRole("button", { name: /create task/i });
    await user.click(createButton);

    // Wait for form to close and new task to appear
    // Form should close
    expect(screen.queryByText(/create new task/i)).not.toBeInTheDocument();

    // New task should appear in the list
    expect(screen.getByText("Integration Test Task")).toBeInTheDocument();
    expect(screen.getByText("Testing the full user flow")).toBeInTheDocument();

    // Should now have 5 tasks
    const updatedCards = screen.getAllByRole("article");
    expect(updatedCards).toHaveLength(5);

    // Verify task details are visible
    expect(screen.getByText(/test user/i)).toBeInTheDocument();
  });
});
