import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, loggedInUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const onViewDetailsClick = () => {
    console.log('View details clicked', blog)
    setShowDetails(!showDetails)
  }

  const onLikeClick = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(updatedBlog)
    console.log('Like clicked', updatedBlog)
  }

  const onDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  if (showDetails) {
    const isLoggedInUserTheOwner = blog.user.username === loggedInUser.username
    if (isLoggedInUserTheOwner) {
      return (
        <div className='blog'>
          <p>
            {blog.title} {blog.author}{' '}
            <button onClick={onViewDetailsClick}>View details</button>
          </p>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={onLikeClick}>Like</button>{' '}
          </p>
          <p>{blog.user.name}</p>
          <button onClick={onDeleteClick} style={{ backgroundColor: 'red' }}>
            Delete
          </button>
        </div>
      )
    }

    return (
      <div className='blog'>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={onViewDetailsClick}>View details</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={onLikeClick}>Like</button>{' '}
        </p>
        <p>{blog.user.name}</p>
      </div>
    )
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={onViewDetailsClick}>View details</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
