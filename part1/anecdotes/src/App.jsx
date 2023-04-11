import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([]);
  const [popular, setPopular] = useState(0);

  const nextAnecdote = function() {
    const num = Math.round((Math.random() * anecdotes.length)) - 1
    setSelected(num);
  }

  const voteCurrentAnecdote = function() {
    const copyVotes = [...votes];
    const votesForSelected = copyVotes[selected] ? copyVotes[selected]+1 : 1;
    copyVotes[selected] = votesForSelected
    setVotes(copyVotes);

    console.log(`Comparing votes. Current popular: ${copyVotes[popular]} Current selected: ${votesForSelected}`)
    if (votesForSelected > copyVotes[popular]) {
      setPopular(selected);
    }
  }

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes</p>
      <button onClick={() => nextAnecdote()}>next anecdote</button>
      <button onClick={() => voteCurrentAnecdote()}>vote anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[popular]}</p>
      <p>This anecdote has {votes[popular] ? votes[popular] : 0} votes</p>
    </div>
  )
}

export default App
