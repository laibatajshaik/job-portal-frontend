import { createContext, useState } from 'react'

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

    const existingUser = demoUsers.find(
      (user) => user.email === email && user.password === password
    )

    if (existingUser) {
      setUser(existingUser)
      localStorage.setItem('user', JSON.stringify(existingUser))
      localStorage.setItem('token', 'demo-token')
      setLoading(false)
      return { success: true }
    }

    setLoading(false)

    return {
      success: false,
      message: 'Invalid email or password',
    }
  }

  const register = async (name, email, password, role) => {
    setLoading(true)

    const existingUser = demoUsers.find(
      (user) => user.email === email
    )

    if (existingUser) {
      setLoading(false)
      return {
        success: false,
        message: 'Email already exists',
      }
    }

    const newUser = {
      name,
      email,
      password,
      role,
    }

    demoUsers.push(newUser)

    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('token', 'demo-token')

    setLoading(false)

    return {
      success: true,
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
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}