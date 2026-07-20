import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  FileText,
  Bell,
  Settings,
  LogOut,
  Trash2,
  Home,
  ChevronRight
} from 'lucide-react'

function AdminDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('users')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const usersRes = await api.get('/admin/users')
      const jobsRes = await api.get('/admin/jobs')
      if (usersRes.data && Array.isArray(usersRes.data.users)) setUsers(usersRes.data.users)
      if (jobsRes.data && Array.isArray(jobsRes.data.jobs)) setJobs(jobsRes.data.jobs)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteJob = async (id) => {
    try {
      await api.delete(`/admin/jobs/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
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
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <span>Admin Dashboard</span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => setTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  tab === 'users'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  tab === 'users'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Users ({users.length})</span>
              </button>

              <button
                onClick={() => setTab('jobs')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  tab === 'jobs'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Jobs ({jobs.length})</span>
              </button>

              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 cursor-not-allowed">
                <Building2 className="w-4 h-4" />
                <span>Companies</span>
              </div>

              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 cursor-not-allowed">
                <FileText className="w-4 h-4" />
                <span>Applications</span>
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

          {/* Breadcrumb Header (Matching reference photo) */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Home className="w-3.5 h-3.5" />
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span>Admin</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-900 font-semibold">Dashboard</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
          </div>

          {/* STAT CARDS WITH FLOATING COLORED ICON BADGES (Matching reference photo) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            
            {/* Card 1: Black/Dark Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#181824] text-white flex items-center justify-center shadow-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Jobs</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{jobs.length}</p>
              </div>
            </div>

            {/* Card 2: Bright Blue Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Applications</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">24</p>
              </div>
            </div>

            {/* Card 3: Emerald Green Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{users.length}</p>
              </div>
            </div>

            {/* Card 4: Pink/Magenta Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Companies</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">6</p>
              </div>
            </div>

          </div>

          {/* MAIN MANAGEMENT DATA CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            
            {/* Tab Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTab('users')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    tab === 'users'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Manage Users ({users.length})
                </button>
                <button
                  onClick={() => setTab('jobs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    tab === 'jobs'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Manage Jobs ({jobs.length})
                </button>
              </div>
            </div>

            {/* Users Table */}
            {tab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                      <th className="p-3 font-semibold">User Name</th>
                      <th className="p-3 font-semibold">Email</th>
                      <th className="p-3 font-semibold">Role</th>
                      <th className="p-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-bold text-slate-900">{u.name}</td>
                        <td className="p-3 text-slate-600">{u.email}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-700 uppercase px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-xs font-semibold bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-lg border border-rose-200 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Jobs Table */}
            {tab === 'jobs' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                      <th className="p-3 font-semibold">Job Title</th>
                      <th className="p-3 font-semibold">Company</th>
                      <th className="p-3 font-semibold">Location</th>
                      <th className="p-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-bold text-slate-900">{job.title}</td>
                        <td className="p-3 text-slate-600">{job.company_name || 'Demo Company'}</td>
                        <td className="p-3 text-slate-500">{job.location}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-xs font-semibold bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-lg border border-rose-200 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
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

export default AdminDashboard
