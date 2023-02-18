import React from "react"
import TaskList from "./TaskList"
import { render, screen, fireEvent } from "@testing-library/react"

import { Task } from "src/types/Task"

describe("<TaskList />", () => {
  const sampleTasks: Task[] = [
    {
      id: "1",
      text: "do something",
      completed: true,
    },
    {
      id: "2",
      text: "do sth cool",
      completed: true,
    },
  ]
  const defaultProps = {
    tasks: sampleTasks,
    onToggleTask: () => {},
  }

  it("renders tasks properly", () => {
    render(<TaskList {...defaultProps} />)
    screen.getByText(sampleTasks[0].text)
    screen.getByText(sampleTasks[1].text)
  })

  it("calls onToggleTask", () => {
    const onToggleTask = jest.fn()
    render(<TaskList {...defaultProps} onToggleTask={onToggleTask} />)

    // Click on the first checkbox
    fireEvent.click(screen.getAllByTestId("task-checkbox")[0])
    expect(onToggleTask).toBeCalledWith(sampleTasks[0].id)
  })
})
