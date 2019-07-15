import axios from 'axios'

const BASE_URL = 'http://mediakeuangan.kemenkeu.go.id'

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