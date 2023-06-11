import { Link } from 'react-router-dom'

function Navbar({ user, onLogoutClick }) {
  if (!user) {
    return (
      <nav>
        <span style={{ marginRight: '25px' }}>
          <Link to="/login">login</Link>
        </span>
        <span style={{ marginRight: '25px' }}>
          <Link to="/users">users</Link>
        </span>
      </nav>
    )
  }

  return (
    <nav>
      <span style={{ marginRight: '25px' }}>
        <Link to="/blogs">blogs</Link>
      </span>
      <span style={{ marginRight: '25px' }}>
        <Link to="/users">users</Link>
      </span>
      <span>
        {user.name} logged in <button onClick={onLogoutClick}>logout</button>
      </span>
    </nav>
  )
}

export default Navbar
