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
    if (status === 'accepted') return 'text-green-600'
    if (status === 'rejected') return 'text-red-600'
    return 'text-yellow-600'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Application Status</h2>
      {loading ? (
        <Loader />
      ) : applications.length === 0 ? (
        <p className="text-gray-600">No applications found.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="bg-white border border-gray-300 rounded p-4 mb-3">
            <h3 className="font-semibold">{app.job_title}</h3>
            <p className="text-gray-600">{app.company_name}</p>
            <p className="text-gray-600">Applied On: {app.applied_at}</p>
            <p className={`font-semibold ${getStatusColor(app.status)}`}>
              Status: {app.status}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default ApplicationStatus
