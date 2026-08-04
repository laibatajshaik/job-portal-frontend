import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  Briefcase,
  Users,
  MapPin,
  Calendar,
  Building,
  ArrowLeft,
  X,
  FileText,
  Mail,
  User,
  ExternalLink,
  Award,
  Link2,
  Trash2,
  CheckCircle,
  FileSpreadsheet,
  Download,
  Search,
  RefreshCw,
  FolderOpen,
  Clock
} from 'lucide-react'

function ApplicantManagement() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  const [job, setJob] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState('pipeline')

  const [activeStepFilter, setActiveStepFilter] = useState('All')
  const [activeDeptFilter, setActiveDeptFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const [selectedResumeUrl, setSelectedResumeUrl] = useState(null)

  useEffect(() => {
    fetchJobAndApplicants()
  }, [jobId])

  const fetchJobAndApplicants = async () => {
    setLoading(true)
    try {
      
      const jobRes = await api.get(`/jobs/${jobId}`)
      setJob(jobRes.data)

      const appRes = await api.get(`/applications/job/${jobId}`)
      if (Array.isArray(appRes.data)) {
        setApplicants(appRes.data)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await api.patch(`/applications/${appId}`, { status: newStatus })
      
      setApplicants(prev =>
        prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
      )
    } catch (err) {
      console.log(err)
      alert(`Failed to update candidate status: ${err.response?.data?.detail || err.message}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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

  const getFilteredApplicants = () => {
    return applicants.filter(app => {
      
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
        const query = searchQuery.toLowerCase()
        const nameMatch = (app.candidate_name || '').toLowerCase().includes(query)
        const emailMatch = (app.candidate_email || '').toLowerCase().includes(query)
        if (!nameMatch && !emailMatch) return false
      }

      return true
    })
  }

  const filteredApplicants = getFilteredApplicants()

  const exportToCSV = () => {
    if (filteredApplicants.length === 0) return

    const headers = ["Candidate Name", "Candidate Email", "Job Title", "ATS Match Score", "Status", "Applied At", "Resume URL"]

    const rows = filteredApplicants.map(app => [
      app.candidate_name || "Anonymous",
      app.candidate_email || "",
      app.job_title || "",
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
    const fileTitle = (job?.title || "applicants").toLowerCase().replace(/\s+/g, "_")
    link.setAttribute("download", `${fileTitle}_pipeline.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearFilters = () => {
    setActiveStepFilter('All')
    setActiveDeptFilter('All')
    setSearchQuery('')
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-12">
      
      {}
      <header className="bg-[#003366] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {}
          <div className="flex items-center gap-2.5">
            <Link to="/manager/dashboard" className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white font-bold shadow">
              <Briefcase className="w-4 h-4" />
            </Link>
            <span className="font-extrabold text-sm tracking-tight">Recruitment Console</span>
          </div>

          {}
          <nav className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'pipeline'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Candidates</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'database'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Database</span>
            </button>

            <button
              onClick={() => setActiveTab('position')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'position'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Position Details</span>
            </button>
          </nav>

          {}
          <div className="flex items-center gap-3">
            <Link
              to="/manager/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4.5 py-2.5 rounded-lg transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Console</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-white text-xs font-bold"
            >
              Logout
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/30 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-extrabold text-[#003366] uppercase tracking-wider">Search & Filter Candidates</span>
            {(activeStepFilter !== 'All' || activeDeptFilter !== 'All' || searchQuery.trim()) && (
              <button
                onClick={clearFilters}
                className="text-[10px] text-rose-600 hover:underline font-bold flex items-center gap-1"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold">
            {}
            <div className="space-y-1.5">
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
            <div className="space-y-1.5">
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
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Live Search Candidates</span>
              <div className="flex items-center gap-2 bg-[#F4F7FC]/70 border border-[#0066FF]/20 focus-within:border-[#0066FF] focus-within:bg-white rounded-lg px-3 py-2 transition">
                <Search className="w-4 h-4 text-[#0066FF]" />
                <input
                  type="text"
                  placeholder="Enter candidate name or email address..."
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

        {}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Candidates</p>
              <p className="text-sm font-black text-[#003366]">{applicants.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Applied</p>
              <p className="text-sm font-black text-[#003366]">
                {applicants.filter(a => a.status === 'Pending' || a.status === 'Applied').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Interviewing</p>
              <p className="text-sm font-black text-[#003366]">
                {applicants.filter(a => a.status === 'Interviewing').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Selected</p>
              <p className="text-sm font-black text-[#003366]">
                {applicants.filter(a => a.status === 'Shortlisted' || a.status === 'Selected').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-slate-400 flex items-center justify-center">
              <X className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rejected</p>
              <p className="text-sm font-black text-[#003366]">
                {applicants.filter(a => a.status === 'Rejected').length}
              </p>
            </div>
          </div>

        </section>

        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6">
          
          {}
          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div className="space-y-0.5">
                  <h2 className="text-base font-black text-[#003366] uppercase tracking-tight">Active Candidates</h2>
                  <p className="text-[10px] text-slate-400 font-bold">Showing {filteredApplicants.length} of {applicants.length} candidates</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportToCSV}
                    disabled={filteredApplicants.length === 0}
                    className="bg-white hover:bg-slate-50 text-[#003366] border border-[#0066FF]/25 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Export CSV</span>
                  </button>
                  <span className="text-xs text-[#0066FF] font-bold bg-[#0066FF]/10 px-3 py-1 rounded-full">
                    {job?.title || 'Open Role'}
                  </span>
                </div>
              </div>

              {applicants.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-semibold space-y-1">
                  <p className="text-sm">No applications received yet for this opening.</p>
                  <p className="text-xs">Candidates will appear here as soon as they submit their details.</p>
                </div>
              ) : filteredApplicants.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-semibold space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-55/10 flex items-center justify-center mx-auto text-slate-400">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm">No candidates match your search filters.</p>
                    <p className="text-xs text-slate-400">Try modifying your search query or reset filters.</p>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredApplicants.map((app) => (
                    <div
                      key={app.id}
                      className="bg-[#F4F7FC]/50 hover:bg-[#F4F7FC] rounded-xl p-5 border border-[#0066FF]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition duration-150"
                    >
                      <div className="space-y-2.5">
                        {}
                        <div>
                          <h4 className="font-extrabold text-sm text-[#003366]">{app.candidate_name || 'Anonymous'}</h4>
                          <span className="text-[11px] text-slate-500 font-semibold">{app.candidate_email}</span>
                        </div>
                        
                        {}
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>Applied: {app.applied_at || 'Recent'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-[#0066FF]" />
                            <span>ATS Match: <b>{app.ats_score || 70}%</b></span>
                          </div>
                        </div>
                      </div>

                      {}
                      <div className="flex items-center flex-wrap gap-2.5">
                        
                        {}
                        {app.resume_url ? (
                          <button
                            onClick={() => setSelectedResumeUrl(app.resume_url)}
                            className="bg-white hover:bg-slate-100 text-[#003366] border border-[#0066FF]/20 text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View CV</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 px-3 font-bold">No Resume Attachment</span>
                        )}

                        <span className="text-slate-300">|</span>

                        {}
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Shortlisted')}
                          disabled={app.status === 'Shortlisted'}
                          className={`text-xs font-extrabold px-3 py-2 rounded-lg transition ${
                            app.status === 'Shortlisted'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          Shortlist
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Interviewing')}
                          disabled={app.status === 'Interviewing'}
                          className={`text-xs font-extrabold px-3 py-2 rounded-lg transition ${
                            app.status === 'Interviewing'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          Interview
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                          disabled={app.status === 'Rejected'}
                          className={`text-xs font-extrabold px-3 py-2 rounded-lg transition ${
                            app.status === 'Rejected'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          Reject
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#003366] uppercase">Candidate Raw Database</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Raw database representation of applications submitted for this specific job position.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead>
                    <tr className="border-b border-[#0066FF]/20 text-[#003366] bg-slate-50 font-bold">
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">ATS Match</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplicants.map(app => (
                      <tr key={app.id} className="hover:bg-slate-55/50 transition">
                        <td className="p-3 font-bold text-[#003366]">{app.candidate_name || 'Anonymous'}</td>
                        <td className="p-3 text-slate-600">{app.candidate_email}</td>
                        <td className="p-3 text-slate-600">{app.ats_score || 70}%</td>
                        <td className="p-3">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {app.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {}
          {activeTab === 'position' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#003366] uppercase">Active Position Spec</h3>
              <div className="bg-[#F4F7FC]/50 p-6 rounded-xl border border-[#0066FF]/15 space-y-4 text-xs font-semibold">
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase">Title</h4>
                  <p className="text-[#003366] text-sm font-extrabold mt-0.5">{job?.title}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase">Salary spec</h4>
                  <p className="text-[#003366] text-sm font-extrabold mt-0.5">{job?.salary || '₹9,00,000'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase">Location</h4>
                  <p className="text-[#003366] text-sm font-extrabold mt-0.5">{job?.location || 'Remote'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase">Details</h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">{job?.description}</p>
                </div>
              </div>
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

export default ApplicantManagement