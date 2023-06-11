import { Navigate, Route, Routes, redirect, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { useBlogs, useLogin, useUsers } from './hooks/hooks'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import authService from './services/login'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/userReducer'
import blogsService from './services/blogs'
import { updateBlog } from './reducers/blogsReducer'
import Navbar from './components/Navbar'
const App = () => {
  const users = useUsers()
  const blogs = useBlogs()
  const loggedInUser = useLogin()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((usr) => usr.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blg) => blg.id === blogMatch.params.id)
    : null

  const onLogin = (username, password) => {
    authService
      .login({ username, password })
      .then((response) => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response))
        dispatch(setUser(response))
        dispatch(setNotification(`Welcome ${response.name}`))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
        redirect('/')
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      })
  }

  const onLikeClick = async (blog) => {
    const toSendUpdatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    const toDispatchBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    blogsService
      .updateBlog(toSendUpdatedBlog)
      .then(() => dispatch(updateBlog(toDispatchBlog)))
  }

  const onLogoutClick = () => {
    localStorage.removeItem('loggedBloglistUser')
    dispatch(clearUser())
    dispatch(setNotification('User logged out'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const onCommentClick = (blog, comment) => {
    const toSendBlog = {
      ...blog,
      user: blog.user.id,
      comments: [...blog.comments, comment],
    }
    const toDispatchBlog = {
      ...blog,
      comments: [...blog.comments, comment],
    }
    blogsService
      .updateBlog(toSendBlog)
      .then(() => dispatch(updateBlog(toDispatchBlog)))
  }

  return (
    <main>
      <p>{notification}</p>
      <Navbar onLogoutClick={onLogoutClick} user={loggedInUser} />
      <Routes>
        <Route path="/" element={<p>pepe</p>} />
        <Route path="/blogs" element={<BlogList blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blog={blog}
              updateBlog={onLikeClick}
              addComment={onCommentClick}
            />
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route
          path="/login"
          element={
            loggedInUser ? (
              <Navigate to="/blogs" />
            ) : (
              <LoginForm onLogin={onLogin} />
            )
          }
        />
      </Routes>
    </main>
  )
}

export default App
