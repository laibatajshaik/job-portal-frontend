import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { Briefcase, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react'

function UserDashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Dashboard Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Candidate Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">Manage and track your active job applications.</p>
          </div>
          <Link
            to="/jobs"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <Briefcase className="w-4 h-4" />
            <span>Browse Available Jobs</span>
          </Link>
        </div>

        {/* My Applications Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">My Job Applications</h2>
          
          {loading ? (
            <Loader />
          ) : applications.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">You haven't submitted any job applications yet.</p>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <span>Find jobs to apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
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
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-blue-100">
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

      </div>
    </div>
  )
}

export default UserDashboard
