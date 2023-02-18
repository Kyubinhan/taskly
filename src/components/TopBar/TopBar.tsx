import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"

import styles from "./style.module.css"

const TopBar = () => {
  return (
    <AppBar className={styles.bar} position="static">
      <Typography className={styles.title} variant="h6" component="div">
        Taskly
      </Typography>
    </AppBar>
  )
}

export default TopBar
