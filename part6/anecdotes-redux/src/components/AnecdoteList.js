import Anecdote from './Anecdote'

function AnecdoteList({ anecdotes, vote }) {

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </>
  )
}

export default AnecdoteList
