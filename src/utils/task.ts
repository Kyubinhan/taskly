import { Task } from "src/types"

export const isTaskActive = (t: Task) => t.completed === false

export const isTaskCompleted = (t: Task) => t.completed === true
