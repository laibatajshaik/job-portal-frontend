import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login(email, password)
    if (result.success) {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user.role === 'admin') {
    navigate('/admin/dashboard')
  } else if (user.role === 'manager') {
    navigate('/manager/dashboard')
  } else {
    navigate('/user/dashboard')
  }
} else {
      setError(result.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
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
          className="w-full bg-slate-800 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don't have an account? <Link to="/register" className="text-blue-700">Register</Link>
      </p>
    </div>
  )
}

export default Login
