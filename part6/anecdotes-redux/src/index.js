import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import { QueryClient, QueryClientProvider } from 'react-query'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch({ type: "SEARCH" })
// ReactDOM.createRoot(document.getElementById('root')).render(<div>a</div>)
