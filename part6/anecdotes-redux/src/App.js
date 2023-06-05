import { useSelector, useDispatch } from 'react-redux'
import {
  addNewAnecdote,
  initializeAnecdotes,
  addNewVoteToAnecdote
  
} from './reducers/anecdoteReducer'
import {
  updateNotification
} from './reducers/notificationReducer'
import { clearCurrentFilters, searchByText } from './reducers/filterReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchFilter from './components/SearchFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'

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

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = (id) => {
    dispatch(updateNotification('Added a new vote', 2000))
    dispatch(addNewVoteToAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = {
      content: event.target.anecdote.value,
      likes: 0,
    }

    dispatch(updateNotification('Added a new vote', 2000))
    dispatch(addNewAnecdote(anecdote))
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
