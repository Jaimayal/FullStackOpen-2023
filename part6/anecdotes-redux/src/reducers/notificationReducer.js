import { createSlice } from '@reduxjs/toolkit'

const initialState = 'q we'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload
      return message
    },
    removeNotification(state, action) {
      return ''
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
