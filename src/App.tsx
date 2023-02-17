import React from "react"
import TaskForm from "./components/TaskForm"

const App: React.FC = () => {
  const onAddTask = () => {}

  return (
    <div className="App">
      <TaskForm onAddTask={onAddTask} />
    </div>
  )
}

export default App
