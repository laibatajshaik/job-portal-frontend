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
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base tracking-tight hover:opacity-90 transition">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B2525] to-[#E87552] flex items-center justify-center text-white shadow-md">
            <Briefcase className="w-4.5 h-4.5" />
          </div>
          <span className="text-[#3B2525] font-black tracking-tight">JobPortal</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/jobs"
            className={`text-xs font-bold tracking-wide uppercase transition ${
              location.pathname === '/jobs'
                ? 'text-[#E87552] font-black border-b-2 border-[#E87552] pb-1'
                : 'text-slate-555 hover:text-[#E87552]'
            }`}
          >
            Find Jobs
          </Link>

          {user && user.role === 'manager' && (
            <Link
              to="/manager/post-job"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-slate-555 hover:text-[#E87552] transition"
            >
              <PlusCircle className="w-4 h-4 text-[#E87552]" />
              <span>Post a Job</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3.5 pl-4 border-l border-slate-200">
              <button
                onClick={goToDashboard}
                className="flex items-center gap-2 bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition duration-150"
              >
                <User className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 font-bold">
                <span>{user.name}</span>
                <span className="uppercase text-[9px] bg-[#3B2525]/10 text-[#3B2525] font-bold px-2.5 py-0.5 rounded-full border border-[#3B2525]/20 tracking-wider">
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
                className="text-xs font-bold text-slate-700 hover:text-[#E87552] px-4 py-2 rounded-full transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Secure Admin Access Node */}
          {!user && (
            <Link
              to="/admin/login"
              title="Secure Admin System Access"
              className="p-2 rounded-full text-slate-400 hover:text-[#E87552] hover:bg-slate-50 transition"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
            </Link>
          )}

        </div>

      </div>
    </header>
  )
}

export default Navbar