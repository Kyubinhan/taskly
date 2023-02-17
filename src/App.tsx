import React, { useState } from "react"
import { v4 } from "uuid"

import TaskForm from "src/components/TaskForm"
import TaskList from "src/components/TaskList"
import { Task } from "src/Types/Task"

interface Props {
  tasks?: Task[] // for testing purpose
}

const App: React.FC<Props> = ({ tasks: defaultTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks || [])

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

  return (
    <div className="App">
      <TaskForm onAddTask={onAddTask} />
      <TaskList tasks={tasks} onCompleteTask={onCompleteTask} />
    </div>
  )
}

export default App
