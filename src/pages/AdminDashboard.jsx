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
  X,
  Download,
  Calendar,
  Filter,
  CheckCircle2
} from 'lucide-react'

function AdminDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Tabs map directly to the mockup horizontal tabs:
  // Dashboard | Weekly Calendar | Pipeline | Database | Position | Settings
  const [tab, setTab] = useState('dashboard')

  // Settings state
  const [atsThreshold, setAtsThreshold] = useState(80)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [apiServer, setApiServer] = useState('https://job-portal-backend-1f0h.onrender.com')

  // Active filters for mockup filters row
  const [activeStepFilter, setActiveStepFilter] = useState('All')
  const [activeDeptFilter, setActiveDeptFilter] = useState('All')

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

  const getEmbeddableUrl = (url) => {
    if (!url) return '';
    let cleanUrl = url.trim();

    // 1. Google Drive conversion
    if (cleanUrl.includes('drive.google.com/file/d/')) {
      const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    // 2. Dropbox conversion
    if (cleanUrl.includes('dropbox.com')) {
      return cleanUrl.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
    }

    // 3. For office documents (doc, docx, pptx, xlsx, etc.) and fallback, we can use google docs viewer:
    const isOfficeDoc = /\.(docx|doc|xlsx|xls|pptx|ppt)$/i.test(cleanUrl.split('?')[0]);
    if (isOfficeDoc) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(cleanUrl)}&embedded=true`;
    }

    return cleanUrl;
  }

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
    if (tab === 'database' && users.length > 0) {
      const allIds = users.map(u => u.id)
      setViewedUsers(allIds)
      localStorage.setItem('viewedUserIds', JSON.stringify(allIds))
    }
    if (tab === 'weekly_calendar' && jobs.length > 0) {
      const allIds = jobs.map(j => j.id)
      setViewedJobs(allIds)
      localStorage.setItem('viewedJobIds', JSON.stringify(allIds))
    }
    if (tab === 'position' && companiesList.length > 0) {
      const allNames = companiesList.map(c => c.name)
      setViewedCompanies(allNames)
      localStorage.setItem('viewedCompanyNames', JSON.stringify(allNames))
    }
    if (tab === 'pipeline' && applications.length > 0) {
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
    <div className="min-h-screen bg-[#F7F5F0] text-slate-800 font-sans pb-12">
      
      {/* 1. MOCKUP HORIZONTAL TOP HEADER NAVIGATION BAR (Espresso Background) */}
      <header className="bg-[#3B2525] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E87552] flex items-center justify-center text-white font-bold shadow">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">Admin System Console</span>
          </div>

          {/* Navigation Tabs (Dashboard | Weekly Calendar | Pipeline | Database | Position | Settings) */}
          <nav className="flex items-center flex-wrap justify-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => setTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                tab === 'dashboard'
                  ? 'bg-[#E87552] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setTab('weekly_calendar')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                tab === 'weekly_calendar'
                  ? 'bg-[#E87552] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Calendar (Jobs)</span>
              {unopenedJobsCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-amber-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unopenedJobsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setTab('pipeline')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                tab === 'pipeline'
                  ? 'bg-[#E87552] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Pipeline (Apps)</span>
              {unopenedApplicationsCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-amber-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unopenedApplicationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setTab('database')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                tab === 'database'
                  ? 'bg-[#E87552] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Database (Users)</span>
              {unopenedUsersCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-amber-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unopenedUsersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setTab('position')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                tab === 'position'
                  ? 'bg-[#E87552] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Position (Companies)</span>
              {unopenedCompaniesCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-amber-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unopenedCompaniesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setTab('settings')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                tab === 'settings'
                  ? 'bg-[#E87552] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Action Button: Refresh / Logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="bg-[#E87552] hover:bg-[#d15f3e] text-white text-xs font-extrabold px-4 py-2 rounded-lg transition shadow flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh All</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-rose-600 hover:text-white text-white/90 text-xs font-extrabold px-3 py-2 rounded-lg transition"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {/* 2. FILTER PILLS SECTION */}
        <section className="bg-white rounded-xl border border-[#E87552]/30 p-4 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#3B2525]">
            <Filter className="w-4 h-4 text-[#E87552]" />
            <span>Mockup Filters Row</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            {/* Filter Group: Step */}
            <div className="space-y-1.5">
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Step</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Sourced', '1st Interview', 'Offer'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveStepFilter(f)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition ${
                      activeStepFilter === f
                        ? 'bg-[#3B2525] text-white border-[#3B2525]'
                        : 'bg-slate-50 text-slate-655 border-[#E87552]/20 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Department */}
            <div className="space-y-1.5">
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Department</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Research', 'Strategic', 'Support'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveDeptFilter(f)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition ${
                      activeDeptFilter === f
                        ? 'bg-[#3B2525] text-white border-[#3B2525]'
                        : 'bg-slate-50 text-slate-655 border-[#E87552]/20 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. MOCKUP STYLE RECTANGULAR STATS BOXES ROW */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-3 border border-[#E87552]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sourced</p>
              <p className="text-sm font-black text-[#3B2525]">{users.length}</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-3 border border-[#E87552]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Holding Spot</p>
              <p className="text-sm font-black text-[#3B2525]">{jobs.length}</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-3 border border-[#E87552]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">1st Interview</p>
              <p className="text-sm font-black text-[#3B2525]">{applications.length}</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg p-3 border border-[#E87552]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Offer</p>
              <p className="text-sm font-black text-[#3B2525]">
                {applications.filter(a => a.status === 'Shortlisted').length}
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-lg p-3 border border-[#E87552]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] text-rose-600 flex items-center justify-center">
              <X className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reject</p>
              <p className="text-sm font-black text-[#3B2525]">
                {applications.filter(a => a.status === 'Rejected').length}
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-lg p-3 border border-[#E87552]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Position</p>
              <p className="text-sm font-black text-[#3B2525]">{companiesCount || 1}</p>
            </div>
          </div>

          {/* Card 7 */}
          <div className="bg-white rounded-lg p-3 border border-[#E87552]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] text-[#3B2525] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Placement</p>
              <p className="text-sm font-black text-[#3B2525]">4%</p>
            </div>
          </div>

        </section>

        {/* 4. MAIN DATA RASE / TABLE CARD CONTAINER */}
        <section className="bg-white rounded-xl border border-[#E87552]/35 shadow-sm p-6 space-y-4">
          
          {/* Section Breadcrumb Heading */}
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100 pb-2">
            <Home className="w-3.5 h-3.5" />
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span>Recruitment Database</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[#3B2525]">{tab}</span>
          </div>

          {/* Main Dashboard Overview */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-50/50 p-6 rounded-xl border border-[#E87552]/20">
                  <h3 className="text-sm font-bold text-[#3B2525] mb-3">System Log Analytics</h3>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-655 font-semibold">Total DB Registrations: <b>{users.length} Candidates</b></p>
                    <p className="text-xs text-slate-655 font-semibold">Published Listings: <b>{jobs.length} Positions</b></p>
                    <p className="text-xs text-slate-655 font-semibold">ATS Shortlist Threshold: <b>{atsThreshold}%</b></p>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-6 rounded-xl border border-[#E87552]/20 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#3B2525] mb-1">Weekly Database Actions</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Status: Healthy</p>
                  </div>
                  <button
                    onClick={() => setTab('pipeline')}
                    className="mt-4 bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold py-3 px-5 rounded-lg transition"
                  >
                    Explore Database Pipeline
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Calendar (Jobs) Tab */}
          {tab === 'weekly_calendar' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#3B2525] mb-3">Job Openings Database</h3>
              {jobs.length === 0 ? (
                <p className="text-center py-10 text-xs text-slate-500 font-semibold">No job openings posted.</p>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E87552]/20 text-[#3B2525] bg-slate-50 font-bold">
                      <th className="p-3">Job Title</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Location</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-[#3B2525]">{job.title}</td>
                        <td className="p-3 text-slate-600">{job.company_name || 'Demo Company'}</td>
                        <td className="p-3 text-slate-500">{job.location}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="text-rose-600 hover:underline text-xs font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Pipeline (Apps) Tab */}
          {tab === 'pipeline' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#3B2525] mb-3">Candidate Pipelines</h3>
              {applications.length === 0 ? (
                <p className="text-center py-10 text-xs text-slate-500 font-semibold">No applications submitted.</p>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E87552]/20 text-[#3B2525] bg-slate-50 font-bold">
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Job Position</th>
                      <th className="p-3">ATS Match</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Resume</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3">
                          <div className="font-bold text-[#3B2525]">{app.candidate_name || 'Anonymous'}</div>
                          <div className="text-slate-400 text-[10px]">{app.candidate_email}</div>
                        </td>
                        <td className="p-3 text-slate-700">{app.job_title}</td>
                        <td className="p-3">
                          <span className="bg-[#E87552]/10 text-[#3B2525] px-2 py-0.5 rounded text-[10px] font-bold border border-[#E87552]/20">
                            {app.ats_score || 70}%
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            app.status === 'Shortlisted' ? 'bg-[#E87552] text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {app.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-3">
                          {app.resume_url ? (
                            <button
                              onClick={() => setSelectedResumeUrl(app.resume_url)}
                              className="text-[#E87552] hover:underline font-bold"
                            >
                              View CV
                            </button>
                          ) : (
                            <span className="text-slate-400">N/A</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="text-rose-600 hover:underline text-xs font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Database (Users) Tab */}
          {tab === 'database' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#3B2525] mb-3">User Database</h3>
              {users.length === 0 ? (
                <p className="text-center py-10 text-xs text-slate-500 font-semibold">No registered users.</p>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E87552]/20 text-[#3B2525] bg-slate-50 font-bold">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">System Role</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-[#3B2525]">{u.name}</td>
                        <td className="p-3 text-slate-600">{u.email}</td>
                        <td className="p-3">
                          <span className="bg-[#3B2525]/10 text-[#3B2525] px-2 py-0.5 rounded text-[10px] font-bold">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="text-rose-600 hover:underline text-xs font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Position (Companies) Tab */}
          {tab === 'position' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#3B2525] mb-3">Recruiting Companies</h3>
              {companiesList.length === 0 ? (
                <p className="text-center py-10 text-xs text-slate-500 font-semibold">No company records calculated.</p>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E87552]/20 text-[#3B2525] bg-slate-50 font-bold">
                      <th className="p-3">Company Name</th>
                      <th className="p-3">Primary Location</th>
                      <th className="p-3">Active Postings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {companiesList.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-[#3B2525]">{comp.name}</td>
                        <td className="p-3 text-slate-655">{comp.location}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                            {comp.jobsCount} Openings
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {tab === 'settings' && (
            <div className="max-w-xl py-2">
              <h3 className="text-sm font-bold text-[#3B2525] mb-4">System Settings</h3>
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-bold text-slate-600">
                <div>
                  <label className="block mb-1.5">ATS Auto-Shortlist Threshold (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={atsThreshold}
                    onChange={(e) => setAtsThreshold(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E87552]/40 rounded-lg px-4 py-2.5 text-[#3B2525] focus:outline-none focus:border-[#3B2525] font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1.5">API Server URL</label>
                  <input
                    type="url"
                    value={apiServer}
                    onChange={(e) => setApiServer(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E87552]/40 rounded-lg px-4 py-2.5 text-[#3B2525] focus:outline-none focus:border-[#3B2525] font-bold"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="maintenance"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-350 focus:ring-[#3B2525] text-[#3B2525] accent-[#3B2525]"
                  />
                  <label htmlFor="maintenance" className="select-none cursor-pointer">Enable Portal Maintenance Mode</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3B2525] hover:bg-[#2e1d1d] text-white font-bold text-xs py-3.5 rounded-lg transition uppercase tracking-wider shadow"
                >
                  Save Configuration
                </button>
              </form>
            </div>
          )}

        </section>

      </main>

      {/* INLINE RESUME VIEWER OVERLAY MODAL */}
      {selectedResumeUrl && (
        <div className="fixed inset-0 bg-[#3B2525]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#E87552]/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-[#3B2525] text-sm">Resume / CV Viewer</h3>
              <div className="flex items-center gap-2">
                <a
                  href={selectedResumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#E87552] hover:bg-[#d15f3e] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
                <a
                  href={selectedResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold transition flex items-center shadow-sm"
                >
                  Open in New Tab
                </a>
                <button
                  onClick={() => setSelectedResumeUrl(null)}
                  className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-350 text-slate-700 text-xs font-bold transition flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Viewer</span>
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={getEmbeddableUrl(selectedResumeUrl)}
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
