import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { Link, Navigate } from 'react-router-dom'

function BlogList({ blogs }) {
  const formRef = useRef()
  const loggedInUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!loggedInUser) {
    return <Navigate replace to="/login" />
  }

  if (!blogs) {
    return <p>Loading blogs...</p>
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
      const username = loggedInUser.username
      const name = loggedInUser.name
      const toDispatch = {
        ...saved,
        user: {
          username,
          name
        },
      }
      console.log(toDispatch)
      dispatch(addBlog(toDispatch))
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

  return (
    <div>
      <h2>blogs</h2>
      {[...blogs]
        .sort((curr, next) => next.likes - curr.likes)
        .map((blog) => (
          <p key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
        ))}
      <Togglable buttonLabel="Add Blog" ref={formRef}>
        <AddBlogForm addBlog={add} />
      </Togglable>
    </div>
  )
}

export default BlogList
