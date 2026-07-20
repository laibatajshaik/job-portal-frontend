import { useEffect, useState } from 'react'
import api from '../api/axios'
import Loader from '../components/Loader'

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('users')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const usersRes = await api.get('/admin/users')
      const jobsRes = await api.get('/admin/jobs')
      setUsers(usersRes.data.users)
      setJobs(jobsRes.data.jobs)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteJob = async (id) => {
    try {
      await api.delete(`/admin/jobs/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab('users')}
          className={`px-4 py-2 rounded ${tab === 'users' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
        >
          Users
        </button>
        <button
          onClick={() => setTab('jobs')}
          className={`px-4 py-2 rounded ${tab === 'jobs' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
        >
          Jobs
        </button>
      </div>

      {tab === 'users' && (
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">Email</th>
              <th className="p-2 text-left border-b">Role</th>
              <th className="p-2 text-left border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border-b">{u.name}</td>
                <td className="p-2 border-b">{u.email}</td>
                <td className="p-2 border-b">{u.role}</td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'jobs' && (
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left border-b">Title</th>
              <th className="p-2 text-left border-b">Company</th>
              <th className="p-2 text-left border-b">Location</th>
              <th className="p-2 text-left border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="p-2 border-b">{job.title}</td>
                <td className="p-2 border-b">{job.company_name}</td>
                <td className="p-2 border-b">{job.location}</td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminDashboard
