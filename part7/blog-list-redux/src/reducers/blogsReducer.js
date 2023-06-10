import { createSlice } from '@reduxjs/toolkit'

const name = 'blogs'
const initialState = []

const blogsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((a) => a.id !== id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id
      return state.map(currentBlog => currentBlog.id === id ? updatedBlog : currentBlog)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const { addBlog, removeBlog, updateBlog, setBlogs } = blogsSlice.actions
export default blogsSlice.reducer