import { useState } from 'react'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
function Notification({ notification, type = 'info' }) {
  const [open, setOpen] = useState(true)

  if (!notification) {
    return
  }

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        severity={type}
      >
        {notification}
      </Alert>
    </Collapse>
  )
}

export default Notification
