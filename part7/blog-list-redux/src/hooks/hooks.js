import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setBlogs } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import usersService from '../services/usersService'
import { setUsers } from '../reducers/usersReducer'
export const useLogin = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  return user
}

export const useBlogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  return blogs
}

export const useUsers = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    usersService.getAll().then((users) => {
      console.log(users)
      dispatch(setUsers(users))
    })
  }, [])

  return users
}
