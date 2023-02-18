import Typography from "@mui/material/Typography"
import React from "react"

import styles from "./style.module.css"

interface Props {
  count: number
}

const ActiveTaskCount: React.FC<Props> = ({ count }) => {
  return (
    <Typography
      className={styles.count}
      data-testid="active-task-count"
      variant="body2"
    >
      You have {count} pending task(s).
    </Typography>
  )
}

export default ActiveTaskCount
