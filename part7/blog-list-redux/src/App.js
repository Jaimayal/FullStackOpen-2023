import { useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import {
  clearNotification,
  setNotification,
} from './reducers/notificationReducer'
import {
  addBlog,
  removeBlog,
  updateBlog,
} from './reducers/blogsReducer'
import {
  setUser,
  clearUser
} from './reducers/userReducer'

import { useSelector, useDispatch } from 'react-redux'
import { useBlogs, useLogin } from './hooks/hooks'

const App = () => {
  const formRef = useRef()
  const user = useLogin()
  const blogs = useBlogs()
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  if (user === null) {
    return (
      <>
        <p>{notification}</p>
        <LoginForm
          setUser={setUser}
          setNotification={setNotification}
          clearNotification={clearNotification}
        />
      </>
    )
  }

  const onLogoutClick = () => {
    localStorage.removeItem('loggedBloglistUser')
    dispatch(clearUser())
    displayMessageAndHide('User logged out', 5)
  }

  const displayMessageAndHide = (message, seconds) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }

  const add = async (blog) => {
    try {
      const saved = await blogService.saveBlog(blog)
      console.log(saved)
      dispatch(addBlog(saved))
      formRef.current.toggleVisibility()
      displayMessageAndHide(
        `A new blog ${saved.title} by ${saved.author} added`,
        5
      )
    } catch (error) {
      console.error(error)
      displayMessageAndHide(error.response.data.error, 5)
    }
  }

  const update = async (blog) => {
    try {
      const blogToSubmit = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user.id,
      }
      await blogService.updateBlog(blogToSubmit)
      const updated = await blogService.getById(blogToSubmit.id)
      console.log(updated)
      dispatch(updateBlog(updated))
    } catch (error) {
      displayMessageAndHide(error.response.data.error, 5)
    }
  }

  const remove = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch(removeBlog(blog.id))
    } catch (error) {
      displayMessageAndHide(error.response.data.error, 5)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{notification}</p>
      <p>{user.name} logged in</p>
      <button onClick={onLogoutClick}>logout</button>
      {[...blogs]
        .sort((curr, next) => next.likes - curr.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={update}
            deleteBlog={remove}
            loggedInUser={user}
          />
        ))}
      <Togglable buttonLabel="Add Blog" ref={formRef}>
        <AddBlogForm addBlog={add} />
      </Togglable>
    </div>
  )
}

export default App
