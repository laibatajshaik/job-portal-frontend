import { Link } from 'react-router-dom'
import { MapPin, Building } from 'lucide-react'

function JobCard({ job }) {
  if (!job) return null
  const companyName = job.company_name || 'Demo Company'
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')

  return (
    <div className="bg-white border border-slate-250/50 hover:border-indigo-400/80 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-900/5 flex flex-col justify-between">
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
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shrink-0 ${
              isFullTime
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-100/50'
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
        <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{job.location || 'Remote'}</span>
          </div>

          <div className="text-indigo-650 font-bold bg-indigo-50/50 px-2.5 py-1 rounded-lg border border-indigo-100/20">
            <span>{job.salary || '₹9,00,000'}</span>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="mt-5">
        <Link
          to={`/jobs/${job.id ?? 0}`}
          className="w-full block text-center bg-slate-900 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition duration-150 uppercase tracking-wider"
        >
          View Job Details
        </Link>
      </div>
    </div>
  )
}

export default JobCard

