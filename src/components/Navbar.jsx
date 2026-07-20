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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold text-lg hover:opacity-90 transition">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Briefcase className="w-4 h-4" />
          </div>
          <span>JobPortal</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/jobs"
            className={`text-sm font-medium transition ${
              location.pathname === '/jobs'
                ? 'text-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Find Jobs
          </Link>

          {user && user.role === 'manager' && (
            <Link
              to="/manager/post-job"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Post a Job</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <button
                onClick={goToDashboard}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <span>{user.name}</span>
                <span className="uppercase text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded border border-slate-200">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="text-xs font-medium text-slate-500 hover:text-rose-600 transition p-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-lg transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition"
              >
                Register
              </Link>

              <Link
                to="/admin/login"
                className="hidden sm:inline-flex text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1 transition"
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