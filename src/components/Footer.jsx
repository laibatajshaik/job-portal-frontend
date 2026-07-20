import { Sparkles, Heart, Globe, Code2, Share2, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Job<span className="text-gradient">Spark</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering talented professionals and top employers to connect, innovate, and grow together.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 transition" title="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 transition" title="Code">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 transition" title="Social">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Candidates</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/jobs" className="hover:text-indigo-400 transition">Browse Job Listings</Link></li>
              <li><Link to="/user/dashboard" className="hover:text-indigo-400 transition">Candidate Dashboard</Link></li>
              <li><Link to="/status" className="hover:text-indigo-400 transition">Application Tracker</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Employers</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/manager/post-job" className="hover:text-indigo-400 transition">Post a Job Opening</Link></li>
              <li><Link to="/manager/dashboard" className="hover:text-indigo-400 transition">Recruiter Dashboard</Link></li>
              <li><Link to="/manager/company-profile" className="hover:text-indigo-400 transition">Company Profile</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">Get the latest job alerts delivered directly to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-semibold transition">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 JobSpark Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision & passion</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

