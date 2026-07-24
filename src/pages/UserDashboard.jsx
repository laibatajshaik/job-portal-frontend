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
    <div className="min-h-screen bg-[#F7F5F0] text-slate-800 font-sans pb-12">
      
      {/* MOCKUP HORIZONTAL TOP HEADER NAVIGATION BAR */}
      <header className="bg-[#4D3A2F] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DDB892] flex items-center justify-center text-[#4D3A2F] font-bold shadow">
              <User className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight">Candidate Portal</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center flex-wrap justify-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'dashboard'
                  ? 'bg-[#DDB892] text-[#4D3A2F] font-black shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <Link
              to="/jobs"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition font-bold text-xs"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse Jobs</span>
            </Link>

            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                activeTab === 'applications'
                  ? 'bg-[#DDB892] text-[#4D3A2F] font-black shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition relative ${
                activeTab === 'notifications'
                  ? 'bg-[#DDB892] text-[#4D3A2F] font-black shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Notifications ({applications.length})</span>
            </button>
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
              <span>Candidate Console</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#4D3A2F] capitalize">{activeTab}</span>
            </div>
            <h1 className="text-xl font-bold text-[#4D3A2F]">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'applications' && 'My Applications History'}
              {activeTab === 'notifications' && 'My Inbox Notifications'}
            </h1>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 bg-[#4D3A2F] hover:bg-[#3d2e25] text-[#DDB892] text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            <Briefcase className="w-4 h-4" />
            <span>Explore Jobs</span>
          </Link>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Card 1 */}
              <div className="bg-white rounded-lg p-4 border border-[#DDB892]/20 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#F7F5F0] text-[#4D3A2F] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Applied</p>
                  <p className="text-base font-black text-[#4D3A2F]">{applications.length}</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-lg p-4 border border-[#DDB892]/20 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#F7F5F0] text-amber-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Under Review</p>
                  <p className="text-base font-black text-[#4D3A2F]">
                    {applications.filter(app => !(app.status || '').toLowerCase().includes('reject') && !(app.status || '').toLowerCase().includes('shortlist') && !(app.status || '').toLowerCase().includes('approve')).length}
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-lg p-4 border border-[#DDB892]/20 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#F7F5F0] text-emerald-650 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Shortlisted</p>
                  <p className="text-base font-black text-[#4D3A2F]">{shortlistedCount}</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-lg p-4 border border-[#DDB892]/20 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#F7F5F0] text-rose-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rejected</p>
                  <p className="text-base font-black text-[#4D3A2F]">
                    {applications.filter(app => (app.status || '').toLowerCase().includes('reject')).length}
                  </p>
                </div>
              </div>

            </div>

            {/* RECENT APPLICATIONS */}
            <div className="bg-white rounded-xl border border-[#DDB892]/35 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#4D3A2F]">Recent Applications Status</h2>
                <button 
                  onClick={() => setActiveTab('applications')}
                  className="inline-flex items-center gap-1 text-[#B58463] hover:underline text-xs font-bold"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Briefcase className="w-10 h-10 text-[#DDB892]/20 mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">You haven't submitted any job applications yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 text-xs font-semibold">
                  {applications.slice(0, 4).map((app, index) => (
                    <div key={index} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-lg transition">
                      <div>
                        <h4 className="font-bold text-[#4D3A2F]">{app.job_title}</h4>
                        <p className="text-slate-400 text-[10px] mt-0.5">{app.company_name || 'Demo Company'}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-[10px] hidden sm:inline">{app.applied_at || 'Recent'}</span>
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          (app.status || '').toLowerCase().includes('shortlist')
                            ? 'bg-[#DDB892]/20 text-[#4D3A2F]'
                            : (app.status || '').toLowerCase().includes('reject')
                            ? 'bg-rose-50 text-rose-700 border border-rose-100'
                            : 'bg-slate-100 text-slate-600'
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
          <div className="bg-white rounded-xl border border-[#DDB892]/35 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#4D3A2F]">Applications History</h2>
            {applications.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <FileText className="w-10 h-10 text-[#DDB892]/20 mx-auto" />
                <p className="text-xs text-slate-500 font-semibold">No applications found in your history.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DDB892]/20 text-[#4D3A2F] bg-slate-50 font-bold">
                      <th className="p-3">Job Title</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Applied On</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Resume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-bold text-[#4D3A2F]">{app.job_title}</td>
                        <td className="p-3 text-slate-655">{app.company_name || 'Demo Company'}</td>
                        <td className="p-3 text-slate-450">{app.applied_at || 'Recent'}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            (app.status || '').toLowerCase().includes('shortlist')
                              ? 'bg-[#DDB892]/20 text-[#4D3A2F]'
                              : (app.status || '').toLowerCase().includes('reject')
                              ? 'bg-rose-50 text-rose-700 border border-rose-100'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {app.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-3 text-right font-bold">
                          {app.resume_url ? (
                            <a
                              href={app.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B58463] hover:underline"
                            >
                              View Resume
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
              <div className="bg-white rounded-xl border border-[#DDB892]/35 shadow-sm p-8 text-center space-y-2">
                <Bell className="w-10 h-10 text-[#DDB892]/20 mx-auto" />
                <p className="text-xs text-slate-550 font-semibold">No recent inbox notifications.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="p-5 rounded-xl border border-[#DDB892]/30 bg-white flex items-start gap-3.5 shadow-sm hover:shadow transition">
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    notif.type === 'success'
                      ? 'bg-emerald-50 text-emerald-650'
                      : notif.type === 'error'
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-slate-100 text-[#4D3A2F]'
                  }`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-slate-900">{notif.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">{notif.message}</p>
                    <span className="block text-[10px] text-slate-400 font-bold">{notif.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </main>
    </div>
  )
}

export default UserDashboard
