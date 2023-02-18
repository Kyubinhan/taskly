import React, { useState } from "react"
import { v4 } from "uuid"
import { useLocalStorage } from "usehooks-ts"

import { LocalStorageKey, Task, TaskFilterOption } from "src/types"
import TaskForm from "src/components/TaskForm"
import TaskList from "src/components/TaskList"
import TaskFilterSelect from "src/components/TaskFilterSelect"
import ActiveTaskCount from "src/components/ActiveTaskCount"
import TaskSearchInput from "src/components/TaskSearchInput"
import TopBar from "src/components/TopBar"

import styles from "./style.module.css"

interface Props {
  tasks?: Task[] // for testing purpose
}

const App: React.FC<Props> = ({ tasks: defaultTasks }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    LocalStorageKey.TASKS,
    defaultTasks || []
  )
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
    <>
      <TopBar />
      <div className={styles.contents}>
        <TaskForm onAddTask={onAddTask} />
        <div className={styles.filters}>
          <TaskSearchInput onSearchTask={setSearch} />
          <TaskFilterSelect
            option={filterOption}
            onFilterChange={setFilterOption}
          />
        </div>
        <ActiveTaskCount count={activeTaskCount} />
        <TaskList tasks={tasksToDisplay} onCompleteTask={onCompleteTask} />
      </div>
    </>
  )
}

export default App
