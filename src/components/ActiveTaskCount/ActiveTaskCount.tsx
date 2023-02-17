import React from "react"

interface Props {
  count: number
}

const ActiveTaskCount: React.FC<Props> = ({ count }) => {
  return <div data-testid="active-task-count"># of active tasks: {count}</div>
}

export default ActiveTaskCount
