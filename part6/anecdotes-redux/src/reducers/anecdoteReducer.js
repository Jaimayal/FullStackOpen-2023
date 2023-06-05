import { createSlice } from "@reduxjs/toolkit"

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
      console.log(action);
      const id = action.payload
      const toChange = state.find(a => a.id === id)
      const newElement = {
        ...toChange,
        votes: toChange.votes+1,
      }
      return state.map(element => element.id !== id ? element : newElement).sort((a, b) => b.votes - a.votes)
    },
    addNewAnecdote(state, action) {
      const anecdote = action.payload
      const anecdoteObj = asObject(anecdote);
      state.push(anecdoteObj)
    }
  }
})

export const { addVoteById, addNewAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer