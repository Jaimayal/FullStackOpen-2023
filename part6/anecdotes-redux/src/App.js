import { useSelector, useDispatch } from 'react-redux'
import { addVoteById, addNewAnecdote } from './reducers/anecdoteReducer'
import {
  removeNotification,
  setNotification,
} from './reducers/notificationReducer'
import { clearCurrentFilters, searchByText } from './reducers/filterReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchFilter from './components/SearchFilter'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter
    if (state.filter.currentFilter === 'NONE') {
      return state.anecdotes
    } else if (filter.currentFilter === 'SEARCH') {
      const searchString = filter.payload.text
      return state.anecdotes.filter(
        (elem) => elem.content.indexOf(searchString) > -1
      )
    }

    return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(setNotification('Added a new vote'))
    dispatch(addVoteById(id))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(setNotification('Added a new anecdote'))
    dispatch(addNewAnecdote(anecdote))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const applyFilter = ({ target }) => {
    const value = target.value
    if (!value) {
      dispatch(clearCurrentFilters())
      return
    }

    dispatch(searchByText(value))
  }

  return (
    <div>
      <Notification />
      <SearchFilter applyFilter={applyFilter} />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App