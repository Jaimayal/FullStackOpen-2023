import { createContext, useReducer } from 'react'

const AuthContext = createContext()

const userReducer = (state, action) => {
  const type = action.type
  if (type === 'SET') {
    return action.payload
  } else if (type === 'CLEAR') {
    return null
  } else {
    return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <AuthContext.Provider value={[user, userDispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
