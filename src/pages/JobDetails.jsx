import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'

const defaultDemoJobs = [
  {
    id: 0,
    title: 'Frontend Developer',
    description: 'We are looking for a skilled React.js frontend developer to build responsive user interfaces.',
    location: 'Remote',
    salary: '$90,000',
    job_type: 'Full Time',
    company_name: 'Shnoor Technologies'
  },
  {
    id: 1,
    title: 'Full Stack Python Developer',
    description: 'Join our engineering team to build scalable FastAPI web APIs and modern web applications.',
    location: 'New York, NY',
    salary: '$110,000',
    job_type: 'Full Time',
    company_name: 'Shnoor International'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    description: 'Design intuitive user journeys, wireframes, and high-fidelity mockups for our web platform.',
    location: 'Remote',
    salary: '$85,000',
    job_type: 'Contract',
    company_name: 'TechSoft'
  },
  {
    id: 3,
    title: 'Data Analyst',
    description: 'Analyze key product metrics, generate actionable business reports, and manage SQL data models.',
    location: 'Austin, TX',
    salary: '$80,000',
    job_type: 'Full Time',
    company_name: 'Analytics Hub'
  }
]

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
      if (res.data && res.data.job) {
        setJob(res.data.job)
        setLoading(false)
        return
      }
    } catch (err) {
      console.log(err)
    }
    const idx = parseInt(id, 10) || 0
    setJob(defaultDemoJobs[idx] || defaultDemoJobs[0])
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
