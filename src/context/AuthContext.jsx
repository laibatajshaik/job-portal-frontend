import { createContext, useState } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

const demoUsers = [
  {
    name: 'Demo User',
    email: 'user@gmail.com',
    password: 'user123',
    role: 'user',
  },
  {
    name: 'Demo Manager',
    email: 'manager@gmail.com',
    password: 'manager123',
    role: 'manager',
  },
  
]

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch (err) {
    console.error("Failed to parse saved user from localStorage:", err)
    localStorage.removeItem('user')
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password, name: '', role: '' })
      const data = res.data
      const loggedUser = data.user
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      localStorage.setItem('token', data.access_token)
      setLoading(false)
      return { success: true }
    } catch (err) {
      console.warn("Backend auth failed:", err)
      setLoading(false)
      return {
        success: false,
        message: err.response?.data?.detail || 'Invalid email or password',
      }
    }
  }

  const register = async (name, email, password, role) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/register', { name, email, password, role })
      const data = res.data
      const loggedUser = { name, email, role }
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      localStorage.setItem('token', data.access_token)
      setLoading(false)
      return { success: true }
    } catch (err) {
      console.warn("Backend registration failed:", err)
      setLoading(false)
      return {
        success: false,
        message: err.response?.data?.detail || 'Registration failed. Please try again.',
      }
    }
  }

  const resetPassword = async (email, newPassword, code) => {
    setLoading(true)
    try {
      await api.post('/auth/reset-password', { email, new_password: newPassword, code })
      setLoading(false)
      return { success: true }
    } catch (err) {
      console.warn("Backend password reset failed:", err)
      setLoading(false)
      return {
        success: false,
        message: err.response?.data?.detail || 'Password reset failed.',
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        resetPassword,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}