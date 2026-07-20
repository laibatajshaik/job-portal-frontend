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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
        
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto shadow-sm mb-3">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500">Log in to manage your applications or candidate postings.</p>
        </div>

        {/* Demo Login Quick Fill Shortcuts */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2">
          <p className="text-[11px] font-bold text-slate-600 text-center uppercase tracking-wider">Quick Demo Login Shortcuts</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoUser('manager@gmail.com', 'manager123')}
              className="flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs py-2 px-3 rounded-lg font-semibold transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Demo Manager</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoUser('user@gmail.com', 'user123')}
              className="flex items-center justify-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs py-2 px-3 rounded-lg font-semibold transition"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Applicant</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-indigo-500 rounded-lg px-3.5 py-2.5 transition">
              <Mail className="w-4 h-4 text-indigo-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-indigo-500 rounded-lg px-3.5 py-2.5 transition">
              <Lock className="w-4 h-4 text-purple-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-lg shadow-sm transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Login to Account</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-bold transition">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

