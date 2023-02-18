import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"
import React from "react"

import { Task } from "src/types/Task"

interface Props {
  task: Task
  onToggleTask: (id: string) => void
}

const TaskItem: React.FC<Props> = ({ task, onToggleTask }) => {
  const { id, text, completed } = task
  const onClick = () => {
    onToggleTask(id)
  }

  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} onClick={onClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{
              "aria-labelledby": text,
              // @ts-expect-error
              "data-testid": "task-checkbox",
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            textDecoration: completed ? "line-through" : "none",
            whiteSpace: "pre-wrap", // show line break & tap,
          }}
          data-testid="task-text"
        />
      </ListItemButton>
    </ListItem>
  )
}

export default TaskItem
