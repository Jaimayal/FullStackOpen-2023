import { useState } from 'react'
import PropTypes from 'prop-types'

function AddBlogForm({ addBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onAddBlogFormSubmit = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
  }

  return (
    <>
      <h2>Add blog</h2>
      <form onSubmit={onAddBlogFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  )
}

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
