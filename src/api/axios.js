import axios from 'axios'

// Use VITE_API_URL if provided at build/runtime, otherwise fallback to deployed backend URL or localhost
const getBaseURL = () => {
  let envUrl = import.meta.env.VITE_API_URL
  if (envUrl && envUrl.includes('.onrender.com') && !envUrl.includes('job-portal-backend-phu8')) {
    if (!envUrl.startsWith('http://') && !envUrl.startsWith('https://')) {
      envUrl = `https://${envUrl}`
    }
    return envUrl
  }
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

