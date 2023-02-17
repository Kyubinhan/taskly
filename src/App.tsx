import React from "react"
import TaskForm from "./components/TaskForm"

const App: React.FC = () => {
  return (
    <div className="App">
      <TaskForm onAddTask={() => {}} />
    </div>
  )
}

export default App
