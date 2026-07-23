import { Link } from 'react-router-dom'
import { MapPin, Building } from 'lucide-react'

function JobCard({ job }) {
  if (!job) return null
  const companyName = job.company_name || 'Demo Company'
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/5 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Title & Type */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-1">
              {job.title || 'Job Opening'}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{companyName}</span>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shrink-0 ${
              isFullTime
                ? 'bg-[#FFA726] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {job.job_type || 'Full Time'}
          </span>
        </div>

        {/* Short Description */}
        {job.description && (
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed font-medium">
            {job.description}
          </p>
        )}

        {/* Location & Salary */}
        <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{job.location || 'Remote'}</span>
          </div>

          <div className="text-[#FFA726] font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <span>{job.salary || '₹9,00,000'}</span>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="mt-5">
        <Link
          to={`/jobs/${job.id ?? 0}`}
          className="w-full block text-center bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3 rounded-full shadow-md transition duration-150 uppercase tracking-wider"
        >
          View Job Details
        </Link>
      </div>
    </div>
  )
}

export default JobCard
