import { Link } from 'react-router-dom'
import { MapPin, DollarSign, Clock, ArrowRight, Building } from 'lucide-react'

function JobCard({ job }) {
  // Generate initials for company logo badge
  const companyName = job.company_name || 'Demo Company'
  const initials = companyName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  // Job type badge styling
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')
  const isContract = (job.job_type || '').toLowerCase().includes('contract')

  return (
    <div className="group bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Header: Logo + Title + Job Type Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
              {initials}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{companyName}</span>
              </div>
            </div>
          </div>

          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
              isFullTime
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isContract
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}
          >
            {job.job_type || 'Full Time'}
          </span>
        </div>

        {/* Description snippet */}
        {job.description && (
          <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Details: Location + Salary */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location || 'Remote'}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{job.salary || '$90,000'}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>Active</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-2">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-xs transition"
        >
          <span>View Details & Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default JobCard

