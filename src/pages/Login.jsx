import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Mail, Lock, LogIn, AlertCircle, Building2, UserCheck, TrendingUp, Users, PieChart } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* LEFT PANEL: Vibrant Royal Blue Showcase (As per user reference image) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          
          {/* Subtle background geometric pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 space-y-4">
            {/* Top Logo */}
            <div className="inline-flex items-center gap-2 font-extrabold text-lg tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center font-bold text-sm shadow-md">
                J
              </div>
              <span>JobPortal</span>
            </div>

            {/* Mock Dashboard Illustration (Matching reference photo graphics) */}
            <div className="pt-4 space-y-3">
              
              {/* Floating Graph Card Mock */}
              <div className="bg-white/95 backdrop-blur-md text-slate-800 p-4 rounded-2xl shadow-xl space-y-2 transform -rotate-1 transition hover:rotate-0 duration-300">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Active Applicants</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +24%
                  </span>
                </div>
                <div className="text-xl font-extrabold text-slate-900">1,782</div>
                
                {/* SVG Curve Line Mock */}
                <div className="h-10 w-full pt-1">
                  <svg className="w-full h-full text-blue-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M0 25 Q 20 5, 40 20 T 80 8 T 100 15" />
                  </svg>
                </div>
              </div>

              {/* Mini Donut Chart Mock */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/90 text-slate-800 p-3 rounded-xl shadow-lg flex items-center gap-2.5">
                  <PieChart className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Hire Rate</p>
                    <p className="text-xs font-bold text-slate-900">92.4%</p>
                  </div>
                </div>

                <div className="bg-white/90 text-slate-800 p-3 rounded-xl shadow-lg flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Candidates</p>
                    <p className="text-xs font-bold text-slate-900">2.5k+</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Showcase Caption */}
          <div className="relative z-10 pt-6 border-t border-white/20">
            <h3 className="text-lg font-extrabold leading-snug">Portal Dashboard</h3>
            <p className="text-xs text-blue-100 font-medium mt-1 leading-relaxed">
              Track applications, post vacancies, and evaluate top candidates effortlessly.
            </p>
          </div>

        </div>

        {/* RIGHT PANEL: Clean Off-White Form Card (As per user reference image) */}
        <div className="lg:col-span-7 bg-slate-50/60 p-6 sm:p-10 flex flex-col justify-center relative">
          
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Header */}
            <div className="space-y-1 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Welcome back 👋
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Login to continue to your account
              </p>
            </div>

            {/* Quick Demo Login Shortcuts */}
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm space-y-2">
              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider">Quick Demo Credentials</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoUser('manager@gmail.com', 'manager123')}
                  className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs py-2 px-3 rounded-xl font-bold transition"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Demo Manager</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoUser('user@gmail.com', 'user123')}
                  className="flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs py-2 px-3 rounded-xl font-bold transition"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Demo Applicant</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-4 py-3 transition shadow-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="janedoe@email.com"
                    className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-4 py-3 transition shadow-sm">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              {/* Submit Button (Matching solid blue button in reference image) */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500 space-y-2">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold transition">
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Login

