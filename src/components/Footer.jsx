import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-16 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <span>JobPortal</span>
        </div>

        <div className="flex items-center gap-6 text-slate-500 font-medium">
          <Link to="/jobs" className="hover:text-slate-900 transition">Jobs</Link>
          <Link to="/login" className="hover:text-slate-900 transition">Sign In</Link>
          <Link to="/register" className="hover:text-slate-900 transition">Register</Link>
          <Link to="/admin/login" className="hover:text-slate-900 transition">Admin</Link>
        </div>

        <div className="text-slate-400">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer

