import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let updateBlog

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'http://localhost:3000',
      likes: 1,
      user: {
        name: 'Test User',
      },
    }

    updateBlog = jest.fn()
    const deleteBlog = jest.fn()
    render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />)
  })

  test('renders only title and author by default', () => {
    screen.getByText(
      'Component testing is done with react-testing-library Test Author',
      { exact: false }
    )
    screen.getByText('Test Author', { exact: false })
  })

  test('renders all the details (url, likes, user) when the view button is clicked', () => {
    const viewButton = screen.getByText('View details')

    userEvent.click(viewButton)
    screen.getByText(
      'Component testing is done with react-testing-library Test Author',
      { exact: false }
    )
    screen.getByText('Test Author', { exact: false })
    screen.getByText('http://localhost:3000', { exact: false })
    screen.getByText('likes 1', { exact: false })
    screen.getByText('Test User', { exact: false })
  })

  test('clicking the like button twice calls the event handler twice', () => {
    const viewButton = screen.getByText('View details')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('Like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
