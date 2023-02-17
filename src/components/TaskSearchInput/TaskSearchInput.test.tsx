import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"

import TaskSearchInput from "./TaskSearchInput"

describe("<TaskSearchInput />", () => {
  const defaultProps = { onSearchTask: () => {} }
  const setup = (props = defaultProps) => {
    render(<TaskSearchInput {...props} />)

    const input = screen.getByTestId("task-search-input")

    return {
      input,
    }
  }

  it("has input element", () => {
    const { input } = setup()

    expect(input).toBeTruthy()
  })

  it("calls onSearchTask", () => {
    const onSearchTask = jest.fn()
    const { input } = setup({ onSearchTask })

    fireEvent.change(input, {
      target: {
        value: "keyword",
      },
    })

    expect(onSearchTask).toBeCalledWith("keyword")
  })
})
