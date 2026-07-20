import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

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
    if (window.location.pathname !== '/') {
      navigate('/')

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">
        Job Portal
      </Link>

      <div className="flex items-center gap-5">
        <button
          onClick={() => goToSection('home')}
          className="hover:text-gray-300 transition"
        >
          Home
        </button>

        <button
          onClick={() => goToSection('how-it-works')}
          className="hover:text-gray-300 transition"
        >
          How It Works
        </button>

        <button
          onClick={() => goToSection('features')}
          className="hover:text-gray-300 transition"
        >
          Features
        </button>

        <Link
          to="/jobs"
          className="hover:text-gray-300 transition"
        >
          Jobs
        </Link>

        {user ? (
          <>
            <button
              onClick={goToDashboard}
              className="hover:text-gray-300 transition"
            >
              Dashboard
            </button>

            <span className="text-sm">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-white text-slate-800 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-gray-300 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-gray-300 transition"
            >
              Register
            </Link>

            <Link
              to="/admin/login"
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition"
            >
              Admin Login
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar