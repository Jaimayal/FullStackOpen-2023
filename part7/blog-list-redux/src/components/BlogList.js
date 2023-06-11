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
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import BookIcon from '@mui/icons-material/Book'
import Box from '@mui/material/Box'

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
          name,
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
    <Box sx={{ maxWidth: 250, marginY: 3 }}>
      <Typography variant="h4" gutterBottom>
        Blogs
      </Typography>
      <List dense={true}>
        {[...blogs]
          .sort((curr, next) => next.likes - curr.likes)
          .map((blog) => (
            <ListItem key={blog.id}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>} />
            </ListItem>
          ))}
      </List>

      <Togglable buttonLabel="Add Blog" ref={formRef}>
        <AddBlogForm addBlog={add} />
      </Togglable>
    </Box>
  )
}

export default BlogList
