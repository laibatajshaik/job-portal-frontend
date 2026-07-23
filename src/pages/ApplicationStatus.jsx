import { useEffect, useState } from 'react'
import api from '../api/axios'
import Loader from '../components/Loader'
import { FileText, Clock } from 'lucide-react'

function ApplicationStatus() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const res = await api.get('/applications/my')
      setApplications(res.data.applications)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const getStatusColor = (status) => {
    const statusLower = (status || '').toLowerCase()
    if (statusLower.includes('accept') || statusLower.includes('shortlist') || statusLower.includes('approve')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-100'
    }
    if (statusLower.includes('reject') || statusLower.includes('decline')) {
      return 'bg-rose-50 text-rose-800 border-rose-100'
    }
    return 'bg-amber-50 text-[#FB8C00] border-amber-100'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Application Status</h2>
      {loading ? (
        <Loader />
      ) : applications.length === 0 ? (
        <p className="text-slate-500 font-semibold text-xs bg-white rounded-3xl border border-slate-100 p-8 text-center">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{app.job_title}</h3>
                <p className="text-slate-500 text-xs font-semibold">{app.company_name}</p>
                <p className="text-slate-400 text-[10px] font-medium">Applied On: {app.applied_at || 'Recent'}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border self-start ${getStatusColor(app.status)}`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{app.status || 'Pending'}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ApplicationStatus
