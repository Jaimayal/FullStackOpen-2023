import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLoginFormSubmit = (event) => {
    event.preventDefault()
    console.log('Username: ', username)
    console.log('Password: ', password)
    onLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <Typography variant="h4" sx={{ marginY: 2 }} gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          variant="standard"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Box>
      <Button
        onClick={onLoginFormSubmit}
        variant="outlined"
        sx={{ marginY: 2 }}
      >
        Login
      </Button>
    </>
  )
}

export default LoginForm
