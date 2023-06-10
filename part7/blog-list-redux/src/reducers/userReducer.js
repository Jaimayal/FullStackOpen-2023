import { createSlice } from '@reduxjs/toolkit'

const name = 'user'
const initialState = null

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(_, action) {
      return action.payload
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
