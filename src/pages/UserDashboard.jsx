import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  CheckCircle2,
  FileText,
  ArrowRight,
  User,
  Bell,
  Home,
  ChevronRight,
  AlertCircle
} from 'lucide-react'

function UserDashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const res = await api.get('/applications/my')
      if (res.data && Array.isArray(res.data.applications)) {
        setApplications(res.data.applications)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Generate dynamic notifications based on applications status
  const notifications = applications.map((app, idx) => {
    let title = 'Application Update'
    let message = ''
    let type = 'info' // 'success' for shortlisted, 'error' for rejected, 'info' for pending

    const statusLower = (app.status || '').toLowerCase()

    if (statusLower.includes('shortlist') || statusLower.includes('approve') || statusLower.includes('accept')) {
      title = 'Application Shortlisted 🎉'
      message = `Congratulations! Your application for "${app.job_title || 'Software Role'}" at "${app.company_name || 'Demo Company'}" has been Shortlisted. Check your email for further instructions.`
      type = 'success'
    } else if (statusLower.includes('reject') || statusLower.includes('decline')) {
      title = 'Application Update'
      message = `Thank you for your interest in "${app.job_title || 'Software Role'}" at "${app.company_name || 'Demo Company'}". Unfortunately, the company decided not to proceed with your application.`
      type = 'error'
    } else {
      title = 'Application Pending Review'
      message = `Your application for "${app.job_title || 'Software Role'}" at "${app.company_name || 'Demo Company'}" is currently Pending/Under Review.`
      type = 'info'
    }

    return {
      id: app.id || idx,
      title,
      message,
      time: app.applied_at || 'Recent',
      type
    }
  })

  // Get total shortlisted count
  const shortlistedCount = applications.filter(app => {
    const statusLower = (app.status || '').toLowerCase()
    return statusLower.includes('shortlist') || statusLower.includes('approve') || statusLower.includes('accept')
  }).length

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* ROYAL BLUE GRADIENT SIDEBAR */}
        <aside className="w-full lg:w-64 bg-gradient-to-br from-[#0066FF] to-[#003366] rounded-3xl p-5 text-white flex flex-col justify-between shadow-xl shrink-0 min-h-[620px]">
          
          <div className="space-y-6">
            {/* Sidebar Title */}
            <div className="flex items-center gap-2.5 px-3 py-2 text-base font-bold tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#0066FF] shadow-md">
                <User className="w-4 h-4" />
              </div>
              <span>Candidate Portal</span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-[#003366] font-bold shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <Link
                to="/jobs"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <Briefcase className="w-4 h-4" />
                <span>Browse Jobs</span>
              </Link>

              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  activeTab === 'applications'
                    ? 'bg-white text-[#003366] font-bold shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Applications ({applications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  activeTab === 'notifications'
                    ? 'bg-white text-[#003366] font-bold shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications ({applications.length})</span>
              </button>
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-white hover:bg-neutral-100 text-[#003366] font-bold text-xs py-3 rounded-xl shadow-md transition uppercase tracking-wider mt-6"
          >
            LOGOUT
          </button>

        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 space-y-6">

          {/* Breadcrumb Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Home className="w-3.5 h-3.5" />
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span>Candidate</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#0066FF] font-semibold">
                  {activeTab === 'dashboard' && 'Dashboard'}
                  {activeTab === 'applications' && 'Applications'}
                  {activeTab === 'notifications' && 'Notifications'}
                </span>
              </div>
              <h1 className="text-xl font-bold text-[#003366]">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'applications' && 'My Applications'}
                {activeTab === 'notifications' && 'Notifications'}
              </h1>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Jobs</span>
            </Link>
          </div>

          {activeTab === 'dashboard' && (
            <>
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                
                {/* Card 1: Applied Jobs */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shadow-sm shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applied Jobs</p>
                    <p className="text-2xl font-bold text-[#003366] mt-0.5">{applications.length}</p>
                  </div>
                </div>

                {/* Card 2: Under Review */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shadow-sm shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Under Review</p>
                    <p className="text-2xl font-bold text-[#003366] mt-0.5">
                      {applications.filter(app => !(app.status || '').toLowerCase().includes('reject') && !(app.status || '').toLowerCase().includes('shortlist') && !(app.status || '').toLowerCase().includes('approve')).length}
                    </p>
                  </div>
                </div>

                {/* Card 3: Shortlisted */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-sm shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shortlisted</p>
                    <p className="text-2xl font-bold text-[#003366] mt-0.5">{shortlistedCount}</p>
                  </div>
                </div>

                {/* Card 4: Rejected */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shadow-sm shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Not Selected</p>
                    <p className="text-2xl font-bold text-[#003366] mt-0.5">
                      {applications.filter(app => (app.status || '').toLowerCase().includes('reject')).length}
                    </p>
                  </div>
                </div>

              </div>

              {/* RECENT APPLICATIONS */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#003366]">Recent Job Applications</h2>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="inline-flex items-center gap-1 text-[#0066FF] hover:underline text-xs font-bold"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {applications.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <Briefcase className="w-10 h-10 text-[#0066FF]/20 mx-auto" />
                    <p className="text-xs text-slate-550 font-semibold">You haven't submitted any job applications yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 text-xs">
                    {applications.slice(0, 4).map((app, index) => (
                      <div key={index} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition">
                        <div>
                          <h4 className="font-bold text-slate-900">{app.job_title}</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">{app.company_name || 'Demo Company'}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400 text-[10px] hidden sm:inline">{app.applied_at || 'Recent'}</span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            (app.status || '').toLowerCase().includes('shortlist')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : (app.status || '').toLowerCase().includes('reject')
                              ? 'bg-rose-50 text-rose-700 border border-rose-100'
                              : 'bg-blue-50 text-[#0066FF] border border-blue-100'
                          }`}>
                            {app.status || 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* MY APPLICATIONS TAB */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-bold text-[#003366]">Manage Applications</h2>
              {applications.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <FileText className="w-10 h-10 text-[#0066FF]/20 mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">No applications found in your history.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 bg-slate-50">
                        <th className="p-3 font-semibold">Job Title</th>
                        <th className="p-3 font-semibold">Company</th>
                        <th className="p-3 font-semibold">Applied On</th>
                        <th className="p-3 font-semibold">Status</th>
                        <th className="p-3 font-semibold text-right">Resume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-3 font-bold text-slate-900">{app.job_title}</td>
                          <td className="p-3 text-slate-600 font-medium">{app.company_name || 'Demo Company'}</td>
                          <td className="p-3 text-slate-450">{app.applied_at || 'Recent'}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              (app.status || '').toLowerCase().includes('shortlist')
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : (app.status || '').toLowerCase().includes('reject')
                                ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                : 'bg-blue-50 text-[#0066FF] border border-blue-100'
                            }`}>
                              {app.status || 'Pending'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {app.resume_url ? (
                              <a
                                href={app.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#0066FF] hover:underline font-semibold"
                              >
                                <span>CV Link</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-3.5">
              {notifications.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center space-y-2">
                  <Bell className="w-10 h-10 text-[#0066FF]/20 mx-auto" />
                  <p className="text-xs text-slate-550 font-semibold">No recent inbox notifications.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-5 rounded-3xl border border-slate-100 bg-white flex items-start gap-3.5 shadow-sm hover:shadow-md transition">
                    <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      notif.type === 'success'
                        ? 'bg-emerald-55/10 text-emerald-600'
                        : notif.type === 'error'
                        ? 'bg-rose-55/10 text-rose-600'
                        : 'bg-blue-55/10 text-[#0066FF]'
                    }`}>
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-slate-900">{notif.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{notif.message}</p>
                      <span className="block text-[10px] text-slate-400 font-bold">{notif.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  )
}

export default UserDashboard
