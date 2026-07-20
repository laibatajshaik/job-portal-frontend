import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Mail, Lock, ShieldCheck, AlertCircle, PieChart, Users, TrendingUp } from 'lucide-react'

function AdminLogin() {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('admin@jobportal.com')
  const [password, setPassword] = useState('Admin@123')
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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
        
        {/* LEFT PANEL: Vibrant Royal Blue Showcase (Matching user reference photo) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 font-extrabold text-lg tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center font-bold text-sm shadow-md">
                A
              </div>
              <span>Admin Portal</span>
            </div>

            <div className="pt-4 space-y-3">
              <div className="bg-white/95 backdrop-blur-md text-slate-800 p-4 rounded-2xl shadow-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>System Control</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> Protected
                  </span>
                </div>
                <div className="text-xl font-extrabold text-slate-900">Admin Dashboard</div>
                <p className="text-xs text-slate-500 font-medium">Manage platform users, job postings, and system metrics.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/90 text-slate-800 p-3 rounded-xl shadow-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Security</p>
                    <p className="text-xs font-bold text-slate-900">Superadmin</p>
                  </div>
                </div>

                <div className="bg-white/90 text-slate-800 p-3 rounded-xl shadow-lg flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Analytics</p>
                    <p className="text-xs font-bold text-slate-900">Full Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/20">
            <h3 className="text-lg font-extrabold leading-snug">System Administration</h3>
            <p className="text-xs text-blue-100 font-medium mt-1 leading-relaxed">
              Secure administrative access for system control and monitoring.
            </p>
          </div>

        </div>

        {/* RIGHT PANEL: Clean Form */}
        <div className="lg:col-span-7 bg-slate-50/60 p-6 sm:p-10 flex flex-col justify-center relative">
          
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="space-y-1 text-left">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm mb-2 border border-amber-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Admin Control Login
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Log in to access administrative settings and platform management
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admin Email</label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-4 py-3 transition shadow-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admin Password</label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-4 py-3 transition shadow-sm">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all duration-200 mt-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Login as Administrator</span>
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500">
              Return to{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold transition">
                User Login
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin
