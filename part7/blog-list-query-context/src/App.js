import { useEffect, useRef, useReducer, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import AuthContext from './context/auth'
const App = () => {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const addBlogMutation = useMutation({
    mutationFn: blogService.saveBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const [user, userDispatch] = useContext(AuthContext)
  const [notification, notificationDispatch] = useReducer((state, action) => {
    const type = action.type
    if (type === 'SET') {
      return action.payload
    } else {
      return ''
    }
  })
  const formRef = useRef()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
    }
  }, [])

  if (query.isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  const blogs = query.data

  const displayNotificationThenHide = (message) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  if (user === null) {
    return (
      <>
        <p>{notification}</p>
        <LoginForm
          displayNotification={displayNotificationThenHide}
        />
      </>
    )
  }

  const onLogoutClick = () => {
    localStorage.removeItem('loggedBloglistUser')
    userDispatch({ type: 'CLEAR' })
  }

  const addBlog = async (blog) => {
    try {
      addBlogMutation.mutate(blog)
      formRef.current.toggleVisibility()
      displayNotificationThenHide(
        `A new blog ${blog.title} by ${blog.author} added`
      )
    } catch (error) {
      displayNotificationThenHide(error.response.data.error)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const blogToSubmit = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user.id,
      }
      updateBlogMutation.mutate(blogToSubmit)
    } catch (error) {
      displayNotificationThenHide(error.response.data.error)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      removeBlogMutation.mutate(blog.id)
    } catch (error) {
      displayNotificationThenHide(error.response.data.error)
    }
  }
  console.log(blogs)
  return (
    <div>
      <h2>blogs</h2>
      <p>{notification}</p>
      <p>{user.name} logged in</p>
      <button onClick={onLogoutClick}>logout</button>
      {blogs
        .sort((curr, next) => next.likes - curr.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            loggedInUser={user}
          />
        ))}
      <Togglable buttonLabel="Add Blog" ref={formRef}>
        <AddBlogForm addBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
