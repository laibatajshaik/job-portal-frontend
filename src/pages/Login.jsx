import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react'
import api from '../api/axios'

function Login() {
  const { login, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E87552] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Left side: Premium Espresso & Terracotta Gradient welcome card */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#E87552] to-[#3B2525] text-white flex flex-col justify-center px-10 py-16 relative overflow-hidden shrink-0">
          {/* Abstract circles */}
          <div className="absolute w-80 h-80 rounded-full bg-white/5 -top-20 -right-20 pointer-events-none" />
          <div className="absolute w-60 h-60 rounded-full bg-white/5 -bottom-10 -left-10 pointer-events-none" />
          <div className="absolute w-48 h-48 rounded-full bg-white/10 bottom-20 right-10 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <span className="text-[11px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full font-bold">
              Premium Job Portal
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none uppercase">
              WELCOME <br />
              <span className="text-[#3B2525] bg-white px-2 py-0.5 rounded mt-2 inline-block font-black text-2xl sm:text-3xl">
                TO CAREER PORTAL
              </span>
            </h1>
            <p className="text-white/70 text-xs leading-relaxed max-w-xs font-semibold">
              Connecting talented candidates with leading companies worldwide. Login or signup to start your professional journey.
            </p>
          </div>
        </div>

        {/* Right side: Modern Form */}
        <div className="md:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-12 space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#3B2525] tracking-tight">Sign in</h2>
            <p className="text-[11px] text-slate-400 font-semibold">
              Enter your credentials to access your personalized workspace.
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
                placeholder="User Email"
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#E87552] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#E87552] rounded-2xl pl-11 pr-12 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#E87552] hover:underline"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : "SHOW"}
              </button>
            </div>

            {/* Remember & Forgot Row */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-200 text-[#E87552] focus:ring-[#E87552]"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#E87552] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#3B2525] hover:bg-[#2e1d1d] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md hover:shadow-lg transition uppercase tracking-wider"
              >
                Sign in
              </button>
            </div>

          </form>

          {/* Social Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Google signup role */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Google Signup Default Role:
            </label>
            <select
              value={googleRole}
              onChange={(e) => setGoogleRole(e.target.value)}
              className="w-full bg-[#F4F7FC] border-none rounded-2xl px-4 py-3 text-xs text-slate-700 font-bold cursor-pointer focus:ring-2 focus:ring-[#E87552] outline-none"
            >
              <option value="user">Candidate (Job Seeker)</option>
              <option value="manager">Recruiter (Company Manager)</option>
            </select>
          </div>

          {/* Google Button */}
          <div className="flex justify-center w-full max-w-md min-h-[44px]">
            <div id="googleBtn" className="w-full flex justify-center"></div>
          </div>

          {/* Signup Link */}
          <div className="text-center pt-2">
            <p className="text-[11px] font-bold text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#E87552] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login
