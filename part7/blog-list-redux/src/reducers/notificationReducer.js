import { createSlice } from '@reduxjs/toolkit'

const name = 'notification'
const initialState = ''

const notificationSlice = createSlice({
  name,
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer