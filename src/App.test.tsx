import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import App from "src/App"
import { TaskFilterOption } from "src/components/TaskFilterSelect/TaskFilterSelect"

describe("<App />", () => {
  const defaultTasks = [
    {
      id: "1",
      text: "task 1",
      completed: false,
    },
    {
      id: "2",
      text: "task 2",
      completed: true,
    },
  ]
  const addTask = (text: string) => {
    fireEvent.change(screen.getByTestId("task-input"), {
      target: {
        value: text,
      },
    })
    fireEvent.click(screen.getByTestId("task-submit-btn"))
  }
  const searchTask = (text: string) => {
    fireEvent.change(screen.getByTestId("task-search-input"), {
      target: {
        value: text,
      },
    })
  }

  it("renders TaskForm and TaskList", () => {
    render(<App />)

    screen.getByTestId("task-form")
    screen.getByTestId("task-list")
  })

  it("creates new task", () => {
    render(<App />)

    addTask("task 1")

    screen.getByText("task 1")
  })

  it("completes task", () => {
    render(<App tasks={defaultTasks} />)

    const task = screen.getByText("task 1")
    expect(task).not.toHaveStyle("text-decoration: line-through;")

    fireEvent.click(screen.getAllByTestId("task-done-btn")[0])
    expect(task).toHaveStyle("text-decoration: line-through;")
  })

  it("filters tasks", () => {
    render(<App tasks={defaultTasks} />)

    // Display all tasks as default
    screen.getByText("task 1")
    screen.getByText("task 2")

    // Display active tasks only
    userEvent.selectOptions(screen.getByTestId("task-filter-select"), [
      TaskFilterOption.ACTIVE,
    ])
    screen.getByText("task 1")
    expect(screen.queryByTestId("task 2")).toBeFalsy()

    // Display completed tasks only
    userEvent.selectOptions(screen.getByTestId("task-filter-select"), [
      TaskFilterOption.COMPLETED,
    ])
    screen.getByText("task 2")
    expect(screen.queryByTestId("task 1")).toBeFalsy()
  })

  it("displays active task count", () => {
    render(<App tasks={defaultTasks} />)

    screen.getByText(/active tasks: 1/i)

    addTask("task 3")

    screen.getByText(/active tasks: 2/i)
  })

  it("searchs tasks by keyword", () => {
    render(<App tasks={defaultTasks} />)
    screen.getByText("task 1")
    screen.getByText("task 2")

    // Search by keyword 'task 2'
    searchTask("task 2")
    expect(screen.queryByText("task 1")).toBeFalsy()
    screen.getByText("task 2")

    // Search by keyword 'fun task'
    addTask("Fun task")
    searchTask("fun task")
    expect(screen.queryByText("task 1")).toBeFalsy()
    expect(screen.queryByText("task 2")).toBeFalsy()
    screen.getByText("Fun task")
  })
})
