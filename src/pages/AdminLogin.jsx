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
    <div className="min-h-screen flex items-center justify-center bg-[#0066FF] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Left side: Premium Royal Blue Gradient welcome card */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0066FF] to-[#003366] text-white flex flex-col justify-center px-10 py-16 relative overflow-hidden shrink-0">
          {/* Abstract circles matching mockup */}
          <div className="absolute w-80 h-80 rounded-full bg-white/5 -top-20 -right-20 pointer-events-none" />
          <div className="absolute w-60 h-60 rounded-full bg-white/5 -bottom-10 -left-10 pointer-events-none" />
          <div className="absolute w-48 h-48 rounded-full bg-white/10 bottom-20 right-10 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <span className="text-[11px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full font-bold inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Console
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none uppercase">
              ADMIN <br />
              <span className="text-[#0066FF] bg-white px-2 py-0.5 rounded mt-2 inline-block font-black text-2xl sm:text-3xl">
                SYSTEM LOGIN
              </span>
            </h1>
            <p className="text-white/70 text-xs leading-relaxed max-w-xs font-semibold">
              Authorized personnel only. Access system configuration and audit logs.
            </p>
          </div>
        </div>

        {/* Right side: Modern Form */}
        <div className="md:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-12 space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#003366] tracking-tight">System Sign in</h2>
            <p className="text-[11px] text-slate-400 font-semibold">
              Enter system administrative credentials.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 border border-rose-100 bg-rose-50 text-rose-700 text-xs px-4 py-3 rounded-2xl font-bold animate-pulse">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin Password"
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
            </div>

            {/* Submit Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#003366] hover:bg-[#002244] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md hover:shadow-lg transition uppercase tracking-wider"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex-1 bg-[#F4F7FC] hover:bg-slate-200/50 text-[#003366] font-extrabold text-xs py-4 rounded-2xl transition uppercase tracking-wider border border-slate-200"
              >
                Candidate Sign in
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  )
}

export default AdminLogin
