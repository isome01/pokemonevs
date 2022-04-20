import axios from 'axios/index'

const backendUrl = `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}`

const ajax = axios.create({
  baseURL: backendUrl,
  timeout: 8000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  }
})

export default ajax