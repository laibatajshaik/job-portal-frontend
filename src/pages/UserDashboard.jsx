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
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* FLOATING DARK SIDEBAR */}
        <aside className="w-full lg:w-64 bg-[#181824] rounded-3xl p-5 text-white flex flex-col justify-between shadow-xl shrink-0 min-h-[620px]">
          
          <div className="space-y-6">
            {/* Sidebar Title */}
            <div className="flex items-center gap-2.5 px-3 py-2 text-base font-bold tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-black shadow-md">
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
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <Link
                to="/jobs"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <Briefcase className="w-4 h-4" />
                <span>Browse Jobs</span>
              </Link>

              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  activeTab === 'applications'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Applications ({applications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
                  activeTab === 'notifications'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                <span>Candidate</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-semibold">
                  {activeTab === 'dashboard' && 'Dashboard'}
                  {activeTab === 'applications' && 'Applications'}
                  {activeTab === 'notifications' && 'Notifications'}
                </span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'applications' && 'My Applications'}
                {activeTab === 'notifications' && 'Notifications'}
              </h1>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
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
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Applied Jobs</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">{applications.length}</p>
                  </div>
                </div>

                {/* Card 2: Under Review */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-lg shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Under Review</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">
                      {applications.filter(app => !(app.status || '').toLowerCase().includes('reject') && !(app.status || '').toLowerCase().includes('shortlist') && !(app.status || '').toLowerCase().includes('approve')).length}
                    </p>
                  </div>
                </div>

                {/* Card 3: Shortlisted */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800 text-white flex items-center justify-center shadow-lg shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Shortlisted</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">{shortlistedCount}</p>
                  </div>
                </div>

                {/* Card 4: Active */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-neutral-700 text-white flex items-center justify-center shadow-lg shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Status</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">Active</p>
                  </div>
                </div>

              </div>

              {/* MY APPLICATIONS TABLE CARD */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-900">My Submitted Applications</h2>

                {applications.length === 0 ? (
                  <div className="text-center py-10 space-y-3">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-xs text-slate-500 font-medium">You haven't submitted any job applications yet.</p>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center gap-1 text-xs font-bold text-black hover:underline"
                    >
                      <span>Browse jobs to apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                          <th className="p-3 font-semibold">Job Title</th>
                          <th className="p-3 font-semibold">Company</th>
                          <th className="p-3 font-semibold">Applied Date</th>
                          <th className="p-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {applications.map((app, idx) => (
                          <tr key={app.id || idx} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-bold text-slate-900">{app.job_title || 'Software Role'}</td>
                            <td className="p-3 text-slate-600">{app.company_name || 'Demo Company'}</td>
                            <td className="p-3 text-slate-500">{app.applied_at || 'Recent'}</td>
                            <td className="p-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                (app.status || '').toLowerCase().includes('shortlist') || (app.status || '').toLowerCase().includes('approve') || (app.status || '').toLowerCase().includes('accept')
                                  ? 'bg-black text-white border-black font-bold'
                                  : (app.status || '').toLowerCase().includes('reject') || (app.status || '').toLowerCase().includes('decline')
                                  ? 'bg-rose-50 text-rose-700 border-rose-100'
                                  : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                              }`}>
                                <Clock className="w-3 h-3" />
                                {app.status || 'Applied'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'applications' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900">My Submitted Applications</h2>
              {applications.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">You haven't submitted any job applications yet.</p>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1 text-xs font-bold text-black hover:underline"
                  >
                    <span>Browse jobs to apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                        <th className="p-3 font-semibold">Job Title</th>
                        <th className="p-3 font-semibold">Company</th>
                        <th className="p-3 font-semibold">Applied Date</th>
                        <th className="p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app, idx) => (
                        <tr key={app.id || idx} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-bold text-slate-900">{app.job_title || 'Software Role'}</td>
                          <td className="p-3 text-slate-600">{app.company_name || 'Demo Company'}</td>
                          <td className="p-3 text-slate-500">{app.applied_at || 'Recent'}</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                              (app.status || '').toLowerCase().includes('shortlist') || (app.status || '').toLowerCase().includes('approve') || (app.status || '').toLowerCase().includes('accept')
                                ? 'bg-black text-white border-black font-bold'
                                : (app.status || '').toLowerCase().includes('reject') || (app.status || '').toLowerCase().includes('decline')
                                ? 'bg-rose-50 text-rose-700 border-rose-100'
                                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                            }`}>
                              <Clock className="w-3 h-3" />
                              {app.status || 'Applied'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900">Application Status Notifications</h2>
              
              {notifications.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <Bell className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">No notifications yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition hover:shadow-sm ${
                        notif.type === 'success'
                          ? 'bg-neutral-900 border-neutral-800 text-white shadow-md'
                          : notif.type === 'error'
                          ? 'bg-rose-50 border-rose-250 text-rose-900'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="mt-0.5">
                        {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {notif.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600" />}
                        {notif.type === 'info' && <Clock className="w-4 h-4 text-slate-500" />}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-xs">{notif.title}</h4>
                        <p className={`text-xs leading-relaxed ${notif.type === 'success' ? 'text-slate-300' : 'text-slate-600'}`}>{notif.message}</p>
                        <span className={`block text-[10px] ${notif.type === 'success' ? 'text-slate-450' : 'text-slate-400'} font-medium`}>{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  )
}

export default UserDashboard
