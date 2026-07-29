import axios from 'axios'

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://127.0.0.1:8000'
    }
  }
  return 'https://job-portal-backend-1f0h.onrender.com'
}

const api = axios.create({
  baseURL: getBaseURL()
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
