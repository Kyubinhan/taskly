import React, { useState } from "react"
import { v4 } from "uuid"

import TaskForm from "src/components/TaskForm"
import TaskList from "src/components/TaskList"
import TaskFilterSelect from "src/components/TaskFilterSelect"
import { TaskFilterOption } from "src/components/TaskFilterSelect/TaskFilterSelect"
import { Task } from "src/Types/Task"

interface Props {
  tasks?: Task[] // for testing purpose
}

const App: React.FC<Props> = ({ tasks: defaultTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks || [])
  const [filterOption, setFilterOption] = useState<TaskFilterOption>(
    TaskFilterOption.ALL
  )

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

  const tasksToDisplay = tasks.filter((t) => {
    if (filterOption === TaskFilterOption.ALL) {
      return true
    } else if (filterOption === TaskFilterOption.ACTIVE) {
      return t.completed === false
    }
    return t.completed === true
  })

  return (
    <div className="App">
      <TaskForm onAddTask={onAddTask} />
      <TaskFilterSelect onFilterChange={setFilterOption} />
      <TaskList tasks={tasksToDisplay} onCompleteTask={onCompleteTask} />
    </div>
  )
}

export default App
