import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 mt-16 text-slate-500 text-xs font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Briefcase className="w-4 h-4 text-[#FFA726]" />
          <span>JobPortal</span>
        </div>

        <div className="flex items-center gap-6 text-slate-500 font-semibold">
          <Link to="/jobs" className="hover:text-[#FFA726] transition">Jobs</Link>
          <Link to="/login" className="hover:text-[#FFA726] transition">Sign In</Link>
          <Link to="/register" className="hover:text-[#FFA726] transition">Register</Link>
          <Link to="/admin/login" className="hover:text-[#FFA726] transition">Admin</Link>
        </div>

        <div className="text-slate-400 font-semibold">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
