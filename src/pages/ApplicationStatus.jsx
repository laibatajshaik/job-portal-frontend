import { useEffect, useState } from 'react'
import api from '../api/axios'
import Loader from '../components/Loader'

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
    const s = (status || '').toLowerCase()
    if (s.includes('shortlist') || s.includes('accept') || s.includes('approve')) return 'text-emerald-600'
    if (s.includes('reject')) return 'text-rose-600'
    return 'text-amber-600'
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-black text-[#3B2525]">Application Status Tracker</h2>
        {loading ? (
          <Loader />
        ) : applications.length === 0 ? (
          <p className="text-slate-500 font-semibold text-xs">No applications found in history.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="bg-white border border-[#E87552]/25 rounded-2xl p-5 shadow-sm space-y-2">
              <h3 className="font-bold text-sm text-[#3B2525]">{app.job_title}</h3>
              <p className="text-slate-500 text-xs font-semibold">{app.company_name}</p>
              <p className="text-slate-400 text-[11px] font-semibold">Applied On: {app.applied_at || 'Recent'}</p>
              <p className={`font-black text-xs uppercase tracking-wide ${getStatusColor(app.status)}`}>
                Status: {app.status || 'Pending'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ApplicationStatus
