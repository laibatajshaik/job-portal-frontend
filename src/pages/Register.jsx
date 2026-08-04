import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import PasswordStrengthMeter from '../components/password/PasswordStrengthMeter'
import { Mail, Lock, User, UserPlus, AlertCircle, Eye, EyeOff } from 'lucide-react'
import api from '../api/axios'

function Register() {
  const { register, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')

  const roleRef = useRef('user')
  useEffect(() => {
    roleRef.current = role
  }, [role])

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

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id: "242260456878-i33gg7lb37j70rk893i4i9svc15ep1pl.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("googleBtnRegister"),
          { theme: "outline", size: "large", width: "380px" }
        );
      }
    };

    if (window.google) {
      initializeGoogle();
    } else {
      let script = document.getElementById('google-gsi-script');
      if (!script) {
        script = document.createElement('script');
        script.id = 'google-gsi-script';
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
      script.addEventListener('load', initializeGoogle);
      return () => {
        script.removeEventListener('load', initializeGoogle);
      };
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    setError('')
    try {
      const res = await api.post('/auth/google-login', { token: response.credential, role: roleRef.current })
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#003366] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        {}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0080FF] to-[#0040A0] text-white flex flex-col justify-center px-10 py-16 relative overflow-hidden shrink-0">
          
          {}
          <div className="absolute w-96 h-96 rounded-full bg-[#0055D0] -bottom-20 -left-20 pointer-events-none opacity-80" />
          <div className="absolute w-72 h-72 rounded-full bg-[#0055D0] -top-10 -right-10 pointer-events-none opacity-60" />
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-[#0080FF] to-[#0040A0] bottom-10 left-32 pointer-events-none shadow-xl border border-white/10 z-10" />

          <div className="relative z-20 space-y-6">
            <span className="text-[11px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full font-bold">
              Join Our Network
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none uppercase">
              CREATE <br />
              <span className="text-[#003366] bg-white px-2 py-0.5 rounded mt-2 inline-block font-black text-2xl sm:text-3xl">
                NEW ACCOUNT
              </span>
            </h1>
            <p className="text-white/70 text-xs leading-relaxed max-w-xs font-semibold">
              Get access to thousands of job openings or recruit best-in-class talent for your company.
            </p>
          </div>
        </div>

        {}
        <div className="md:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-12 space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#003366] tracking-tight">Register</h2>
            <p className="text-[11px] text-slate-400 font-semibold">
              Fill in the details to create your secure profile.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 border border-rose-100 bg-rose-50 text-rose-700 text-xs px-4 py-3 rounded-2xl font-bold animate-pulse">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
            </div>

            {}
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
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
            </div>

            {}
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
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-12 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#0066FF] hover:underline"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : "SHOW"}
              </button>
            </div>

            {}
            <PasswordStrengthMeter password={password} />

            {}
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Registering As:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#F4F7FC] border-none rounded-2xl px-4 py-3 text-xs text-slate-700 font-bold cursor-pointer focus:ring-2 focus:ring-[#0066FF] outline-none"
              >
                <option value="user">Candidate (Job Seeker)</option>
                <option value="manager">Recruiter (Company Manager)</option>
              </select>
            </div>

            {}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#003366] hover:bg-[#002244] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md hover:shadow-lg transition uppercase tracking-wider"
              >
                Register
              </button>
            </div>

          </form>

          {}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {}
          <div className="flex justify-center w-full min-h-[44px]">
            <div id="googleBtnRegister" className="w-full flex justify-center"></div>
          </div>

          {}
          <div className="text-center pt-2">
            <p className="text-[11px] font-bold text-slate-505">
              Already have an account?{" "}
              <Link to="/login" className="text-[#0066FF] hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Register
