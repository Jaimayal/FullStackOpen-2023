import { useContext, useState } from 'react'
import authService from '../services/login'
import PropTypes from 'prop-types'
import AuthContext from '../context/auth'

function LoginForm({ displayNotification }) {
  const [, userDispatch] = useContext(AuthContext)
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
        userDispatch({ type: 'SET', payload: response })
        setUsername('')
        setPassword('')
        displayNotification(`Welcome ${response.name}`)
      })
      .catch((error) => {
        displayNotification(error.response.data.error)
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
  displayNotification: PropTypes.func.isRequired,
}

export default LoginForm
