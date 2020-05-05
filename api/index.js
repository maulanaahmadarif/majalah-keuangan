import axios from 'axios'

// const BASE_URL = 'https://mediakeuangan.kemenkeu.go.id'
const BASE_URL = 'https://ssl-reject.herokuapp.com/ssl-reject?url=https://mediakeuangan.kemenkeu.go.id'

export const fetchMagazine = () => {
  return axios
    .get(`${BASE_URL}/api/v1/magazines`)
    .then(res => res.data)
    .catch(err => err.message)
}

export const fetchArticles = (id) => {
  return axios
    .get(`${BASE_URL}/api/v1/magazines/show/${id}`)
    .then(res => res.data)
    .catch(err => err.message)
}