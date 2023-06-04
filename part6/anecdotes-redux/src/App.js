import { useSelector, useDispatch } from 'react-redux'
import { addVoteById, addNewAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVoteById(id));
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value;
    dispatch(addNewAnecdote(anecdote));
  }

  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App