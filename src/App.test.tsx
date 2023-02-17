import React from "react"
import App from "./App"
import { render, screen, fireEvent } from "@testing-library/react"

describe("<App />", () => {
  const defaultTasks = [
    {
      id: "1",
      text: "task 1",
      completed: false,
    },
  ]

  it("renders TaskForm and TaskList", () => {
    render(<App />)

    screen.getByTestId("task-form")
    screen.getByTestId("task-list")
  })

  it("creates new task", () => {
    render(<App />)

    fireEvent.change(screen.getByTestId("task-input"), {
      target: {
        value: "task 1",
      },
    })
    fireEvent.click(screen.getByTestId("task-submit-btn"))

    screen.getByText("task 1")
  })

  it("completes task", () => {
    render(<App tasks={defaultTasks} />)

    const task = screen.getByText("task 1")
    expect(task).not.toHaveStyle("text-decoration: line-through;")

    fireEvent.click(screen.getByTestId("task-done-btn"))
    expect(task).toHaveStyle("text-decoration: line-through;")
  })
})
