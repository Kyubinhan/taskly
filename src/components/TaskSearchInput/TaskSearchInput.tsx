import React from "react"

interface Props {
  onSearchTask: (text: string) => void
}

const TaskSearchInput: React.FC<Props> = ({ onSearchTask }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTask(e.target.value)
  }

  return (
    <input
      type="text"
      data-testid="task-search-input"
      onChange={onChange}
      placeholder="Search task by keyword"
    />
  )
}

export default TaskSearchInput
