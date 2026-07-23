import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Left side: Honey Orange column matching reference mockup */}
      <div className="md:w-2/5 bg-gradient-to-br from-[#FFA726] to-[#FFB84C] text-white flex flex-col justify-center px-12 py-12 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight z-10">
          Admin Portal <br />
          Authentication
        </h1>
        <p className="text-white opacity-90 text-sm leading-relaxed max-w-xs font-semibold z-10 font-sans">
          Access the backend management and configuration panel.
        </p>
      </div>

      {/* Right side: Modern Form column with rounded outlines and pill buttons */}
      <div className="md:w-3/5 flex flex-col justify-center px-12 sm:px-20 py-12 space-y-6">
        
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">Admin Sign In</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">Enter your credential tokens below.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 border border-red-200 bg-red-50 text-red-700 text-xs px-4 py-3 rounded-2xl max-w-md font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jobportal.com"
              className="w-full bg-white border border-slate-200 rounded-full px-5 py-3.5 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#FFA726] font-semibold transition"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-slate-200 rounded-full px-5 py-3.5 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#FFA726] font-semibold transition"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-md transition duration-150 uppercase tracking-wider"
            >
              Login as Administrator
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="bg-slate-250 hover:bg-slate-300 text-slate-700 font-bold text-xs px-8 py-3.5 rounded-full transition duration-150 uppercase tracking-wider"
            >
              User Login
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AdminLogin
