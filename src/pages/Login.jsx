import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Mail, Lock, LogIn, Sparkles, UserCheck, Building2, AlertCircle } from 'lucide-react'

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

  const fillDemoUser = (demoEmail, demoPass) => {
    setEmail(demoEmail)
    setPassword(demoPass)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-mesh flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-600/30 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25 mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Log in to manage your applications or candidate postings.</p>
        </div>

        {/* Demo Login Quick Fill Shortcuts */}
        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">Quick Demo Login Shortcuts</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoUser('manager@gmail.com', 'manager123')}
              className="flex items-center justify-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-xs py-2 px-3 rounded-xl font-medium transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Demo Manager</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoUser('user@gmail.com', 'user123')}
              className="flex items-center justify-center gap-1.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 text-xs py-2 px-3 rounded-xl font-medium transition"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Applicant</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-3.5 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500/60 rounded-xl px-4 py-3 transition">
              <Mail className="w-4 h-4 text-indigo-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500/60 rounded-xl px-4 py-3 transition">
              <Lock className="w-4 h-4 text-purple-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.01]"
          >
            <LogIn className="w-4 h-4" />
            <span>Login to Account</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

