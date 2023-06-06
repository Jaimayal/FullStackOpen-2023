import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(baseUrl).then((res) => {
    return res.data
  })
}

const saveAnecdote = (anecdote) => {
  return axios.post(baseUrl, anecdote).then((res) => res.data)
}

const vote = (anecdoteId) => {
  return axios
    .get(`${baseUrl}/${anecdoteId}`)
    .then((res) => {
      console.log(res)
      const note = res.data
      console.log(note);
      return axios.put(baseUrl + '/' + anecdoteId, {
        ...note,
        votes: note.votes + 1,
      })
    })
    .then((res) => {
      console.log(res);
      return res.data
    })
}

export default {
  getAll,
  saveAnecdote,
  vote,
}
