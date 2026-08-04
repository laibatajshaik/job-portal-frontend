import { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Menu, X, Briefcase, User, LogOut, ShieldCheck, PlusCircle } from 'lucide-react' 

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

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

  const handleScrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
    } else {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link to="/" aria-label="JobPortal Homepage" className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base tracking-tight hover:opacity-90 transition">
          
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#003366] flex items-center justify-center text-white shadow-md">
            <Briefcase className="w-4.5 h-4.5" />
          </div>
          <span className="text-[#003366] font-black tracking-tight">JobPortal</span>
        </Link>
        <div className="md:hidden flex items-center gap-2.5">
          <button
            onClick={() => handleScrollTo('home')}
            className="text-xs font-bold text-slate-700"
          >
            Home
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 transition"
            >
              Sign Out
            </button>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="text-xs font-bold text-slate-700"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-[#003366] text-white text-xs font-bold px-3 py-1.5 rounded-full"
              >
                Register
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="text-slate-700"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleScrollTo('home')}
            className="text-xs font-bold tracking-wide uppercase text-slate-600 hover:text-[#0066FF] transition cursor-pointer outline-none"
          >
            Home
          </button>
          
          <button
            onClick={() => handleScrollTo('services')}
            className="text-xs font-bold tracking-wide uppercase text-slate-600 hover:text-[#0066FF] transition cursor-pointer outline-none"
          >
            Services
          </button>

          <button
            onClick={() => handleScrollTo('about')}
            className="text-xs font-bold tracking-wide uppercase text-slate-600 hover:text-[#0066FF] transition cursor-pointer outline-none"
          >
            About
          </button>

          <Link
            to="/jobs"
            className={`text-xs font-bold tracking-wide uppercase transition ${
              location.pathname === '/jobs'
                ? 'text-[#0066FF] font-black border-b-2 border-[#0066FF] pb-1'
                : 'text-slate-600 hover:text-[#0066FF]'
            }`}
          >
            Find Jobs
          </Link>

          {user && user.role === 'manager' && (
            <Link
              to="/manager/post-job"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-slate-600 hover:text-[#0066FF] transition"
            >
              <PlusCircle className="w-4 h-4 text-[#0066FF]" />
              <span>Post a Job</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3.5 pl-4 border-l border-slate-200">
              <button
                onClick={goToDashboard}
                className="flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition duration-150"
              >
                <User className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 font-bold">
                <span>{user.name}</span>
                <span className="uppercase text-[9px] bg-[#003366]/10 text-[#003366] font-bold px-2.5 py-0.5 rounded-full border border-[#003366]/20 tracking-wider">
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
                className="text-xs font-bold text-slate-700 hover:text-[#0066FF] px-4 py-2 rounded-full transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition"
              >
                Register
              </Link>
            </div>
            
          )}

          {!user && (
            <Link
              to="/admin/login"
              title="Secure Admin System Access"
              aria-label="Secure Admin System Access"
              className="p-2 rounded-full text-slate-400 hover:text-[#0066FF] hover:bg-slate-50 transition"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
            </Link>
          )}
          
        </div>

{menuOpen && (
  <div className="absolute top-16 right-4 w-52 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 md:hidden z-50">
    <button
      onClick={() => {
        handleScrollTo('services')
        setMenuOpen(false)
      }}
      className="text-left font-medium"
    >
      Services
    </button>

    <button
      onClick={() => {
        handleScrollTo('about')
        setMenuOpen(false)
      }}
      className="text-left font-medium"
    >
      About
    </button>

    <Link
      to="/jobs"
      onClick={() => setMenuOpen(false)}
      className="font-medium"
    >
      Find Jobs
    </Link>
  </div>
)}

      </div>
    </header>
  )
}

export default Navbar