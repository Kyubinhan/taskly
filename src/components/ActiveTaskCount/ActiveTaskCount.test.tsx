import React from "react"
import { render, screen } from "@testing-library/react"

import ActiveTaskCount from "./ActiveTaskCount"

describe("<ActiveTaskCount />", () => {
  const defaultProps = { count: 0 }
  const setup = (props = defaultProps) => {
    render(<ActiveTaskCount {...props} />)

    const div = screen.getByTestId("active-task-count")

    return {
      div,
    }
  }

  it("has count div element", () => {
    const { div } = setup()

    expect(div).toBeTruthy()
  })

  it("displays active task count", () => {
    const { div } = setup({ count: 1 })

    expect(div).toHaveTextContent("You have 1 pending task(s).")
  })
})
