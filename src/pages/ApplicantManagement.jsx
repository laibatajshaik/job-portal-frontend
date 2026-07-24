import { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  Users,
  Bell,
  LogOut,
  Home,
  ChevronRight,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  Award,
  ArrowLeft,
  X,
  Download,
  Calendar,
  Filter
} from 'lucide-react'

function ApplicantManagement() {
  const { jobId } = useParams()
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedResumeUrl, setSelectedResumeUrl] = useState(null)

  useEffect(() => {
    fetchApplicants()
  }, [jobId])

  const fetchApplicants = async () => {
    setLoading(true)
    try {
      const url = jobId === 'all' ? '/manager/applicants' : `/manager/applicants?job_id=${jobId}`
      const res = await api.get(url)
      if (res.data && Array.isArray(res.data.applicants)) {
        setApplicants(res.data.applicants)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleStatusChange = async (id, action) => {
    try {
      await api.put(`/manager/applicants/${id}/${action}`)
      // Update local state instantly for snappier feedback
      setApplicants(prev => prev.map((app, idx) => {
        if (app.id === id || (app.id === undefined && idx + 1 === id)) {
          return { ...app, status: action === 'shortlist' ? 'Shortlisted' : 'Rejected' }
        }
        return app
      }))
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

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-slate-800 font-sans pb-12">
      
      {/* MOCKUP HORIZONTAL TOP HEADER NAVIGATION BAR */}
      <header className="bg-[#4D3A2F] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DDB892] flex items-center justify-center text-[#4D3A2F] font-bold shadow">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight">Manager Portal</span>
          </div>

          {/* Navigation Links (horizontal navigation header) */}
          <nav className="flex items-center flex-wrap justify-center gap-1.5 text-xs font-bold">
            <Link
              to="/manager/dashboard"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/manager/post-job"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Job</span>
            </Link>

            <Link
              to="/manager/company-profile"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company Profile</span>
            </Link>

            <Link
              to="/manager/applicants/all"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#DDB892] text-[#4D3A2F] font-black shadow-sm"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Applicants</span>
            </Link>
          </nav>

          {/* Logout Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-[#DDB892] hover:bg-[#B58463] text-[#4D3A2F] text-xs font-extrabold px-4 py-2 rounded-lg transition shadow"
            >
              LOGOUT
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Home className="w-3.5 h-3.5" />
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span>Manager Console</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#4D3A2F]">Applicants</span>
            </div>
            <h1 className="text-xl font-bold text-[#4D3A2F]">
              {jobId === 'all' ? 'All Applicants' : 'Job Applicants'}
            </h1>
          </div>

          <Link
            to="/manager/dashboard"
            className="inline-flex items-center gap-1.5 bg-[#4D3A2F] hover:bg-[#3d2e25] text-[#DDB892] text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* APPLICANTS DETAILS CARD */}
        <div className="bg-white rounded-xl border border-[#DDB892]/35 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#4D3A2F]">Manage Job Applications</h2>

          {applicants.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Users className="w-10 h-10 text-[#DDB892]/30 mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">No candidates have applied to this position yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#DDB892]/20 text-[#4D3A2F] bg-slate-50 font-bold">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Job Reference</th>
                    <th className="p-3">ATS Score</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Resume Link</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {applicants.map((app, index) => {
                    const score = app.ats_score || 70
                    const isShortlisted = score >= 80

                    return (
                      <tr key={index} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-slate-900">{app.candidate_name || app.name || 'Anonymous'}</td>
                        <td className="p-3 text-slate-500 font-semibold">{app.candidate_email || app.email}</td>
                        <td className="p-3 text-slate-700 font-semibold">{app.job_title || `Job #${app.job_id}`}</td>
                        <td className="p-3">
                          <span 
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isShortlisted
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-100/50'
                                : 'bg-neutral-50 text-neutral-800 border-neutral-100'
                            }`}
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>{score}%</span>
                          </span>
                        </td>
                        <td className="p-3 font-semibold">
                          <span 
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              app.status === 'Shortlisted'
                                ? 'bg-[#DDB892] text-[#4D3A2F] shadow-sm'
                                : app.status === 'Rejected'
                                ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {app.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-3">
                          {app.resume_url ? (
                            <button
                              onClick={() => setSelectedResumeUrl(app.resume_url)}
                              className="inline-flex items-center gap-1.5 text-[#B58463] hover:underline font-bold"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View CV</span>
                            </button>
                          ) : (
                            <span className="text-slate-400">Not Provided</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleStatusChange(app.id ?? (index + 1), 'shortlist')}
                              disabled={app.status === 'Shortlisted'}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                                app.status === 'Shortlisted'
                                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                                  : 'bg-[#4D3A2F] text-[#DDB892] border-transparent shadow'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Shortlist</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(app.id ?? (index + 1), 'reject')}
                              disabled={app.status === 'Rejected'}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                                app.status === 'Rejected'
                                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                                  : 'bg-white text-rose-600 hover:bg-rose-50 border-slate-200 hover:border-rose-300'
                              }`}
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* INLINE RESUME VIEWER OVERLAY MODAL */}
      {selectedResumeUrl && (
        <div className="fixed inset-0 bg-[#4D3A2F]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#DDB892]/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-[#4D3A2F] text-sm">Resume / CV Viewer</h3>
              <div className="flex items-center gap-2">
                <a
                  href={selectedResumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#DDB892] hover:bg-[#B58463] text-[#4D3A2F] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
                <a
                  href={selectedResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#4D3A2F] hover:bg-[#3d2e25] text-white text-xs font-bold transition flex items-center shadow-sm"
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