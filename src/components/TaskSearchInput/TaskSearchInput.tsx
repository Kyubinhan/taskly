import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import React from "react"

interface Props {
  onSearchTask: (text: string) => void
}

const TaskSearchInput: React.FC<Props> = ({ onSearchTask }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTask(e.target.value)
  }

  return (
    <TextField
      onChange={onChange}
      placeholder="Search by keywords"
      size="small"
      inputProps={{
        "data-testid": "task-search-input",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default TaskSearchInput
