import List from "@mui/material/List"
import React from "react"

import { Task } from "src/types/Task"
import TaskItem from "src/components/TaskItem"

import styles from "./style.module.css"

interface Props {
  tasks: Task[]
  onToggleTask: (id: string) => void
}

const TaskList: React.FC<Props> = ({ tasks, onToggleTask }) => {
  return (
    <List className={styles.list} data-testid="task-list" disablePadding>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} />
      ))}
    </List>
  )
}

export default TaskList
