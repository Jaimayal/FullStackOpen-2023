import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  return axios.get(baseUrl).then((res) => {
    console.log(res)
    return res.data
  })
}

export default {
  getAll,
}
