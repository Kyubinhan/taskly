import List from "@mui/material/List"
import React from "react"

import { Task } from "src/types/Task"
import TaskItem from "src/components/TaskItem"

import styles from "./style.module.css"

interface Props {
  tasks: Task[]
  onCompleteTask: (id: string) => void
}

const TaskList: React.FC<Props> = ({ tasks, onCompleteTask }) => {
  return (
    <List className={styles.list} data-testid="task-list" disablePadding>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onCompleteTask={onCompleteTask} />
      ))}
    </List>
  )
}

export default TaskList
