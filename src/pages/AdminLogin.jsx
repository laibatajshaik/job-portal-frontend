import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function AdminLogin() {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      email === 'admin@jobportal.com' &&
      password === 'Admin@123'
    ) {
      const admin = {
        name: 'Administrator',
        email: 'admin@jobportal.com',
        role: 'admin',
      }

      setUser(admin)

      localStorage.setItem('user', JSON.stringify(admin))
      localStorage.setItem('token', 'demo-token')

      navigate('/admin/dashboard')
    } else {
      setError('Invalid Admin Credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />

        <label className="block mb-1">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
