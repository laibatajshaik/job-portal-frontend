import { useContext, useState, useEffect } from 'react'
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
      const res = await api.post('/auth/google-login', { token: response.credential })
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
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side: Black column */}
      <div className="md:w-2/5 bg-black text-white flex flex-col justify-center px-12 py-12 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          Application <br />
          Login Page
        </h1>
        <p className="text-neutral-450 text-sm leading-relaxed max-w-xs font-semibold">
          Login or register from here to access.
        </p>
      </div>

      {/* Right side: Form column */}
      <div className="md:w-3/5 flex flex-col justify-center px-12 sm:px-20 py-12 space-y-6">
        
        {error && (
          <div className="flex items-center gap-2.5 border border-red-200 bg-red-50 text-red-700 text-xs px-4 py-3 rounded-lg max-w-md font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-600">User Name</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User Name"
              className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-600">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-semibold"
            />
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-blue-600 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-150"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/register');
              }}
              className="bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-150"
            >
              Register
            </button>
          </div>
        </form>

        <div className="relative my-2 max-w-md w-full">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-[10px]"><span className="bg-white px-2 text-slate-400 font-semibold uppercase tracking-wider">Or continue with</span></div>
        </div>

        <div className="flex justify-center w-full max-w-md min-h-[44px]">
          <div id="googleBtn" className="w-full flex justify-center"></div>
        </div>

      </div>
    </div>
  )
}

export default Login


