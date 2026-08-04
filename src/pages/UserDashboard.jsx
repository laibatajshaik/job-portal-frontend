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
  Plus
} from 'lucide-react'

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
      if (Array.isArray(res.data)) {
        setApplications(res.data)
      }
    } catch (err) {
      console.log(err)
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
    navigate('/login')
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
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-12">
      
      {}
      <header className="bg-[#003366] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {}
          <div className="flex items-center gap-2.5">
            <Link to="/" className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white font-bold shadow">
              <Briefcase className="w-4 h-4" />
            </Link>
            <span className="font-extrabold text-sm tracking-tight text-white">Candidate Workspace</span>
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
              <Clock className="w-3.5 h-3.5" />
              <span>My Applications</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'database'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV Archive</span>
            </button>
          </nav>

          {}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4.5 py-2.5 rounded-lg transition flex items-center gap-1.5"
            >
              <span>Back to Home</span>
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
        <section className="bg-white rounded-xl border border-[#0066FF]/30 p-4 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#003366]">
            <span>Filter Job Status</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            {}
            <div className="space-y-1.5">
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Step</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Applied', 'Selected'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveStepFilter(f)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition ${
                      activeStepFilter === f
                        ? 'bg-[#003366] text-white border-[#003366]'
                        : 'bg-slate-50 text-slate-655 border-[#0066FF]/20 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
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

        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6">
          
          {}
          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#003366] uppercase tracking-tight">Active Applications</h2>
                <span className="text-xs text-[#0066FF] font-bold bg-[#0066FF]/10 px-3 py-1 rounded-full">
                  Real-time Status Updates
                </span>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 text-slate-555 space-y-3 font-semibold">
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
                      className="bg-[#F4F7FC]/50 hover:bg-[#F4F7FC] rounded-xl p-5 border border-[#0066FF]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition duration-150"
                    >
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#003366]">{app.job_title}</h4>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold mt-0.5">
                            <Building className="w-3.5 h-3.5 text-slate-400" />
                            <span>{app.company_name || 'Demo Company'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Applied: {app.applied_at || 'Recent'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-[#0066FF]" />
                            <span>ATS Match: <b>{app.ats_score || 70}%</b></span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                        
                        {/* Status Badge */}
                        <div className="flex items-center gap-1.5">
                          {app.status === 'Shortlisted' || app.status === 'Selected' ? (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Selected</span>
                            </span>
                          ) : app.status === 'Interviewing' ? (
                            <span className="bg-blue-50 text-blue-700 border border-blue-250 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              <span>Interviewing</span>
                            </span>
                          ) : app.status === 'Rejected' ? (
                            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Rejected</span>
                            </span>
                          ) : (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>Applied</span>
                            </span>
                          )}
                        </div>

                        {/* View Job Spec */}
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
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CV ARCHIVE */}
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

              <p className="text-xs text-slate-555 font-semibold leading-relaxed">
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
  )
}

export default UserDashboard
