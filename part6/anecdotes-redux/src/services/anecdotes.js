import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = () => {
    return axios.get(baseUrl);
}

const saveAnecdote = (anecdote) => {
    return axios.post(baseUrl, anecdote);
}

const vote = async (anecdoteId) => {
    const note = await axios.get(`${baseUrl}/${anecdoteId}`)
    return axios.put(baseUrl + "/" + anecdoteId, {
        ...note,
        votes: note.votes+1
    })
}


export default {
    getAll,
    saveAnecdote,
    vote
}