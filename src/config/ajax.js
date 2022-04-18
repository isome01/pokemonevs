import axios from 'axios/index'

const backendUrl = `http://localhost:5002`

const ajax = axios.create({
  baseURL: backendUrl,
  timeout: 8000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  }
})

export default ajax