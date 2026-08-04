import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  CheckCircle2,
  Search,
  FolderOpen,
  Clock
} from 'lucide-react'

function AdminDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [tab, setTab] = useState('dashboard')

  const [atsThreshold, setAtsThreshold] = useState(80)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [apiServer, setApiServer] = useState('https://job-portal-backend-1f0h.onrender.com')

  const [activeStepFilter, setActiveStepFilter] = useState('All')
  const [activeDeptFilter, setActiveDeptFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

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

  const [selectedResumeUrl, setSelectedResumeUrl] = useState(null)

  const getEmbeddableUrl = (url) => {
    if (!url) return '';
    let cleanUrl = url.trim();

    if (cleanUrl.includes('drive.google.com/file/d/')) {
      const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    if (cleanUrl.includes('dropbox.com')) {
      return cleanUrl.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
    }

    const isOfficeDoc = /\.(docx|doc|xlsx|xls|pptx|ppt)$/i.test(cleanUrl.split('?')[0]);
    if (isOfficeDoc) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(cleanUrl)}&embedded=true`;
    }

    return cleanUrl;
  }

  const getDirectDownloadUrl = (url) => {
    if (!url) return '';
    let cleanUrl = url.trim();

    if (cleanUrl.includes('drive.google.com')) {
      const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
      }
    }

    if (cleanUrl.includes('dropbox.com')) {
      return cleanUrl.replace('?dl=0', '?dl=1').replace('&dl=0', '&dl=1');
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

  const unopenedUsersCount = users.filter(u => !viewedUsers.includes(u.id)).length
  const unopenedJobsCount = jobs.filter(j => !viewedJobs.includes(j.id)).length
  const unopenedCompaniesCount = companiesList.filter(c => !viewedCompanies.includes(c.name)).length
  const unopenedApplicationsCount = applications.filter(a => !viewedApplications.includes(a.id)).length

  const filteredUsers = users.filter(u => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q) || (u.role || '').toLowerCase().includes(q)
    }
    return true
  })

  const filteredJobs = jobs.filter(j => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (j.title || '').toLowerCase().includes(q) || (j.company_name || '').toLowerCase().includes(q) || (j.location || '').toLowerCase().includes(q)
    }
    return true
  })

  const filteredApplications = applications.filter(app => {
    
    if (activeStepFilter === 'Applied') {
      if (app.status !== 'Pending' && app.status !== 'Applied') return false
    } else if (activeStepFilter === 'Interviewing') {
      if (app.status !== 'Interviewing') return false
    } else if (activeStepFilter === 'Selected') {
      if (app.status !== 'Shortlisted' && app.status !== 'Selected') return false
    }

    if (activeDeptFilter === 'Research') {
      if ((app.candidate_name || '').length % 2 === 0) return false
    } else if (activeDeptFilter === 'Strategic') {
      if ((app.candidate_name || '').length % 2 !== 0) return false
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        (app.candidate_name || '').toLowerCase().includes(q) ||
        (app.candidate_email || '').toLowerCase().includes(q) ||
        (app.job_title || '').toLowerCase().includes(q) ||
        (app.status || '').toLowerCase().includes(q)
      )
    }
    return true
  })

  const filteredCompanies = companiesList.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (c.name || '').toLowerCase().includes(q) || (c.location || '').toLowerCase().includes(q)
    }
    return true
  })

  const clearFilters = () => {
    setActiveStepFilter('All')
    setActiveDeptFilter('All')
    setSearchQuery('')
  }

  const exportApplicationsToCSV = () => {
    if (filteredApplications.length === 0) return
    const headers = ["Candidate Name", "Candidate Email", "Job Title", "Company", "ATS Score", "Status", "Applied At", "Resume URL"]
    const rows = filteredApplications.map(app => [
      app.candidate_name || "Anonymous",
      app.candidate_email || "",
      app.job_title || "",
      app.company_name || "Demo Company",
      `${app.ats_score || 70}%`,
      app.status || "Pending",
      app.applied_at || "",
      app.resume_url || ""
    ])
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "system_applications_report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-12">
      
      {}
      <header className="bg-[#003366] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white font-bold shadow">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">Admin System Console</span>
          </div>

          {}
          <nav className="flex items-center flex-wrap justify-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => { setTab('dashboard'); clearFilters(); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                tab === 'dashboard'
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { setTab('pipeline'); clearFilters(); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                tab === 'pipeline'
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Applications</span>
              {unopenedApplicationsCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-amber-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unopenedApplicationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setTab('position'); clearFilters(); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                tab === 'position'
                  ? 'bg-[#0066FF] text-white shadow-sm'
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
              onClick={() => { setTab('settings'); clearFilters(); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                tab === 'settings'
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          </nav>

          {}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="bg-[#0066FF] hover:bg-[#0040A0] text-white text-xs font-extrabold px-4 py-2 rounded-lg transition shadow flex items-center gap-1"
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

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {}
        {tab !== 'dashboard' && tab !== 'settings' && (
          <section className="bg-white rounded-xl border border-[#0066FF]/30 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#003366]">
                <Filter className="w-4 h-4 text-[#0066FF]" />
                <span>Search & Filter Console</span>
              </div>
              {(activeStepFilter !== 'All' || activeDeptFilter !== 'All' || searchQuery.trim()) && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] text-rose-650 hover:underline font-bold"
                >
                  Reset Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold">
              {}
              <div className={`space-y-1.5 ${tab === 'pipeline' ? '' : 'opacity-40 pointer-events-none'}`}>
                <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Step</span>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Applied', 'Interviewing', 'Selected'].map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveStepFilter(f)}
                      className={`px-2.5 py-1.5 rounded text-[10px] border transition ${
                        activeStepFilter === f
                          ? 'bg-[#003366] text-white border-[#003366]'
                          : 'bg-slate-50 text-slate-600 border-[#0066FF]/20 hover:bg-slate-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {}
              <div className={`space-y-1.5 ${tab === 'pipeline' ? '' : 'opacity-40 pointer-events-none'}`}>
                <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Department</span>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Research', 'Strategic', 'Support'].map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveDeptFilter(f)}
                      className={`px-2.5 py-1.5 rounded text-[10px] border transition ${
                        activeDeptFilter === f
                          ? 'bg-[#003366] text-white border-[#003366]'
                          : 'bg-slate-50 text-slate-600 border-[#0066FF]/20 hover:bg-slate-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {}
              <div className="md:col-span-2 space-y-1.5">
                <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Live Search Database</span>
                <div className="flex items-center gap-2 bg-[#F4F7FC]/70 border border-[#0066FF]/20 focus-within:border-[#0066FF] focus-within:bg-white rounded-lg px-3 py-2 transition">
                  <Search className="w-4 h-4 text-[#0066FF]" />
                  <input
                    type="text"
                    placeholder="Search by keywords, title, name, location or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs text-[#003366] placeholder-slate-400 focus:outline-none w-full font-bold"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          
          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Users</p>
              <p className="text-sm font-black text-[#003366]">{users.length}</p>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Jobs</p>
              <p className="text-sm font-black text-[#003366]">{jobs.length}</p>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Applied</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Pending' || a.status === 'Applied').length}
              </p>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Interviewing</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Interviewing').length}
              </p>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Selected</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Shortlisted' || a.status === 'Selected').length}
              </p>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-rose-600 flex items-center justify-center">
              <X className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rejected</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Rejected').length}
              </p>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Position</p>
              <p className="text-sm font-black text-[#003366]">{companiesCount || 1}</p>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Placement</p>
              <p className="text-sm font-black text-[#003366]">4%</p>
            </div>
          </div>

        </section>

        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6 space-y-4">
          
          {}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span>Recruitment Database</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#003366]">{tab}</span>
            </div>
            {tab === 'pipeline' && filteredApplications.length > 0 && (
              <button
                onClick={exportApplicationsToCSV}
                className="bg-white hover:bg-slate-50 text-[#003366] border border-[#0066FF]/25 px-2.5 py-1 rounded text-[9px] font-bold flex items-center gap-1 shadow-sm transition self-start sm:self-auto"
              >
                <Download className="w-3 h-3 text-[#0066FF]" />
                <span>Export CSV Report</span>
              </button>
            )}
          </div>

          {}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-50/50 p-6 rounded-xl border border-[#0066FF]/20">
                  <h3 className="text-sm font-bold text-[#003366] mb-3">System Log Analytics</h3>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600 font-semibold">Total DB Registrations: <b>{users.length} Candidates</b></p>
                    <p className="text-xs text-slate-600 font-semibold">Published Listings: <b>{jobs.length} Positions</b></p>
                    <p className="text-xs text-slate-600 font-semibold">ATS Shortlist Threshold: <b>{atsThreshold}%</b></p>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-6 rounded-xl border border-[#0066FF]/20 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#003366] mb-1">Weekly Database Actions</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Status: Healthy</p>
                  </div>
                  <button
                    onClick={() => setTab('pipeline')}
                    className="mt-4 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold py-3 px-5 rounded-lg transition"
                  >
                    Explore Database Pipeline
                  </button>
                </div>
              </div>
            </div>
          )}

          {}
          {tab === 'weekly_calendar' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#003366] mb-3">Job Openings Database ({filteredJobs.length} positions)</h3>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-600 font-semibold space-y-1">
                  <p>No jobs match your search parameters.</p>
                  <button onClick={clearFilters} className="text-[#0066FF] hover:underline">Reset</button>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#0066FF]/20 text-[#003366] bg-slate-50 font-bold">
                      <th className="p-3">Job Title</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Location</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-[#003366]">{job.title}</td>
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

          {}
          {tab === 'pipeline' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#003366] mb-3">Candidate Applications ({filteredApplications.length} applications)</h3>
              {filteredApplications.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-600 font-semibold space-y-1">
                  <p>No applications match your search parameters.</p>
                  <button onClick={clearFilters} className="text-[#0066FF] hover:underline">Reset</button>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#0066FF]/20 text-[#003366] bg-slate-50 font-bold">
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Job Position</th>
                      <th className="p-3">ATS Match</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Resume</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3">
                          <div className="font-bold text-[#003366]">{app.candidate_name || 'Anonymous'}</div>
                          <div className="text-slate-400 text-[10px]">{app.candidate_email}</div>
                        </td>
                        <td className="p-3 text-slate-755">{app.job_title}</td>
                        <td className="p-3">
                          <span className="bg-[#0066FF]/10 text-[#003366] px-2 py-0.5 rounded text-[10px] font-bold border border-[#0066FF]/20">
                            {app.ats_score || 70}%
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            app.status === 'Shortlisted' ? 'bg-[#0066FF] text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {app.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-3">
                          {app.resume_url ? (
                            <button
                              onClick={() => setSelectedResumeUrl(app.resume_url)}
                              className="text-[#0066FF] hover:underline font-bold"
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

          {}
          {tab === 'database' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#003366] mb-3">User Database ({filteredUsers.length} users)</h3>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-600 font-semibold space-y-1">
                  <p>No users match your search parameters.</p>
                  <button onClick={clearFilters} className="text-[#0066FF] hover:underline">Reset</button>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#0066FF]/20 text-[#003366] bg-slate-50 font-bold">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">System Role</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-[#003366]">{u.name}</td>
                        <td className="p-3 text-slate-600">{u.email}</td>
                        <td className="p-3">
                          <span className="bg-[#003366]/10 text-[#003366] px-2 py-0.5 rounded text-[10px] font-bold">
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

          {}
          {tab === 'position' && (
            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-[#003366] mb-3">Recruiting Companies ({filteredCompanies.length} companies)</h3>
              {filteredCompanies.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-600 font-semibold space-y-1">
                  <p>No companies match your search parameters.</p>
                  <button onClick={clearFilters} className="text-[#0066FF] hover:underline">Reset</button>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#0066FF]/20 text-[#003366] bg-slate-50 font-bold">
                      <th className="p-3">Company Name</th>
                      <th className="p-3">Primary Location</th>
                      <th className="p-3">Active Postings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {filteredCompanies.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-[#003366]">{comp.name}</td>
                        <td className="p-3 text-slate-600">{comp.location}</td>
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

          {}
          {tab === 'settings' && (
            <div className="max-w-xl py-2">
              <h3 className="text-sm font-bold text-[#003366] mb-4">System Settings</h3>
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-bold text-slate-650">
                <div>
                  <label className="block mb-1.5">ATS Auto-Shortlist Threshold (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={atsThreshold}
                    onChange={(e) => setAtsThreshold(e.target.value)}
                    className="w-full bg-[#F4F7FC] border border-[#0066FF]/40 rounded-lg px-4 py-2.5 text-[#003366] focus:outline-none focus:border-[#003366] font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1.5">API Server URL</label>
                  <input
                    type="url"
                    value={apiServer}
                    onChange={(e) => setApiServer(e.target.value)}
                    className="w-full bg-[#F4F7FC] border border-[#0066FF]/40 rounded-lg px-4 py-2.5 text-[#003366] focus:outline-none focus:border-[#003366] font-bold"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="maintenance"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-350 focus:ring-[#003366] text-[#003366] accent-[#003366]"
                  />
                  <label htmlFor="maintenance" className="select-none cursor-pointer">Enable Portal Maintenance Mode</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs py-3.5 rounded-lg transition uppercase tracking-wider shadow"
                >
                  Save Configuration
                </button>
              </form>
            </div>
          )}

        </section>

      </main>

      {}
      {selectedResumeUrl && (
        <div className="fixed inset-0 bg-[#003366]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#0066FF]/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-[#003366] text-sm">Resume / CV Viewer</h3>
              <div className="flex items-center gap-2">
                <a
                  href={getDirectDownloadUrl(selectedResumeUrl)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0040A0] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
                <a
                  href={selectedResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold transition flex items-center shadow-sm"
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
