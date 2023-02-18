import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import AddIcon from "@mui/icons-material/Add"
import React, { useState } from "react"

import styles from "./style.module.css"

interface Props {
  onAddTask: (text: string) => void
}

const TaskForm: React.FC<Props> = ({ onAddTask }) => {
  const [text, setText] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask(text)
    setText("")
  }

  return (
    <form className={styles.form} data-testid="task-form" onSubmit={onSubmit}>
      <TextField
        label="New Task"
        size="small"
        fullWidth
        value={text}
        onChange={onChange}
        placeholder="Insert a new task"
        multiline
        maxRows={3}
        inputProps={{
          "data-testid": "task-input",
        }}
      />
      <Button
        className={styles.button}
        size="small"
        variant="contained"
        type="submit"
        data-testid="task-submit-btn"
      >
        <AddIcon />
      </Button>
    </form>
  )
}

export default TaskForm
