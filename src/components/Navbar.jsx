import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { 
  Sparkles, 
  Briefcase, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  User, 
  Building2, 
  LogIn, 
  UserPlus 
} from 'lucide-react'

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

  const goToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            Job<span className="text-gradient">Spark</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={() => goToSection('home')}
            className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition"
          >
            Home
          </button>

          <button
            onClick={() => goToSection('how-it-works')}
            className="hidden md:inline-flex text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition"
          >
            How It Works
          </button>

          <button
            onClick={() => goToSection('features')}
            className="hidden lg:inline-flex text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition"
          >
            Features
          </button>

          <Link
            to="/jobs"
            className={`flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-lg transition ${
              location.pathname === '/jobs'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4 text-indigo-400" />
            Explore Jobs
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <button
                onClick={goToDashboard}
                className="flex items-center gap-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md shadow-indigo-600/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{user.name}</span>
                <span className="uppercase text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded border border-indigo-500/30">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition"
              >
                <LogIn className="w-4 h-4 text-indigo-400" />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-300"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>

              <Link
                to="/admin/login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 px-3 py-2 rounded-lg transition"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar