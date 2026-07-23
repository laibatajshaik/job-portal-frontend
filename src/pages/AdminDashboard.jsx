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
  Link2,
  RefreshCw,
  X
} from 'lucide-react'

function AdminDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('users')

  // Settings state
  const [atsThreshold, setAtsThreshold] = useState(80)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [apiServer, setApiServer] = useState('https://job-portal-backend-1f0h.onrender.com')

  // Read viewed items state from localStorage
  const [viewedUsers, setViewedUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('viewedUserIds') || '[]')
  })
  const [viewedJobs, setViewedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem('viewedJobIds') || '[]')
  })
  const [viewedCompanies, setViewedCompanies] = useState(() => {
    return JSON.parse(localStorage.getItem('viewedCompanyNames') || '[]')
  })
  const [viewedApplications, setViewedApplications] = useState(() => {
    return JSON.parse(localStorage.getItem('viewedApplicationIds') || '[]')
  })

  // Selected PDF resume URL for the inline modal viewer
  const [selectedResumeUrl, setSelectedResumeUrl] = useState(null)

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

  const handleSaveSettings = (e) => {
    e.preventDefault()
    alert("Admin Portal system settings saved successfully!")
  }

  // Get unique companies list
  const getCompaniesList = () => {
    const companyMap = {}
    jobs.forEach(job => {
      const name = job.company_name || 'Demo Company'
      const key = name.trim().toLowerCase()
      if (!companyMap[key]) {
        companyMap[key] = {
          name,
          location: job.location || 'Remote',
          jobsCount: 0
        }
      }
      companyMap[key].jobsCount += 1
    })
    return Object.values(companyMap)
  }
  const companiesList = getCompaniesList()
  const companiesCount = companiesList.length

  // Track and clear viewed items dynamically on tab switch or collection updates
  useEffect(() => {
    if (tab === 'users' && users.length > 0) {
      const allIds = users.map(u => u.id)
      setViewedUsers(allIds)
      localStorage.setItem('viewedUserIds', JSON.stringify(allIds))
    }
    if (tab === 'jobs' && jobs.length > 0) {
      const allIds = jobs.map(j => j.id)
      setViewedJobs(allIds)
      localStorage.setItem('viewedJobIds', JSON.stringify(allIds))
    }
    if (tab === 'companies' && companiesList.length > 0) {
      const allNames = companiesList.map(c => c.name)
      setViewedCompanies(allNames)
      localStorage.setItem('viewedCompanyNames', JSON.stringify(allNames))
    }
    if (tab === 'applications' && applications.length > 0) {
      const allIds = applications.map(a => a.id)
      setViewedApplications(allIds)
      localStorage.setItem('viewedApplicationIds', JSON.stringify(allIds))
    }
  }, [tab, users.length, jobs.length, applications.length, companiesCount])

  // Calculate counts of new (unopened) items
  const unopenedUsersCount = users.filter(u => !viewedUsers.includes(u.id)).length
  const unopenedJobsCount = jobs.filter(j => !viewedJobs.includes(j.id)).length
  const unopenedCompaniesCount = companiesList.filter(c => !viewedCompanies.includes(c.name)).length
  const unopenedApplicationsCount = applications.filter(a => !viewedApplications.includes(a.id)).length

  // Generate logs dynamically
  const generateNotificationLogs = () => {
    const logs = []
    
    // Users logs
    users.forEach((u, index) => {
      logs.push({
        id: `user-${index}`,
        title: "New User Registration",
        message: `User "${u.name}" (${u.email}) registered successfully as role "${u.role}".`,
        time: "Just now",
        type: "user"
      })
    })

    // Jobs logs
    jobs.forEach((job, index) => {
      logs.push({
        id: `job-${index}`,
        title: "New Job Opening",
        message: `Job position "${job.title}" at "${job.company_name || 'Demo Company'}" was published.`,
        time: "Recent",
        type: "job"
      })
    })

    // Applications logs
    applications.forEach((app, index) => {
      logs.push({
        id: `app-${index}`,
        title: "Job Application",
        message: `Candidate "${app.candidate_name}" applied for "${app.job_title}" (ATS Score: ${app.ats_score}%).`,
        time: app.applied_at || "Recent",
        type: "application"
      })
    })

    return logs.sort((a, b) => b.id.localeCompare(a.id))
  }
  const notificationLogs = generateNotificationLogs()

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* FLOATING DARK SIDEBAR (Black and White template) */}
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
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-left ${
                  tab === 'users'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </div>
                {unopenedUsersCount > 0 && (
                  <span className="bg-white text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {unopenedUsersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setTab('jobs')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-left ${
                  tab === 'jobs'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Jobs</span>
                </div>
                {unopenedJobsCount > 0 && (
                  <span className="bg-white text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {unopenedJobsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setTab('companies')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-left ${
                  tab === 'companies'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4" />
                  <span>Companies</span>
                </div>
                {unopenedCompaniesCount > 0 && (
                  <span className="bg-white text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {unopenedCompaniesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setTab('applications')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-left ${
                  tab === 'applications'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>Applications</span>
                </div>
                {unopenedApplicationsCount > 0 && (
                  <span className="bg-white text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {unopenedApplicationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  tab === 'notifications'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => setTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  tab === 'settings'
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
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
                <span>Admin</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-semibold capitalize">{tab}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 capitalize">{tab} Management</h1>
            </div>

            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Data</span>
            </button>
          </div>

          {/* STAT CARDS */}
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
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Applications</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{applications.length}</p>
              </div>
            </div>

            {/* Card 3: Total Users */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{users.length}</p>
              </div>
            </div>

            {/* Card 4: Companies */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shrink-0">
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
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex gap-2 overflow-x-auto max-w-full">
                <button
                  onClick={() => setTab('users')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                    tab === 'users'
                      ? 'bg-black text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-105'
                  }`}
                >
                  Manage Users ({users.length})
                </button>
                <button
                  onClick={() => setTab('jobs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                    tab === 'jobs'
                      ? 'bg-black text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-105'
                  }`}
                >
                  Manage Jobs ({jobs.length})
                </button>
                <button
                  onClick={() => setTab('companies')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                    tab === 'companies'
                      ? 'bg-black text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-105'
                  }`}
                >
                  Companies ({companiesCount})
                </button>
                <button
                  onClick={() => setTab('applications')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                    tab === 'applications'
                      ? 'bg-black text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-105'
                  }`}
                >
                  Applications ({applications.length})
                </button>
                <button
                  onClick={() => setTab('notifications')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                    tab === 'notifications'
                      ? 'bg-black text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-105'
                  }`}
                >
                  Notifications Logs
                </button>
                <button
                  onClick={() => setTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                    tab === 'settings'
                      ? 'bg-black text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-105'
                  }`}
                >
                  Portal Settings
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
                        <tr key={u.id} className="hover:bg-slate-50/50 transition">
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
                        <tr key={job.id} className="hover:bg-slate-50/50 transition">
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

            {/* Companies Table */}
            {tab === 'companies' && (
              <div className="overflow-x-auto">
                {companiesList.length === 0 ? (
                  <p className="text-center py-10 text-xs text-slate-500 font-semibold">No company records calculated.</p>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                        <th className="p-3 font-semibold">Company Name</th>
                        <th className="p-3 font-semibold">Primary Location</th>
                        <th className="p-3 font-semibold">Active Jobs</th>
                        <th className="p-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {companiesList.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition">
                          <td className="p-3 font-bold text-slate-900">{comp.name}</td>
                          <td className="p-3 text-slate-600">{comp.location}</td>
                          <td className="p-3">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                              {comp.jobsCount} Openings
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setTab('jobs')}
                              className="inline-flex items-center gap-1 text-black hover:underline font-bold text-xs"
                            >
                              <span>View Jobs</span>
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
                        <tr key={app.id} className="hover:bg-slate-50/50 transition">
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
                              <button
                                onClick={() => setSelectedResumeUrl(app.resume_url)}
                                className="inline-flex items-center gap-1 text-black hover:underline font-bold"
                              >
                                <Link2 className="w-3.5 h-3.5" />
                                <span>CV Link</span>
                              </button>
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

            {/* Notifications Logs Tab */}
            {tab === 'notifications' && (
              <div className="space-y-3.5 py-2">
                {notificationLogs.length === 0 ? (
                  <p className="text-center py-10 text-xs text-slate-500 font-semibold">No recent notification logs.</p>
                ) : (
                  notificationLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-xl border border-neutral-200 bg-white flex items-start gap-3 transition hover:shadow-sm">
                      <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-50 border border-slate-250 flex items-center justify-center text-slate-655 shrink-0">
                        {log.type === 'user' && <Users className="w-4 h-4" />}
                        {log.type === 'job' && <Briefcase className="w-4 h-4" />}
                        {log.type === 'application' && <FileText className="w-4 h-4" />}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-xs text-slate-900">{log.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{log.message}</p>
                        <span className="block text-[10px] text-slate-400 font-medium">{log.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Settings Tab */}
            {tab === 'settings' && (
              <div className="max-w-xl py-2">
                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-semibold text-neutral-700">
                  <div>
                    <label className="block mb-1.5">ATS Auto-Shortlist Threshold (%)</label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={atsThreshold}
                      onChange={(e) => setAtsThreshold(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-black rounded-xl px-4 py-2.5 text-neutral-900 font-medium focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5">API Server URL</label>
                    <input
                      type="url"
                      value={apiServer}
                      onChange={(e) => setApiServer(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-black rounded-xl px-4 py-2.5 text-neutral-900 font-medium focus:outline-none transition"
                    />
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      id="maintenance"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 focus:ring-black text-black accent-black"
                    />
                    <label htmlFor="maintenance" className="select-none cursor-pointer">Enable Portal Maintenance Mode</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl shadow-md transition uppercase tracking-wider"
                  >
                    Save Configuration
                  </button>
                </form>
              </div>
            )}

          </div>

        </main>

      </div>

      {/* INLINE RESUME VIEWER OVERLAY MODAL */}
      {selectedResumeUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Resume / CV Viewer</h3>
              <button
                onClick={() => setSelectedResumeUrl(null)}
                className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Viewer</span>
              </button>
            </div>
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={selectedResumeUrl}
                title="Resume PDF Viewer"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminDashboard
