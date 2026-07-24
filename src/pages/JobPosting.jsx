import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  Users,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  Home,
  ChevronRight
} from 'lucide-react'

function JobPosting() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [jobType, setJobType] = useState('Full Time')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const parsedSalary = parseInt(salary.toString().replace(/[^0-9]/g, ''), 10) || 90000
      await api.post('/manager/jobs', {
        title,
        description,
        location,
        salary: parsedSalary,
        job_type: jobType,
        skills: ''
      })
      navigate('/jobs')
    } catch (err) {
      console.log(err)
      navigate('/jobs')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-slate-800 font-sans pb-12">
      
      {/* MOCKUP HORIZONTAL TOP HEADER NAVIGATION BAR (Espresso Background) */}
      <header className="bg-[#3B2525] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E87552] flex items-center justify-center text-white font-bold shadow">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">Manager Portal</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center flex-wrap justify-center gap-1.5 text-xs font-bold">
            <Link
              to="/manager/dashboard"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/manager/post-job"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#E87552] text-white font-black shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Job</span>
            </Link>

            <Link
              to="/manager/company-profile"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company Profile</span>
            </Link>

            <Link
              to="/manager/applicants/all"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Applicants</span>
            </Link>
          </nav>

          {/* Logout Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-[#E87552] hover:bg-[#d15f3e] text-white text-xs font-extrabold px-4 py-2 rounded-lg transition shadow"
            >
              LOGOUT
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Home className="w-3.5 h-3.5" />
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span>Manager Console</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#3B2525]">Post New Job</span>
            </div>
            <h1 className="text-xl font-bold text-[#3B2525]">Post a New Position</h1>
          </div>

          <Link
            to="/manager/dashboard"
            className="inline-flex items-center gap-1.5 bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#E87552]/35 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold text-[#3B2525]">Position Information</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Publish a job opening for candidates to explore and apply.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-600">
            
            <div>
              <label className="block mb-1.5">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5">Job Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                placeholder="Describe key responsibilities and required experience..."
                className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none transition"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Remote or Bangalore, KA"
                  className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block mb-1.5">Salary (in ₹ / Rupees)</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 900000 or ₹9,00,000"
                  className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none cursor-pointer transition"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#3B2525] hover:bg-[#2e1d1d] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition mt-2 uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4 text-[#E87552]" />
              <span>Publish Job Opening</span>
            </button>

          </form>

        </div>

      </main>
    </div>
  )
}

export default JobPosting
