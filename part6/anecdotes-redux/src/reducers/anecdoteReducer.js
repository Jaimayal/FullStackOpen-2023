import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVoteById(state, action) {
      const id = action.payload
      const toChange = state.find(a => a.id === id)
      const newElement = {
        ...toChange,
        votes: toChange.votes+1,
      }
      return state.map(element => element.id !== id ? element : newElement).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addVoteById, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const { data: anecdotes } = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const { data: saved } = await anecdotesService.saveAnecdote(anecdote)
    dispatch(appendAnecdote(saved))
  }
}

export const addNewVoteToAnecdote = (anecdoteId) => {
  return async (dispatch) => {
    await anecdotesService.vote(anecdoteId)
    dispatch(addVoteById(anecdoteId))
  }
}

export default anecdoteSlice.reducer