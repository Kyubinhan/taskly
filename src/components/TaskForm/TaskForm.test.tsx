import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import TaskForm from "./TaskForm"

describe("<TaskForm />", () => {
  const defaultProps = { onAddTask: () => {} }
  const setup = (props = defaultProps) => {
    render(<TaskForm {...props} />)

    const input = screen.getByTestId("task-input")
    const button = screen.getByTestId("task-submit-btn")

    return {
      input,
      button,
    }
  }

  it("has input and a button", () => {
    const { input, button } = setup()

    expect(input).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it("changes input", () => {
    const { input } = setup()

    fireEvent.change(input, {
      target: {
        value: "do something",
      },
    })

    expect(input).toHaveAttribute("value", "do something")
  })

  it("calls onAddTask and clears input", () => {
    const onAddTask = jest.fn()
    const { input, button } = setup({ onAddTask })

    fireEvent.change(input, {
      target: {
        value: "do something",
      },
    })
    fireEvent.click(button)

    expect(onAddTask).toBeCalledWith("do something")
    expect(input).toHaveAttribute("value", "")
  })
})
