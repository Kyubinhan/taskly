import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { TaskFilterOption } from "src/types"
import TaskFilterSelect from "./TaskFilterSelect"

describe("<TaskFilterSelect />", () => {
  const defaultProps = { onFilterChange: () => {} }
  const setup = (props = defaultProps) => {
    render(<TaskFilterSelect {...props} />)

    const select = screen.getByTestId("task-filter-select")

    return {
      select,
    }
  }

  it("has select", () => {
    const { select } = setup()

    expect(select).toBeTruthy()
  })

  it("selects an option", () => {
    const { select } = setup()

    userEvent.selectOptions(select, [TaskFilterOption.ALL])

    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "All" }).selected
    ).toBe(true)
  })

  it("calls onFilterChange", () => {
    const onFilterChange = jest.fn()
    const { select } = setup({ onFilterChange })

    userEvent.selectOptions(select, [TaskFilterOption.ALL])

    expect(onFilterChange).toBeCalledWith(TaskFilterOption.ALL)
  })
})
