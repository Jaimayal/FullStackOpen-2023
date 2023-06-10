import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

describe('<AddBlogForm />', () => {
  let addBlog

  beforeEach(() => {
    addBlog = jest.fn()
    render(<AddBlogForm addBlog={addBlog} />)
  })

  test('calls the event handler with the right details when a new blog is created', () => {
    const titleInput = screen.getByPlaceholderText('Blog Title')
    const authorInput = screen.getByPlaceholderText('Name of Author')
    const urlInput = screen.getByPlaceholderText('https://example.com')

    userEvent.type(titleInput, 'Test Title')
    userEvent.type(authorInput, 'Test Author')
    userEvent.type(urlInput, 'http://localhost:3000')

    const addButton = screen.getByText('Add')
    userEvent.click(addButton)
    expect(addBlog.mock.calls).toHaveLength(1)
  })
})
