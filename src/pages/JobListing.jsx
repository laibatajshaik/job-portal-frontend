import { useEffect, useState } from 'react'
import api from '../api/axios'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'

function JobListing() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)

    try {
      const res = await api.get('/jobs/')
      setJobs(res.data)
    } catch (err) {
      console.log(err)
      setJobs([])
    }

    setLoading(false)
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
                salary: job.salary,
                job_type: job.job_type,
                company_name: "Demo Company"
              }}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default JobListing