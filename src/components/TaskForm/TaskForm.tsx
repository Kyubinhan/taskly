import React, { useState } from "react"

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
    <form onSubmit={onSubmit}>
      <input
        value={text}
        onChange={onChange}
        placeholder="Insert a new task"
        data-testid="task-input"
      />
      <button type="submit" data-testid="task-submit-btn">
        Add
      </button>
    </form>
  )
}

export default TaskForm
