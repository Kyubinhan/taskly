import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import App from "src/app"
import { TaskFilterOption } from "src/types"

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
  const selectFilterOption = (option: TaskFilterOption) => {
    userEvent.click(screen.getByTestId("task-filter-select"))
    userEvent.click(screen.getByRole("option", { name: option }))
  }

  beforeEach(() => {
    localStorage.clear()
  })

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

    const firstTask = screen.getAllByTestId("task-text")[0]
    expect(firstTask).not.toHaveStyle("text-decoration: line-through;")

    fireEvent.click(screen.getAllByTestId("task-checkbox")[0])
    expect(firstTask).toHaveStyle("text-decoration: line-through;")
  })

  it("filters tasks", () => {
    render(<App tasks={defaultTasks} />)

    // Display all tasks as default
    screen.getByText("task 1")
    screen.getByText("task 2")

    // Display active tasks only
    selectFilterOption(TaskFilterOption.ACTIVE)
    screen.getByText("task 1")
    expect(screen.queryByTestId("task 2")).toBeFalsy()

    // Display completed tasks only
    selectFilterOption(TaskFilterOption.COMPLETED)
    screen.getByText("task 2")
    expect(screen.queryByTestId("task 1")).toBeFalsy()
  })

  it("displays active task count", () => {
    render(<App tasks={defaultTasks} />)

    screen.getByText(/1 pending task/i)

    addTask("task 3")

    screen.getByText(/2 pending task/i)
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
