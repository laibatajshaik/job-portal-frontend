import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  Users,
  Briefcase,
  FileText,
  Bell,
  Settings,
  LogOut,
  Home,
  ChevronRight
} from 'lucide-react'

function ManagerDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [applicantsCount, setApplicantsCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyJobs()
  }, [])

  const fetchMyJobs = async () => {
    setLoading(true)
    try {
      const res = await api.get('/jobs/')
      if (Array.isArray(res.data)) {
        setJobs(res.data)
      }
      const appRes = await api.get('/manager/applicants')
      if (appRes.data && Array.isArray(appRes.data.applicants)) {
        setApplicantsCount(appRes.data.applicants.length)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const formatSalary = (salary) => {
    if (!salary) return '₹9,00,000'
    if (typeof salary === 'number') return `₹${salary.toLocaleString('en-IN')}`
    const strSal = String(salary).trim()
    if (strSal.startsWith('₹')) return strSal
    if (strSal.startsWith('$')) return `₹${strSal.substring(1)}`
    return `₹${strSal}`
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <Loader />

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
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#E87552] text-white font-black shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/manager/post-job"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
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
              <span className="text-[#3B2525]">Dashboard</span>
            </div>
            <h1 className="text-xl font-bold text-[#3B2525]">Manager Dashboard Overview</h1>
          </div>

          <Link
            to="/manager/post-job"
            className="inline-flex items-center gap-1.5 bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Position</span>
          </Link>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Card 1: Active Listings */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-[#E87552]/20 flex items-center justify-between">
            <div className="w-12 h-12 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Listings</p>
              <p className="text-2xl font-black text-[#3B2525] mt-0.5">{jobs.length}</p>
            </div>
          </div>

          {/* Card 2: Candidates */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-[#E87552]/20 flex items-center justify-between">
            <div className="w-12 h-12 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Candidates</p>
              <p className="text-2xl font-black text-[#3B2525] mt-0.5">{applicantsCount}</p>
            </div>
          </div>

          {/* Card 3: Company Profile */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-[#E87552]/20 flex items-center justify-between">
            <div className="w-12 h-12 rounded bg-[#F7F5F0] text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile Status</p>
              <p className="text-2xl font-black text-[#3B2525] mt-0.5">Active</p>
            </div>
          </div>

        </div>

        {/* ACTIVE POSTINGS CARD */}
        <div className="bg-white rounded-xl border border-[#E87552]/35 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#3B2525]">Your Active Job Postings</h2>

          {jobs.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Briefcase className="w-10 h-10 text-[#E87552]/20 mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">You have not published any job openings yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E87552]/20 text-[#3B2525] bg-slate-50 font-bold">
                    <th className="p-3">Job Title</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Salary Range</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-right">Candidates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {jobs.map((job, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition">
                      <td className="p-3 font-bold text-slate-900">{job.title}</td>
                      <td className="p-3 text-slate-600 font-medium">{job.location}</td>
                      <td className="p-3 font-bold text-slate-900">{formatSalary(job.salary)}</td>
                      <td className="p-3">
                        <span className="bg-[#3B2525]/10 text-[#3B2525] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {job.job_type || 'Full Time'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to={`/manager/applicants/${job.id ?? index}`}
                          className="inline-flex items-center gap-1.5 bg-[#3B2525] hover:bg-[#2e1d1d] text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>View Applicants</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default ManagerDashboard