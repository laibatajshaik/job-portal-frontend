import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Mail, Lock, LogIn, AlertCircle, Briefcase } from 'lucide-react'
import api from '../api/axios'

function Login() {
  const { login, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const [googleRole, setGoogleRole] = useState('user')
  const googleRoleRef = useRef('user')

  useEffect(() => {
    googleRoleRef.current = googleRole
  }, [googleRole])

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

  const handleCredentialResponse = async (response) => {
    setError('')
    try {
      const res = await api.post('/auth/google-login', { token: response.credential, role: googleRoleRef.current })
      const loggedInUser = res.data.user
      setUser(loggedInUser)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      localStorage.setItem('token', res.data.access_token)
      if (loggedInUser.role === 'admin') navigate('/admin/dashboard')
      else if (loggedInUser.role === 'manager') navigate('/manager/dashboard')
      else navigate('/user/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Google Authentication failed on server verification.')
    }
  }

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "242260456878-i33gg7lb37j70rk893i4i9svc15ep1pl.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large", width: "380px" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Left side: Honey Orange column matching reference mockup */}
      <div className="md:w-2/5 bg-gradient-to-br from-[#FFA726] to-[#FFB84C] text-white flex flex-col justify-center px-12 py-12 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight z-10">
          Job Portal <br />
          Authentication
        </h1>
        <p className="text-white opacity-90 text-sm leading-relaxed max-w-xs font-semibold z-10 font-sans">
          Access your premium candidate, recruiter, or administrator dashboard.
        </p>
      </div>

      {/* Right side: Modern Form column with rounded outlines and pill buttons */}
      <div className="md:w-3/5 flex flex-col justify-center px-12 sm:px-20 py-12 space-y-6">
        
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">Login to Portal</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">Enter your details or log in via Google SSO.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 border border-red-200 bg-red-50 text-red-700 text-xs px-4 py-3 rounded-2xl max-w-md font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-white border border-slate-200 rounded-full px-5 py-3.5 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#FFA726] font-semibold transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-slate-200 rounded-full px-5 py-3.5 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#FFA726] font-semibold transition"
            />
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-[#FFA726] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-md transition duration-150 uppercase tracking-wider"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/register');
              }}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-8 py-3.5 rounded-full transition duration-150 uppercase tracking-wider"
            >
              Register
            </button>
          </div>
        </form>

        <div className="relative my-2 max-w-md w-full">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-[10px]"><span className="bg-[#F8FAFC] px-2 text-slate-400 font-bold uppercase tracking-wider">Or continue with</span></div>
        </div>

        {/* Google Role Selector */}
        <div className="space-y-1.5 max-w-md w-full">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Select Role (Only for New Google Signups):</label>
          <select
            value={googleRole}
            onChange={(e) => setGoogleRole(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-full px-5 py-3.5 text-xs text-black font-semibold cursor-pointer focus:outline-none focus:border-[#FFA726]"
          >
            <option value="user">Job Seeker (Candidate)</option>
            <option value="manager">Company Manager (Recruiter)</option>
          </select>
        </div>

        <div className="flex justify-center w-full max-w-md min-h-[44px]">
          <div id="googleBtn" className="w-full flex justify-center"></div>
        </div>

      </div>
    </div>
  )
}

export default Login
