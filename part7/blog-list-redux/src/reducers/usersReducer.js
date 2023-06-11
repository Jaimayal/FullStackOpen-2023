import { createSlice } from '@reduxjs/toolkit'

const name = 'users'
const initialState = []

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer