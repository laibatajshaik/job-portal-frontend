import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'

function JobDetails() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/jobs/${id}`)
      setJob(res.data.job)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  if (loading) return <Loader />
  if (!job) return <p className="text-center mt-10">Job not found</p>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded mt-6">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-600 mt-1">{job.company_name}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">{job.job_type}</p>
      <p className="text-gray-800 mt-2 font-semibold">Salary: {job.salary}</p>
      <div className="mt-4">
        <h3 className="font-semibold mb-1">Job Description</h3>
        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
      </div>
      {user && user.role === 'user' ? (
        <Link
          to={`/apply/${job.id}`}
          className="inline-block mt-6 bg-blue-700 text-white px-5 py-2 rounded"
        >
          Apply Now
        </Link>
      ) : !user ? (
        <p className="mt-6 text-gray-600">
          <Link to="/login" className="text-blue-700">Login</Link> to apply for this job.
        </p>
      ) : null}
    </div>
  )
}

export default JobDetails
