import React, { useState } from "react"
import { v4 } from "uuid"

import { Task, TaskFilterOption } from "src/types"
import TaskForm from "src/components/TaskForm"
import TaskList from "src/components/TaskList"
import TaskFilterSelect from "src/components/TaskFilterSelect"
import ActiveTaskCount from "src/components/ActiveTaskCount"
import TaskSearchInput from "src/components/TaskSearchInput"

interface Props {
  tasks?: Task[] // for testing purpose
}

const App: React.FC<Props> = ({ tasks: defaultTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks || [])
  const [filterOption, setFilterOption] = useState<TaskFilterOption>(
    TaskFilterOption.ALL
  )
  const [search, setSearch] = useState("")

  const onAddTask = (text: string) => {
    const newTask = {
      id: v4(),
      text,
      completed: false,
    }

    setTasks((tasks) => [...tasks, newTask])
  }
  const onCompleteTask = (id: string) => {
    setTasks((tasks) =>
      tasks.map((t) => {
        if (t.id === id) {
          return { ...t, completed: true }
        }

        return t
      })
    )
  }

  const searchPattern = search
    .split("")
    .map((x) => {
      return `(?=.*${x})`
    })
    .join("")
  const tasksToDisplay = tasks.filter((t) => {
    if (!t.text.match(new RegExp(searchPattern, "gi"))) return false

    if (filterOption === TaskFilterOption.ALL) {
      return true
    } else if (filterOption === TaskFilterOption.ACTIVE) {
      return t.completed === false
    }
    return t.completed === true
  })
  const activeTaskCount = tasks.filter((t) => t.completed === false).length

  return (
    <main className="App">
      <TaskForm onAddTask={onAddTask} />
      <TaskSearchInput onSearchTask={setSearch} />
      <TaskFilterSelect onFilterChange={setFilterOption} />
      <ActiveTaskCount count={activeTaskCount} />
      <TaskList tasks={tasksToDisplay} onCompleteTask={onCompleteTask} />
    </main>
  )
}

export default App
