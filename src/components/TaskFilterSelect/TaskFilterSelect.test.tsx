import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import TaskFilterSelect from "./TaskFilterSelect"

describe("<TaskFilters />", () => {
  const defaultProps = { onFilterChange: () => {} }
  it("has select", () => {
    render(<TaskFilterSelect {...defaultProps} />)

    screen.getByTestId("task-filter-select")
  })

  it("selects an option", () => {
    render(<TaskFilterSelect {...defaultProps} />)

    userEvent.selectOptions(screen.getByTestId("task-filter-select"), ["all"])

    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "All" }).selected
    ).toBe(true)
  })

  it("calls onFilterChange", () => {
    const onFilterChange = jest.fn()
    render(<TaskFilterSelect onFilterChange={onFilterChange} />)

    userEvent.selectOptions(screen.getByTestId("task-filter-select"), ["all"])

    expect(onFilterChange).toBeCalledWith("all")
  })
})
