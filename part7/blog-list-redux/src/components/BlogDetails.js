import { useState } from 'react'
import { useSelector } from 'react-redux'

function BlogDetails({ blog, updateBlog, addComment }) {
  const [comment, setComment] = useState('')
  const blogs = useSelector((state) => state.blogs)
  const toDisplay = blogs.find((blg) => blg.id === blog.id)
  if (!toDisplay) {
    return <p>Blog not found</p>
  }

  const addedBy = toDisplay.user.name

  const onLikeClick = () => {
    updateBlog(blog)
    console.log('Like clicked')
  }

  const onCommentClick = () => {
    addComment(blog, comment)
  }

  // const onDeleteClick = () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     deleteBlog(blog)
  //   }
  // }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <a href={blog.info}>{blog.info}</a>
      <p>
        {blog.likes} likes <button onClick={onLikeClick}>like</button>
      </p>
      <p>added by {addedBy}</p>
      <h3>comments</h3>
      <input
        id="comment"
        name="comment"
        type="text"
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={onCommentClick}>add comment</button>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
