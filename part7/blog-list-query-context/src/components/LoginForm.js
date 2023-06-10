import { useState } from 'react'
import authService from '../services/login'
import PropTypes from 'prop-types'

function LoginForm({ setUser, setNotification }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLoginFormSubmit = (event) => {
    event.preventDefault()
    console.log('Username: ', username)
    console.log('Password: ', password)
    authService
      .login({ username, password })
      .then((response) => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response))
        setUser(response)
        setUsername('')
        setPassword('')
        setNotification(`Welcome ${response.name}`)
        setTimeout(() => {
          setNotification('')
        }, 5000)
      })
      .catch((error) => {
        setNotification(error.response.data.error)
        setTimeout(() => {
          setNotification('')
        }, 5000)
      })
  }

  return (
    <>
      <form onSubmit={onLoginFormSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default LoginForm
