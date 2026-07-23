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
  X
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

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* BRIGHT WHITE SIDEBAR WITH HONEY ORANGE ACTIONS (Recruiter Portal) */}
        <aside className="w-full lg:w-64 bg-white rounded-3xl p-5 text-slate-700 flex flex-col justify-between shadow-sm border border-slate-100 shrink-0 min-h-[620px]">
          
          <div className="space-y-6">
            {/* Sidebar Title */}
            <div className="flex items-center gap-2.5 px-3 py-2 text-base font-bold tracking-tight text-slate-900">
              <div className="w-8 h-8 rounded-xl bg-[#FFA726] flex items-center justify-center text-white shadow-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <span>Manager Portal</span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <Link
                to="/manager/dashboard"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/manager/post-job"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Job</span>
              </Link>

              <Link
                to="/manager/company-profile"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition"
              >
                <Building2 className="w-4 h-4" />
                <span>Company Profile</span>
              </Link>

              <Link
                to="/manager/applicants/all"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFA726] text-white font-bold shadow-md transition"
              >
                <Users className="w-4 h-4" />
                <span>Applicants</span>
              </Link>

              <div 
                onClick={() => alert("No new notifications for manager.")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3 rounded-xl shadow-md transition uppercase tracking-wider mt-6"
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
                <span>Manager</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#FFA726] font-semibold uppercase tracking-wider">Applicants</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                {jobId === 'all' ? 'All Applicants' : 'Job Applicants'}
              </h1>
            </div>

            <Link
              to="/manager/dashboard"
              className="inline-flex items-center gap-1.5 bg-[#FFA726] hover:bg-[#FB8C00] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* APPLICANTS DETAILS CARD */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Manage Job Applications</h2>

            {applicants.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Users className="w-10 h-10 text-slate-305 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">No candidates have applied to this position yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 bg-slate-50">
                      <th className="p-3 font-semibold">Name</th>
                      <th className="p-3 font-semibold">Email</th>
                      <th className="p-3 font-semibold">Job Reference</th>
                      <th className="p-3 font-semibold">ATS Score</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold">Resume Link</th>
                      <th className="p-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applicants.map((app, index) => {
                      const score = app.ats_score || 70
                      const isShortlisted = score >= 80

                      return (
                        <tr key={index} className="hover:bg-slate-50/50 transition">
                          <td className="p-3 font-bold text-slate-900">{app.candidate_name || app.name || 'Anonymous'}</td>
                          <td className="p-3 text-slate-500 font-medium">{app.candidate_email || app.email}</td>
                          <td className="p-3 text-slate-700 font-medium">{app.job_title || `Job #${app.job_id}`}</td>
                          <td className="p-3">
                            <span 
                              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
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
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                                app.status === 'Shortlisted'
                                  ? 'bg-[#FFA726] text-white shadow-sm'
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
                                className="inline-flex items-center gap-1.5 text-[#FFA726] hover:underline font-bold"
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
                                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold transition border ${
                                  app.status === 'Shortlisted'
                                    ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                                    : 'bg-[#FFA726] hover:bg-[#FB8C00] text-white border-none'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Shortlist</span>
                              </button>
                              <button
                                onClick={() => handleStatusChange(app.id ?? (index + 1), 'reject')}
                                disabled={app.status === 'Rejected'}
                                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold transition border ${
                                  app.status === 'Rejected'
                                    ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                                    : 'bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 border-slate-250 hover:border-rose-350'
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

      </div>

      {/* INLINE RESUME VIEWER OVERLAY MODAL */}
      {selectedResumeUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Resume / CV Viewer</h3>
              <button
                onClick={() => setSelectedResumeUrl(null)}
                className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-350 text-slate-700 text-xs font-bold transition flex items-center gap-1"
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

export default ApplicantManagement