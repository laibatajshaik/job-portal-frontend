import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Briefcase, User, LogOut, ShieldCheck, LogIn, PlusCircle } from 'lucide-react'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const goToDashboard = () => {
    if (user.role === 'admin') {
      navigate('/admin/dashboard')
    } else if (user.role === 'manager') {
      navigate('/manager/dashboard')
    } else {
      navigate('/user/dashboard')
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base tracking-tight hover:opacity-90 transition">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white shadow-md">
            <Briefcase className="w-4.5 h-4.5" />
          </div>
          <span className="text-black font-bold">JobPortal</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/jobs"
            className={`text-xs font-semibold tracking-wide uppercase transition ${
              location.pathname === '/jobs'
                ? 'text-black font-bold border-b-2 border-black pb-1'
                : 'text-slate-500 hover:text-black'
            }`}
          >
            Find Jobs
          </Link>

          {user && user.role === 'manager' && (
            <Link
              to="/manager/post-job"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-slate-500 hover:text-black transition"
            >
              <PlusCircle className="w-4 h-4 text-black" />
              <span>Post a Job</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3.5 pl-4 border-l border-slate-200">
              <button
                onClick={goToDashboard}
                className="flex items-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition duration-150"
              >
                <User className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 font-semibold">
                <span>{user.name}</span>
                <span className="uppercase text-[9px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-200/60 tracking-wider">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="text-xs font-medium text-slate-400 hover:text-rose-600 transition p-1.5 rounded-lg hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-700 hover:text-black px-3.5 py-2 rounded-xl transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition"
              >
                Register
              </Link>

              <Link
                to="/admin/login"
                className="hidden sm:inline-flex text-xs font-medium text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-50 transition"
                title="Admin Login"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

export default Navbar