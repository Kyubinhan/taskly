import React from "react"
import TaskItem from "./TaskItem"
import { render, screen, fireEvent } from "@testing-library/react"
import { Task } from "src/types/Task"

describe("<TaskItem />", () => {
  const sampleTask: Task = {
    id: "id",
    text: "do something",
    completed: false,
  }

  const initialProps = { task: sampleTask, onCompleteTask: () => {} }
  const setup = (props = {}) => {
    render(<TaskItem {...initialProps} {...props} />)
    const span = screen.getByTestId("task-text")
    const button = screen.getByTestId("task-done-btn")

    return {
      span,
      button,
    }
  }

  it("has span and button", () => {
    const { span, button } = setup()

    expect(span).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it("shows line-through on span when completed is true", () => {
    const { span } = setup({ task: { ...sampleTask, completed: true } })

    expect(span).toHaveStyle("text-decoration: line-through;")
  })

  it("does not show line-through on span when completed is false", () => {
    const { span } = setup({ task: { ...sampleTask, completed: false } })

    expect(span).not.toHaveStyle("text-decoration: line-through;")
  })

  it("calls onCompleteTask", () => {
    const onCompleteTask = jest.fn()
    const { button } = setup({ onCompleteTask })

    fireEvent.click(button)

    expect(onCompleteTask).toBeCalledWith(sampleTask.id)
  })
})
