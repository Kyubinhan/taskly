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
    onCompleteTask: () => {},
  }

  it("renders tasks properly", () => {
    render(<TaskList {...defaultProps} />)
    screen.getByText(sampleTasks[0].text)
    screen.getByText(sampleTasks[1].text)
  })

  it("calls onCompleteTask", () => {
    const onCompleteTask = jest.fn()
    render(<TaskList {...defaultProps} onCompleteTask={onCompleteTask} />)

    // Click on the first done button
    fireEvent.click(screen.getAllByText("Done")[0])
    expect(onCompleteTask).toBeCalledWith(sampleTasks[0].id)
  })
})
