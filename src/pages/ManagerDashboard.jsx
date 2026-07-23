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
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* FLOATING DARK SIDEBAR (Matching reference photo) */}
        <aside className="w-full lg:w-64 bg-[#181824] rounded-3xl p-5 text-white flex flex-col justify-between shadow-xl shrink-0 min-h-[620px]">
          
          <div className="space-y-6">
            {/* Sidebar Title */}
            <div className="flex items-center gap-2.5 px-3 py-2 text-base font-bold tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-black shadow-md">
                <Building2 className="w-4 h-4" />
              </div>
              <span>Manager Portal</span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <Link
                to="/manager/dashboard"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-bold shadow-md transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/manager/post-job"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Job</span>
              </Link>

              <Link
                to="/manager/company-profile"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <Building2 className="w-4 h-4" />
                <span>Company Profile</span>
              </Link>

              <Link
                to="/manager/applicants/all"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <Users className="w-4 h-4" />
                <span>Applicants</span>
              </Link>

              <div 
                onClick={() => alert("No new notifications for manager.")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-450 hover:text-white hover:bg-white/5 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-white hover:bg-neutral-200 text-black font-bold text-xs py-3 rounded-xl shadow-md transition uppercase tracking-wider mt-6"
          >
            LOGOUT
          </button>

        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 space-y-6">

          {/* Breadcrumb Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Home className="w-3.5 h-3.5" />
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span>Manager</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-semibold">Dashboard</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
            </div>

            <Link
              to="/manager/post-job"
              className="inline-flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Job</span>
            </Link>
          </div>

          {/* STAT CARDS WITH FLOATING NEUTRAL ICON BADGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            
            {/* Card 1: Black/Dark Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Posted Jobs</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{jobs.length}</p>
              </div>
            </div>

            {/* Card 2: Neutral Dark Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-lg shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Applicants</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{applicantsCount}</p>
              </div>
            </div>

            {/* Card 3: Neutral Mid Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 text-white flex items-center justify-center shadow-lg shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Roles</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{jobs.length}</p>
              </div>
            </div>

            {/* Card 4: Light Gray Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-neutral-700 text-white flex items-center justify-center shadow-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Company</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Verified</p>
              </div>
            </div>

          </div>

          {/* POSTED JOBS TABLE CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">My Posted Job Openings</h2>

            {jobs.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">You haven't posted any jobs yet.</p>
                <Link
                  to="/manager/post-job"
                  className="inline-flex items-center gap-1 text-xs font-bold text-black hover:underline"
                >
                  <span>Post a job opening now</span>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                      <th className="p-3 font-semibold">Job Title</th>
                      <th className="p-3 font-semibold">Location</th>
                      <th className="p-3 font-semibold">Salary Offered</th>
                      <th className="p-3 font-semibold">Job Type</th>
                      <th className="p-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map((job, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-bold text-slate-900">{job.title}</td>
                        <td className="p-3 text-slate-600">{job.location}</td>
                        <td className="p-3 font-bold text-slate-900">{formatSalary(job.salary)}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                            {job.job_type || 'Full Time'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Link
                            to={`/manager/applicants/${job.id ?? index}`}
                            className="inline-flex items-center gap-1 bg-black hover:bg-neutral-800 text-white border border-black px-3 py-1 rounded-lg text-xs font-bold transition"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>View Candidates</span>
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
    </div>
  )
}

export default ManagerDashboard