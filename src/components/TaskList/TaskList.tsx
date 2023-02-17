import React from "react"
import { Task } from "src/types/Task"
import TaskItem from "../TaskItem"

interface Props {
  tasks: Task[]
  onCompleteTask: (id: string) => void
}

const TaskList: React.FC<Props> = ({ tasks, onCompleteTask }) => {
  return (
    <ul data-testid="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onCompleteTask={onCompleteTask} />
      ))}
    </ul>
  )
}

export default TaskList
