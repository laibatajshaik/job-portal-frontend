import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Mail, Lock, User, UserPlus, AlertCircle, TrendingUp, Users, PieChart, Briefcase } from 'lucide-react'

function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await register(name, email, password, role)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* LEFT PANEL: Vibrant Royal Blue Showcase (Matching user reference photo) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 font-extrabold text-lg tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center font-bold text-sm shadow-md">
                J
              </div>
              <span>JobPortal</span>
            </div>

            <div className="pt-4 space-y-3">
              <div className="bg-white/95 backdrop-blur-md text-slate-800 p-4 rounded-2xl shadow-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>New Registrations</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> Live
                  </span>
                </div>
                <div className="text-xl font-extrabold text-slate-900">Create Account</div>
                <p className="text-xs text-slate-500 font-medium">Join candidates & companies finding top talent every day.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/90 text-slate-800 p-3 rounded-xl shadow-lg flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase font-sans">Role</p>
                    <p className="text-xs font-bold text-slate-900">Job Seeker</p>
                  </div>
                </div>

                <div className="bg-white/90 text-slate-800 p-3 rounded-xl shadow-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase font-sans">Role</p>
                    <p className="text-xs font-bold text-slate-900">Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/20">
            <h3 className="text-lg font-extrabold leading-snug">Get Started Today</h3>
            <p className="text-xs text-blue-100 font-medium mt-1 leading-relaxed">
              Create your account in seconds to start applying or recruiting.
            </p>
          </div>

        </div>

        {/* RIGHT PANEL: Clean Form */}
        <div className="lg:col-span-7 bg-slate-50/60 p-6 sm:p-10 flex flex-col justify-center relative">
          
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="space-y-1 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create an Account
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Enter your details to register as candidate or manager
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
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-4 py-3 transition shadow-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                    required
                  />
                </div>
              </div>

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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Register As</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-xs text-slate-900 font-medium transition shadow-sm focus:outline-none"
                >
                  <option value="user">Job Seeker (Candidate)</option>
                  <option value="manager">Company Manager (Recruiter)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register Account</span>
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold transition">
                Sign In
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Register
