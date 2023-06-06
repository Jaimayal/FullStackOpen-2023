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
import { useMutation, useQuery, useQueryClient } from 'react-query'
import anecdotesService from './services/anecdotes'

const App = () => {
  // const dispatch = useDispatch()
  // const anecdotes = useSelector((state) => {
  //   const filter = state.filter
  //   if (state.filter.currentFilter === 'NONE') {
  //     return state.anecdotes
  //   } else if (filter.currentFilter === 'SEARCH') {
  //     const searchString = filter.payload.text
  //     return state.anecdotes.filter(
  //       (elem) => elem.content.indexOf(searchString) > -1
  //     )
  //   }

  //   return state.anecdotes
  // })
  // useEffect(() => {
  //   dispatch(initializeAnecdotes())
  // }, [dispatch])

  const queryResult = useQuery('anecdotes', anecdotesService.getAll)
  const addMutation = useMutation(anecdotesService.saveAnecdote)
  const voteMutation = useMutation(anecdotesService.vote)
  const queryClient = useQueryClient()

  if (queryResult.isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (queryResult.isError) {
    return (
      <p>anecdote service not available due to problems with the server</p>
    )
  }

  

  const anecdotes = queryResult.data

  const vote = (id) => {
    voteMutation.mutate(id,  {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = {
      content: event.target.anecdote.value,
      votes: 0,
    }

    addMutation.mutate(anecdote, {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    })
  }

  // const applyFilter = ({ target }) => {
  //   const value = target.value
  //   if (!value) {
  //     dispatch(clearCurrentFilters())
  //     return
  //   }

  //   dispatch(searchByText(value))
  // }

  return (
    <div>
      <Notification />
      {/* <SearchFilter applyFilter={applyFilter} /> */}
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App
