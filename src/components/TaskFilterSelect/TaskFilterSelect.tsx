import React from "react"

import { TaskFilterOption } from "src/types"

interface Props {
  onFilterChange: (option: TaskFilterOption) => void
}

const TaskFilterSelect: React.FC<Props> = ({ onFilterChange }) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value as TaskFilterOption

    onFilterChange(option)
  }

  return (
    <select data-testid="task-filter-select" onChange={onChange}>
      <option value={TaskFilterOption.ALL}>All</option>
      <option value={TaskFilterOption.ACTIVE}>Active</option>
      <option value={TaskFilterOption.COMPLETED}>Completed</option>
    </select>
  )
}

export default TaskFilterSelect
