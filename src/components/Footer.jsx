import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/50 py-8 mt-16 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 font-bold text-[#4D3A2F]">
          <Briefcase className="w-4 h-4 text-[#B58463]" />
          <span>JobPortal</span>
        </div>

        <div className="flex items-center gap-6 font-semibold">
          <Link to="/jobs" className="hover:text-[#B58463] transition">Find Jobs</Link>
          <Link to="/login" className="hover:text-[#B58463] transition">Sign In</Link>
          <Link to="/register" className="hover:text-[#B58463] transition">Register</Link>
          <Link to="/admin/login" className="hover:text-[#B58463] transition">Admin Console</Link>
        </div>

        <div className="text-slate-400 font-medium">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
