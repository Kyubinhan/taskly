import React from "react"
import { Task } from "src/Types/Task"
import TaskItem from "../TaskItem"

interface Props {
  tasks: Task[]
  onCompleteTask: (id: string) => void
}

const TaskList: React.FC<Props> = ({ tasks, onCompleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onCompleteTask={onCompleteTask} />
      ))}
    </ul>
  )
}

export default TaskList
