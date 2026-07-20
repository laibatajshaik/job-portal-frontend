import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  CheckCircle2,
  FileText,
  ArrowRight,
  User,
  Bell,
  Settings,
  Home,
  ChevronRight
} from 'lucide-react'

function UserDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const res = await api.get('/applications/my')
      if (res.data && Array.isArray(res.data.applications)) {
        setApplications(res.data.applications)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* FLOATING DARK SIDEBAR (Matching reference photo) */}
        <aside className="w-full lg:w-64 bg-[#181824] rounded-3xl p-5 text-white flex flex-col justify-between shadow-xl shrink-0 min-h-[620px]">
          
          <div className="space-y-6">
            {/* Sidebar Title */}
            <div className="flex items-center gap-2.5 px-3 py-2 text-base font-bold tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <User className="w-4 h-4" />
              </div>
              <span>Candidate Portal</span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <Link
                to="/user/dashboard"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/jobs"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <Briefcase className="w-4 h-4" />
                <span>Browse Jobs</span>
              </Link>

              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 font-bold bg-white/5">
                <FileText className="w-4 h-4" />
                <span>Applications ({applications.length})</span>
              </div>

              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 cursor-not-allowed">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>

              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 cursor-not-allowed">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition uppercase tracking-wider mt-6"
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
                <span>Candidate</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-semibold">Dashboard</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Jobs</span>
            </Link>
          </div>

          {/* STAT CARDS WITH FLOATING COLORED ICON BADGES (Matching reference photo) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            
            {/* Card 1: Black/Dark Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#181824] text-white flex items-center justify-center shadow-lg shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Applied Jobs</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{applications.length}</p>
              </div>
            </div>

            {/* Card 2: Bright Blue Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Under Review</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{applications.length}</p>
              </div>
            </div>

            {/* Card 3: Emerald Green Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Shortlisted</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">1</p>
              </div>
            </div>

            {/* Card 4: Pink/Magenta Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Status</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Active</p>
              </div>
            </div>

          </div>

          {/* MY APPLICATIONS TABLE CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">My Submitted Applications</h2>

            {applications.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">You haven't submitted any job applications yet.</p>
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                >
                  <span>Browse jobs to apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                      <th className="p-3 font-semibold">Job Title</th>
                      <th className="p-3 font-semibold">Company</th>
                      <th className="p-3 font-semibold">Applied Date</th>
                      <th className="p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app, idx) => (
                      <tr key={app.id || idx} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-bold text-slate-900">{app.job_title || 'Software Role'}</td>
                        <td className="p-3 text-slate-600">{app.company_name || 'Demo Company'}</td>
                        <td className="p-3 text-slate-500">{app.applied_at || 'Recent'}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-blue-100">
                            <Clock className="w-3 h-3" />
                            {app.status || 'Applied'}
                          </span>
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

export default UserDashboard
