import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'

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
      setApplications(res.data.applications)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
      <div className="mb-4">
        <Link to="/jobs" className="bg-blue-700 text-white px-4 py-2 rounded">
          Browse Jobs
        </Link>
      </div>
      <h3 className="text-xl font-semibold mb-3">My Applications</h3>
      {loading ? (
        <Loader />
      ) : applications.length === 0 ? (
        <p className="text-gray-600">You have not applied to any jobs yet.</p>
      ) : (
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left border-b">Job Title</th>
              <th className="p-2 text-left border-b">Company</th>
              <th className="p-2 text-left border-b">Applied On</th>
              <th className="p-2 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="p-2 border-b">{app.job_title}</td>
                <td className="p-2 border-b">{app.company_name}</td>
                <td className="p-2 border-b">{app.applied_at}</td>
                <td className="p-2 border-b">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserDashboard
