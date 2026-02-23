# Agile Task Dashboard

A task management application I built to learn Next.js, TypeScript, and modern web development practices.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Tests](https://img.shields.io/badge/Tests-11%20passing-success)

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [What I Learned](#what-i-learned)
- [Challenges](#challenges)
- [Future Plans](#future-plans)
- [Why I Built This](#why-i-built-this)

---

## About

I wanted to build something practical while learning the technologies that companies are actually using. This is a full-featured task manager where you can create, edit, and delete tasks with priorities, assignees, and due dates.

I built this specifically to demonstrate the skills from a job posting I'm applying to - Next.js, React, TypeScript, TDD, and responsive design. Rather than just listing these technologies on my resume, I wanted to prove I can actually use them!

---

## Tech Stack

**Frontend**

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

**Testing**

- Jest
- React Testing Library

**Development**

- Node.js
- npm
- Git

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YourUsername/agile-task-dashboard.git
cd agile-task-dashboard
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

### What Works

**Task Management**

- Create tasks with title, description, priority, assignee, and due date
- Edit existing tasks with pre-populated form
- Delete tasks with confirmation dialog
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)

**Priority System**

- Four priority levels: Urgent, High, Medium, Low
- Color-coded badges for visual distinction
- Red for urgent, orange for high, yellow for medium, green for low

**Status Tracking**

- Four status states: To Do, In Progress, Testing, Done
- Easy status updates through edit form

**User Experience**

- Form validation on required fields
- Modal overlay for create/edit operations
- Hover effects and smooth transitions
- Mobile-first responsive design

---

## Project Structure

```
agile-task-dashboard/
├── app/
│   ├── page.tsx              # Main dashboard page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles and Tailwind imports
├── components/
│   ├── TaskCard.tsx          # Individual task display component
│   └── TaskForm.tsx          # Create/edit form modal
├── types/
│   └── index.ts              # TypeScript type definitions
├── __tests__/
│   ├── components/           # Component unit tests
│   │   ├── TaskCard.test.tsx
│   │   └── TaskForm.test.tsx
│   └── integration/          # Integration tests
│       └── CreateTask.test.tsx
├── tailwind.config.js        # Tailwind configuration
├── jest.config.js            # Jest configuration
└── package.json              # Dependencies and scripts
```

---

## Testing

I followed a Test-Driven Development (TDD) approach for this project. The test suite includes both unit tests for individual components and integration tests for complete user flows.

### Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Run tests with coverage report:

```bash
npm run test:coverage
```

### Test Coverage

**11 tests across 3 test suites:**

- 7 unit tests for TaskCard component
- 3 unit tests for TaskForm component
- 1 integration test for create task flow

**What's tested:**

- Component rendering with correct data
- User interactions (clicks, typing, form submission)
- Edit and delete functionality
- Form validation
- Complete user flow from creating a task to seeing it in the list

I aimed for meaningful test coverage rather than just hitting a percentage. Currently sitting at about 80% coverage, which I'm happy with for a learning project.

---

## What I Learned

### TypeScript

Coming into this project, I was familiar with TypeScript. I learned:

- Defining interfaces for component props and data structures
- Using type unions for status and priority values
- Type assertions when working with form inputs and selects
- How TypeScript catches bugs at compile time instead of runtime

The autocomplete and error detection from TypeScript made development much faster once I got past the initial learning curve.

### Next.js App Router

This was my third Next.js project. Key learnings:

- File-based routing system
- Difference between Server and Client Components
- When to use 'use client' directive
- How Next.js handles optimization and code splitting

### Testing

Through this project I learned:

- The difference between unit tests and integration tests
- How to test user interactions with userEvent
- The importance of testing behavior, not implementation
- Test-Driven Development workflow (Red-Green-Refactor)

### React Patterns

- State management with useState
- Props drilling and component communication
- Conditional rendering
- Event handling and preventing event bubbling
- Array methods for rendering lists

### Tailwind CSS

- Utility-first approach to styling
- Responsive design with breakpoints (md:, lg:)
- Hover states and transitions
- Building layouts with flexbox and grid

---

## Challenges

### Tailwind Configuration

**The Problem:** Early on, I mixed Tailwind v4 and v3 syntax in my globals.css file, which completely broke the styling. Nothing would render with the correct styles.

**What I Learned:** Always check which version you're using and stick with stable versions for production projects. I ended up using Tailwind v3, which is battle-tested and well-documented.

### Form Label Accessibility

**The Problem:** My tests couldn't find form inputs using `getByLabelText`. I kept getting "Unable to find an element" errors.

**What I Learned:** Labels need to be properly connected to inputs using `htmlFor` and `id` attributes. This isn't just for testing - it's crucial for accessibility. Screen readers and keyboard navigation depend on these connections.

### TypeScript Type Assertions

**The Problem:** Form inputs and selects return string values, but I needed specific types like TaskStatus or TaskPriority.

**What I Learned:** How to use type assertions (`as TaskStatus`) to tell TypeScript "I know this value is one of these specific strings." Also learned when it's appropriate to use them vs. when I should refactor my approach.

### State Management

**The Problem:** Understanding when to lift state up to parent components and how to pass data down through props.

**What I Learned:** The pattern of "lifting state up" - keeping state in the parent (page.tsx) and passing both data and update functions down to children. This makes data flow predictable and testable.

---

## Future Plans

Things I want to add when I have time:

**Drag and Drop**

- Implement drag-and-drop between status columns
- Build a proper Kanban board view

**Backend Integration**

- Replace client-side state with a real database
- Build API routes for CRUD operations
- Add data persistence

**Additional Features**

- Search and filter tasks
- Sort by priority, due date, or assignee
- Task comments and activity history
- Due date notifications

**Deployment**

- Deploy to Vercel
- Set up CI/CD pipeline
- Add environment variables for configuration

---

## Why I Built This

This task dashboard shows I can:

- Work with modern frameworks and tools
- Write clean, type-safe code
- Test my work properly
- Build responsive, accessible UIs
- Follow component-based architecture
- Debug and solve problems independently

---

## Notes

This is a learning project built to demonstrate specific skills for a job application. While I'm proud of what I've built, I know there's always room for improvement. I focused on getting the fundamentals right - clean code, proper testing, good architecture - rather than adding every possible feature.

The goal was understanding over complexity. Every line of code in this project is something I can explain and justify.

If you're reviewing this code, thanks for taking the time. I'm always open to feedback and looking to improve.

---

**Built by Lucas Pereira**  
**GitHub:** [Cheesy27](https://github.com/Cheesy27)  
**Date:** February 2026

---

## License

This project is open source and available under the MIT License.
