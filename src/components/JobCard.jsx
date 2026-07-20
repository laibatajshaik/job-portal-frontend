import { Link } from 'react-router-dom'
import { MapPin, Building } from 'lucide-react'

function JobCard({ job }) {
  if (!job) return null
  const companyName = job.company_name || 'Demo Company'
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')

  return (
    <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-xl p-4 transition shadow-sm flex flex-col justify-between">
      <div>
        {/* Title & Type */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 line-clamp-1">
              {job.title || 'Job Opening'}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{companyName}</span>
            </div>
          </div>

          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${
              isFullTime
                ? 'bg-blue-50 text-blue-700'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {job.job_type || 'Full Time'}
          </span>
        </div>

        {/* Short Description */}
        {job.description && (
          <p className="text-slate-600 text-xs line-clamp-2 my-2 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Location & Salary */}
        <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100 mt-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location || 'Remote'}</span>
          </div>

          <div className="text-emerald-700 font-bold">
            <span>{job.salary || '₹9,00,000'}</span>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="mt-3">
        <Link
          to={`/jobs/${job.id ?? 0}`}
          className="w-full block text-center bg-slate-900 hover:bg-blue-600 text-white font-medium text-xs py-2 rounded-lg transition"
        >
          View Job Details
        </Link>
      </div>
    </div>
  )
}

export default JobCard

