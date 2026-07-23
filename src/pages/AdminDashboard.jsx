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
  ChevronRight,
  Award,
  Link2
} from 'lucide-react'

function AdminDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
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
      const appsRes = await api.get('/admin/applications')
      
      if (usersRes.data && Array.isArray(usersRes.data.users)) setUsers(usersRes.data.users)
      if (jobsRes.data && Array.isArray(jobsRes.data.jobs)) setJobs(jobsRes.data.jobs)
      if (appsRes.data && Array.isArray(appsRes.data.applications)) setApplications(appsRes.data.applications)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user permanently?")) return
    try {
      await api.delete(`/admin/users/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
      alert("Failed to delete user.")
    }
  }

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job opening permanently?")) return
    try {
      await api.delete(`/admin/jobs/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
      alert("Failed to delete job.")
    }
  }

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return
    try {
      await api.delete(`/admin/applications/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
      alert("Failed to delete application.")
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  // Calculate unique companies from jobs
  const companiesCount = jobs.reduce((acc, job) => {
    const comp = (job.company_name || 'Demo Company').trim().toLowerCase()
    if (!acc.includes(comp)) acc.push(comp)
    return acc
  }, []).length

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
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <span>Admin Portal</span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => setTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  tab === 'users'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  tab === 'jobs'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Jobs ({jobs.length})</span>
              </button>

              <button
                onClick={() => setTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  tab === 'applications'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Applications ({applications.length})</span>
              </button>

              <div 
                onClick={() => alert("No system configurations or notifications available.")}
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

          {/* STAT CARDS WITH FLOATING NEUTRAL ICON BADGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            
            {/* Card 1: Total Jobs */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Jobs</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{jobs.length}</p>
              </div>
            </div>

            {/* Card 2: Applications */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-lg shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Applications</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{applications.length}</p>
              </div>
            </div>

            {/* Card 3: Total Users */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 text-white flex items-center justify-center shadow-lg shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{users.length}</p>
              </div>
            </div>

            {/* Card 4: Companies */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-neutral-700 text-white flex items-center justify-center shadow-lg shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Companies</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{companiesCount || 1}</p>
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
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-slate-100 text-slate-650 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Manage Users ({users.length})
                </button>
                <button
                  onClick={() => setTab('jobs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    tab === 'jobs'
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-slate-100 text-slate-650 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Manage Jobs ({jobs.length})
                </button>
                <button
                  onClick={() => setTab('applications')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    tab === 'applications'
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-slate-100 text-slate-650 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Manage Applications ({applications.length})
                </button>
              </div>
            </div>

            {/* Users Table */}
            {tab === 'users' && (
              <div className="overflow-x-auto">
                {users.length === 0 ? (
                  <p className="text-center py-10 text-xs text-slate-500 font-semibold">No registered users in the database.</p>
                ) : (
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
                            <span className="bg-slate-100 text-slate-750 uppercase px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-xs font-semibold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Jobs Table */}
            {tab === 'jobs' && (
              <div className="overflow-x-auto">
                {jobs.length === 0 ? (
                  <p className="text-center py-10 text-xs text-slate-500 font-semibold">No job openings posted.</p>
                ) : (
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
                              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-xs font-semibold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Applications Table */}
            {tab === 'applications' && (
              <div className="overflow-x-auto">
                {applications.length === 0 ? (
                  <p className="text-center py-10 text-xs text-slate-500 font-semibold">No job applications submitted yet.</p>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                        <th className="p-3 font-semibold">Candidate</th>
                        <th className="p-3 font-semibold">Job Title</th>
                        <th className="p-3 font-semibold">ATS Score</th>
                        <th className="p-3 font-semibold">Status</th>
                        <th className="p-3 font-semibold">Resume</th>
                        <th className="p-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 transition">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{app.candidate_name || 'Anonymous'}</div>
                            <div className="text-slate-400 text-[10px]">{app.candidate_email}</div>
                          </td>
                          <td className="p-3 font-medium text-slate-700">{app.job_title}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                              <Award className="w-3.5 h-3.5 text-slate-500" />
                              <span>{app.ats_score || 70}%</span>
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg ${
                              app.status === 'Shortlisted' ? 'bg-black text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}>
                              {app.status || 'Pending'}
                            </span>
                          </td>
                          <td className="p-3">
                            {app.resume_url ? (
                              <a
                                href={app.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-black hover:underline font-bold"
                              >
                                <Link2 className="w-3.5 h-3.5" />
                                <span>CV Link</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">Not Provided</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => deleteApplication(app.id)}
                              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-xs font-semibold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  )
}

export default AdminDashboard
