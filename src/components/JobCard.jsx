import { Link } from 'react-router-dom'

function JobCard({ job }) {
  return (
    <div className="bg-white border border-gray-300 rounded p-4 mb-4">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company_name}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">{job.job_type}</p>
      <p className="text-gray-800 mt-2">Salary: {job.salary}</p>
      <Link
        to={`/jobs/${job.id}`}
        className="inline-block mt-3 bg-blue-700 text-white px-4 py-1 rounded"
      >
        View Details
      </Link>
    </div>
  )
}

export default JobCard
