import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import React from "react"

import { TaskFilterOption } from "src/types"

interface Props {
  option: TaskFilterOption
  onFilterChange: (option: TaskFilterOption) => void
}

const TaskFilterSelect: React.FC<Props> = ({ option, onFilterChange }) => {
  const onChange = (e: SelectChangeEvent) => {
    const option = e.target.value as TaskFilterOption

    onFilterChange(option)
  }

  return (
    <Select
      value={option}
      onChange={onChange}
      size="small"
      SelectDisplayProps={{
        // @ts-expect-error
        "data-testid": "task-filter-select",
      }}
    >
      <MenuItem value={TaskFilterOption.ALL}>All</MenuItem>
      <MenuItem value={TaskFilterOption.ACTIVE}>Active</MenuItem>
      <MenuItem value={TaskFilterOption.COMPLETED}>Completed</MenuItem>
    </Select>
  )
}

export default TaskFilterSelect
