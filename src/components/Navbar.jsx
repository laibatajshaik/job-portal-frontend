import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { 
  Sparkles, 
  Briefcase, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Job<span className="text-indigo-600">Spark</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-1 md:gap-4">
          <button
            onClick={() => goToSection('home')}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            Home
          </button>

          <button
            onClick={() => goToSection('how-it-works')}
            className="hidden md:inline-flex text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            How It Works
          </button>

          <button
            onClick={() => goToSection('features')}
            className="hidden lg:inline-flex text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            Features
          </button>

          <Link
            to="/jobs"
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition ${
              location.pathname === '/jobs'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            Explore Jobs
          </Link>

          {user ? (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <button
                onClick={goToDashboard}
                className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg shadow-sm transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </button>

              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold">{user.name}</span>
                <span className="uppercase text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <Link
                to="/login"
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-600" />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg shadow-sm transition"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Register
              </Link>

              <Link
                to="/admin/login"
                className="hidden sm:flex items-center gap-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-2 rounded-lg transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
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