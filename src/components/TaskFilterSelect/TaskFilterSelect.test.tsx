import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { TaskFilterOption } from "src/types"
import TaskFilterSelect from "./TaskFilterSelect"

describe("<TaskFilterSelect />", () => {
  const defaultProps = {
    onFilterChange: () => {},
    option: TaskFilterOption.ALL,
  }
  const setup = (props = {}) => {
    render(<TaskFilterSelect {...defaultProps} {...props} />)

    const select = screen.getByTestId("task-filter-select")

    return {
      select,
    }
  }

  it("has select", () => {
    const { select } = setup()

    expect(select).toBeTruthy()
  })

  it("selects an option", async () => {
    const { select } = setup()

    userEvent.click(select)
    userEvent.click(
      screen.getByRole("option", { name: TaskFilterOption.COMPLETED })
    )
  })

  it("calls onFilterChange", () => {
    const onFilterChange = jest.fn()
    const { select } = setup({ onFilterChange })

    userEvent.click(select)
    userEvent.click(
      screen.getByRole("option", { name: TaskFilterOption.COMPLETED })
    )

    expect(onFilterChange).toBeCalledWith(TaskFilterOption.COMPLETED)
  })
})
