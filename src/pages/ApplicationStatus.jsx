import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import {
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Mail,
  Briefcase,
  ChevronRight,
  Home,
  Building,
  Calendar,
  AlertCircle
} from 'lucide-react'

function ApplicationStatus() {
  const { id } = useParams()
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatus()
  }, [id])

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/applications/${id}`)
      setApp(res.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  if (loading) return <Loader />

  if (!app) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-slate-100 p-6 text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-base font-black text-slate-800 uppercase">Application Not Found</h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            The status page request is invalid or does not correspond to an existing candidate application node.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-12">
      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        
        {}
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <Link to="/" className="hover:text-[#0066FF] transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link to="/user/dashboard" className="hover:text-[#0066FF] transition">Workspace</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[#003366] font-extrabold">Application Tracking Status</span>
        </div>

        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider bg-[#0066FF]/10 text-[#0066FF] px-2.5 py-1 rounded-full border border-[#0066FF]/20 inline-block">
                Reference ID: #{app.id}
              </span>
              <h2 className="text-lg font-black text-[#003366] uppercase mt-2 tracking-tight">Application Tracker</h2>
            </div>
            
            {}
            <div className="flex items-center gap-2">
              {app.status === 'Shortlisted' ? (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-250 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Shortlisted</span>
                </span>
              ) : app.status === 'Rejected' ? (
                <span className="bg-rose-50 text-rose-700 border border-rose-250 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Rejected</span>
                </span>
              ) : (
                <span className="bg-amber-50 text-amber-700 border border-amber-250 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm animate-pulse">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Pending Review</span>
                </span>
              )}
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-655">
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] text-slate-400 uppercase font-black">Applied Job Position</h4>
                <div className="flex items-center gap-1.5 text-sm text-[#003366] font-extrabold mt-1">
                  <Briefcase className="w-4 h-4 text-[#0066FF]" />
                  <span>{app.job_title}</span>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] text-slate-400 uppercase font-black">Company Name</h4>
                <div className="flex items-center gap-1.5 text-slate-700 font-extrabold mt-1">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>{app.company_name || 'Demo Company'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] text-slate-400 uppercase font-black">Submission Date</h4>
                <div className="flex items-center gap-1.5 text-slate-700 font-extrabold mt-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{app.applied_at || 'Recent'}</span>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] text-slate-400 uppercase font-black">Uploaded CV Reference</h4>
                <div className="flex items-center gap-1.5 text-slate-700 font-extrabold mt-1">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <a
                    href={app.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066FF] hover:underline truncate max-w-[200px]"
                  >
                    {app.resume_url}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="bg-[#F4F7FC]/50 border border-[#0066FF]/15 p-6 rounded-xl space-y-6">
            <h4 className="text-xs font-black text-[#003366] uppercase">Application Milestones</h4>
            
            <div className="relative pl-6 border-l-2 border-[#0066FF]/20 space-y-6 text-xs font-semibold">
              
              {}
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[8px] font-black">✓</span>
                <h5 className="font-extrabold text-[#003366]">Application Submitted</h5>
                <p className="text-[10px] text-slate-455">The job portal received your resume and metadata details successfully.</p>
              </div>

              {}
              <div className="relative">
                <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-black ${
                  app.status !== 'Pending' ? 'bg-emerald-500' : 'bg-amber-400 animate-ping'
                }`}>{app.status !== 'Pending' ? '✓' : '•'}</span>
                <h5 className="font-extrabold text-[#003366]">Recruiter Review</h5>
                <p className="text-[10px] text-slate-455">Company HR managers are reviewing your application compatibility specs.</p>
              </div>

              {}
              <div className="relative">
                <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-black ${
                  app.status === 'Shortlisted' ? 'bg-emerald-500' : app.status === 'Rejected' ? 'bg-rose-500' : 'bg-slate-200'
                }`}>{app.status === 'Shortlisted' ? '✓' : app.status === 'Rejected' ? '✗' : ''}</span>
                <h5 className="font-extrabold text-[#003366]">Pipeline Decision</h5>
                <p className="text-[10px] text-slate-455">
                  {app.status === 'Shortlisted' && 'Congratulations! You have been shortlisted for the next round.'}
                  {app.status === 'Rejected' && 'Thank you for your interest. We are proceeding with other candidates.'}
                  {app.status === 'Pending' && 'Final recruitment decision is pending.'}
                </p>
              </div>

            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              to="/user/dashboard"
              className="bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold py-3.5 px-6 rounded-xl shadow transition uppercase tracking-wider"
            >
              Back to Candidate Dashboard
            </Link>
          </div>

        </section>

      </main>
    </div>
  )
}

export default ApplicationStatus
