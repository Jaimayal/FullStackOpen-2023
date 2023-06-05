import React from 'react'
import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const combinedReduxer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer,
})
const store = createStore(combinedReduxer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch({ type: "SEARCH" })

// ReactDOM.createRoot(document.getElementById('root')).render(<div>a</div>)
