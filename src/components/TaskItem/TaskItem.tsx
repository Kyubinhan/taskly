import React from "react"
import { Task } from "src/Types/Task"

interface Props {
  task: Task
  onCompleteTask: (id: string) => void
}

const TaskItem: React.FC<Props> = ({ task, onCompleteTask }) => {
  const { id, text, completed } = task
  const onClick = () => {
    onCompleteTask(id)
  }

  return (
    <li>
      <span
        data-testid="task"
        style={{ textDecoration: completed ? "line-through" : "none" }}
      >
        {text}
      </span>
      <button data-testid="task-done-btn" onClick={onClick}>
        Done
      </button>
    </li>
  )
}

export default TaskItem
