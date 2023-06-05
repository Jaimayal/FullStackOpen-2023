import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = () => {
    return axios.get(baseUrl);
}

const saveAnecdote = (anecdote) => {
    return axios.post(baseUrl, anecdote);
}


export default {
    getAll,
    saveAnecdote
}