import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function AddBlogForm({ addBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onAddBlogFormSubmit = () => {
    addBlog({ title, author, url })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add blog
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="title"
          label="Title"
          variant="standard"
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          id="author"
          label="Author"
          variant="standard"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          id="url"
          label="URL"
          variant="standard"
          onChange={({ target }) => setUrl(target.value)}
        />
      </Box>
      <Button onClick={onAddBlogFormSubmit} variant="outlined" sx={{ marginX: 2 }}>
        Add
      </Button>
    </>
  )
}

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
