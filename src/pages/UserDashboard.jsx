import { useEffect, useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  User,
  Mail,
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  Building,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Upload,
  Plus,
  LogOut
} from 'lucide-react'

const formatLocalTime = (isoString) => {
  if (!isoString) return 'Recent';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) {
      return isoString;
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch (e) {
    return isoString;
  }
};

const getSkillsForApp = (app) => {
  let skillList = [];
  if (app.skills) {
    skillList = app.skills.split(',').map(s => s.trim());
  } else {
    const title = (app.job_title || '').toLowerCase();
    if (title.includes('front')) {
      skillList = ['React.js', 'JavaScript', 'HTML/CSS', 'TailwindCSS', 'Redux Toolkit', 'TypeScript'];
    } else if (title.includes('python') || title.includes('stack')) {
      skillList = ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'REST APIs'];
    } else if (title.includes('design') || title.includes('ux')) {
      skillList = ['Figma', 'UI Design', 'Prototyping', 'Wireframing', 'User Research', 'Design Systems'];
    } else if (title.includes('data')) {
      skillList = ['SQL', 'Python', 'Excel', 'Tableau', 'PowerBI', 'Statistics'];
    } else {
      skillList = ['Git', 'Problem Solving', 'Communication', 'Teamwork', 'Agile'];
    }
  }
  const splitIndex = Math.max(1, Math.floor(skillList.length * 0.7));
  const matched = skillList.slice(0, splitIndex);
  const missing = skillList.slice(splitIndex);
  return { matched, missing };
};

function UserDashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState('pipeline')

  const [activeStepFilter, setActiveStepFilter] = useState('All')

  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const res = await api.get('/applications/my-applications')
      let backendApps = Array.isArray(res.data) ? res.data : []
      
      const localAppsKey = `apps_${user?.email || 'guest'}`
      const localApps = JSON.parse(localStorage.getItem(localAppsKey) || '[]')
      
      if (backendApps.length < localApps.length) {
        const backendJobIds = new Set(backendApps.map(a => a.job_id))
        const missingApps = localApps.filter(la => !backendJobIds.has(la.job_id))
        
        for (const app of missingApps) {
          try {
            await api.post('/applications/', {
              job_id: app.job_id,
              resume_url: app.resume_url,
              cover_letter: app.cover_letter
            })
          } catch (err) {
            console.warn("Failed to sync missing app to backend:", err)
          }
        }
        
        const finalRes = await api.get('/applications/my-applications')
        backendApps = Array.isArray(finalRes.data) ? finalRes.data : backendApps
      }
      
      localStorage.setItem(localAppsKey, JSON.stringify(backendApps))
      setApplications(backendApps)
    } catch (err) {
      console.warn(err)
      const localAppsKey = `apps_${user?.email || 'guest'}`
      setApplications(JSON.parse(localStorage.getItem(localAppsKey) || '[]'))
    }
    setLoading(false)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const uploadRes = await api.post('/applications/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const fileUrl = uploadRes.data.file_url

      await api.post('/applications/', {
        job_id: -1,
        resume_url: fileUrl,
        cover_letter: `Uploaded CV: ${file.name}`
      })

      alert('CV uploaded successfully to your archive!')
      fetchApplications()
    } catch (err) {
      console.error(err)
      setUploadError(err.response?.data?.detail || 'Failed to upload CV. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const getFullUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('/uploads/')) {
      return (api.defaults.baseURL || 'https://job-portal-backend-1f0h.onrender.com') + url
    }
    return url
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getFilteredApplications = () => {
    return applications.filter(app => {
      if (activeStepFilter === 'Applied') {
        return true;
      }
      if (activeStepFilter === 'Interviewing') {
        return app.status === 'Interviewing';
      }
      if (activeStepFilter === 'Selected') {
        return app.status === 'Shortlisted' || app.status === 'Selected';
      }
      return true;
    });
  }

  const filteredApplications = getFilteredApplications()

  if (loading) return <Loader />

  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">
      <aside className="w-64 bg-[#003366] text-white flex flex-col justify-between shrink-0 sticky top-0 h-screen border-r border-[#0066FF]/20 shadow-lg p-5">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <Link to="/" className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white font-bold shadow">
              <Briefcase className="w-4 h-4" />
            </Link>
            <span className="font-extrabold text-sm tracking-tight text-white">Candidate Workspace</span>
          </div>

          <nav className="flex flex-col gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition text-left w-full ${
                activeTab === 'pipeline'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>My Applications</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition text-left w-full ${
                activeTab === 'database'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CV Archive</span>
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition w-full text-left font-bold"
            >
              <span>Back to Home</span>
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-rose-300 hover:bg-rose-900/20 hover:text-rose-200 transition text-left text-xs font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-[#0066FF]/15 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <h1 className="text-base font-black text-[#003366] uppercase tracking-tight">Candidate Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-505 font-bold bg-[#0066FF]/10 px-3 py-1.5 rounded-full">
              Logged in: candidate
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">

        <section className="bg-white rounded-xl border border-[#0066FF]/30 p-4 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#003366]">
            <span>Filter Job Status</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            
            <div className="space-y-1.5">
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Step</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Applied', 'Interviewing', 'Selected'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveStepFilter(f)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition ${
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
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Applications</p>
              <p className="text-sm font-black text-[#003366]">{applications.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Selected</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Shortlisted' || a.status === 'Selected').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Interviewing</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Interviewing').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rejected</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Rejected').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Applied (Pending)</p>
              <p className="text-sm font-black text-[#003366]">
                {applications.filter(a => a.status === 'Pending' || a.status === 'Applied').length}
              </p>
            </div>
          </div>

        </section>

        <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6">

          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#003366] uppercase tracking-tight">Active Applications</h2>
                <span className="text-xs text-[#0066FF] font-bold bg-[#0066FF]/10 px-3 py-1 rounded-full">
                  Real-time Status Updates
                </span>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 text-slate-600 space-y-3 font-semibold">
                  <p className="text-sm">You haven't submitted any job applications yet.</p>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition"
                  >
                    <span>Browse Openings</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-semibold space-y-2">
                  <p className="text-sm">No applications found in this stage.</p>
                  <button
                    onClick={() => setActiveStepFilter('All')}
                    className="text-xs text-[#0066FF] hover:underline font-bold"
                  >
                    View All Applications
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl p-6 border border-[#0066FF]/20 shadow-sm flex flex-col gap-4.5 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div>
                            <h4 className="font-extrabold text-base text-[#003366]">{app.job_title}</h4>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold mt-0.5">
                              <Building className="w-3.5 h-3.5 text-slate-400" />
                              <span>{app.company_name || 'Demo Company'}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>Applied: {formatLocalTime(app.applied_at)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-[#0066FF]" />
                              <span>ATS Match: <b>{app.ats_score || 70}%</b></span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div>
                            {app.status === 'Shortlisted' || app.status === 'Selected' ? (
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-250 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Selected</span>
                              </span>
                            ) : app.status === 'Interviewing' ? (
                              <span className="bg-blue-50 text-blue-700 border border-blue-250 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                <span>Interviewing</span>
                              </span>
                            ) : app.status === 'Rejected' ? (
                              <span className="bg-rose-50 text-rose-700 border border-rose-250 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Rejected</span>
                              </span>
                            ) : (
                              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span>Applied</span>
                              </span>
                            )}
                          </div>

                          {app.job_title !== 'Uploaded Resume' && app.job_id !== -1 && (
                            <Link
                              to={`/jobs/${app.job_id}`}
                              className="bg-white hover:bg-slate-100 text-[#003366] border border-[#0066FF]/20 text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition flex items-center gap-1"
                            >
                              <span>View spec</span>
                              <ExternalLink className="w-3.5 h-3.5 text-[#0066FF]" />
                            </Link>
                          )}
                        </div>
                      </div>

                      {app.status === 'Interviewing' && (
                        <div className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                            </div>
                            <div className="text-left">
                              <p className="text-[11px] text-[#0066FF] font-black uppercase tracking-wider">Scheduled Interview</p>
                              <p className="text-xs text-slate-800 font-extrabold mt-0.5">Aug 10, 2026 at 10:00 AM IST</p>
                            </div>
                          </div>
                          <a 
                            href="https://meet.google.com/abc-defg-hij" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-[#0066FF] hover:bg-[#0055DD] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                            <span>Join Virtual Room</span>
                          </a>
                        </div>
                      )}

                      <div className="border-t border-slate-100 pt-3 mt-2 text-left">
                        <details className="group">
                          <summary className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer list-none flex items-center gap-1 select-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-open:rotate-180"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                            <span>View ATS Skill Match Details</span>
                          </summary>
                          
                          {(() => {
                            const { matched, missing } = getSkillsForApp(app);
                            return (
                              <div className="mt-3 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mr-2">Matched Skills:</span>
                                  {matched.map((s, i) => (
                                    <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                      ✓ {s}
                                    </span>
                                  ))}
                                </div>
                                {missing.length > 0 && (
                                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-dashed border-slate-200">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mr-2">Missing Skills:</span>
                                    {missing.map((s, i) => (
                                      <span key={i} className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                        ⚠ {s}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </details>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#0066FF]/10 pb-3">
                <div>
                  <h3 className="text-base font-black text-[#003366] uppercase">Uploaded CV Archive</h3>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    Manage and upload your physical CV files or track application documents.
                  </p>
                </div>
                
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0055DD] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload New CV'}</span>
                  </button>
                </div>
              </div>

              {uploadError && (
                <div className="flex items-center gap-2 border border-rose-100 bg-rose-50 text-rose-700 text-xs px-4 py-3 rounded-xl font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{uploadError}</span>
                </div>
              )}

              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Here are the links to files you have uploaded for your job applications. Ensure your Google Drive links are set to public sharing so recruiters can read them.
              </p>

              {applications.length === 0 ? (
                <p className="text-xs text-slate-400 font-bold py-6">No files uploaded.</p>
              ) : (
                <div className="border border-[#0066FF]/15 rounded-xl overflow-hidden text-xs font-semibold">
                  <div className="bg-slate-50 border-b border-slate-100 p-3 text-[#003366] font-bold">
                    File List
                  </div>
                  <div className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <div key={app.id} className="p-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-slate-700 font-bold">{app.job_title} CV File</p>
                          <span className="text-[10px] text-slate-400 font-medium truncate max-w-xs block">{app.resume_url}</span>
                        </div>
                        {app.resume_url && (
                          <a
                            href={getFullUrl(app.resume_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0066FF] hover:underline flex items-center gap-1 shrink-0"
                          >
                            <span>Open URL</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </section>

      </main>
      </div>
    </div>
  )
}

export default UserDashboard
