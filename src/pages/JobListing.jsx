import { useEffect, useState } from 'react'
import api from '../api/axios'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'

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

function JobListing() {
  const [jobs, setJobs] = useState(defaultDemoJobs)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/')
      if (Array.isArray(res.data) && res.data.length > 0) {
        setJobs(res.data)
      }
    } catch (err) {
      console.log('Using initial jobs fallback:', err)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchTitle = (job.title || '')
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchLocation = (job.location || '')
      .toLowerCase()
      .includes(location.toLowerCase())

    return matchTitle && matchLocation
  })

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-4">
        Available Jobs
      </h2>

      <div className="flex gap-3 mb-6">

        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />

        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />

      </div>

      {loading ? (
        <Loader />
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-600">
          No jobs found.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={index}
              job={{
                id: index,
                title: job.title,
                description: job.description,
                location: job.location,
                salary: typeof job.salary === 'number' ? `$${job.salary.toLocaleString()}` : (job.salary || '$90,000'),
                job_type: job.job_type,
                company_name: job.company_name || "Demo Company"
              }}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default JobListing