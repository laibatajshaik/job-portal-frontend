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
    <div className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between">
      <div>
        {/* Header: Logo + Title + Job Type Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-base shadow-inner group-hover:scale-105 transition-transform">
              {initials}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>{companyName}</span>
              </div>
            </div>
          </div>

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap ${
              isFullTime
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : isContract
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
            }`}
          >
            {job.job_type || 'Full Time'}
          </span>
        </div>

        {/* Description snippet */}
        {job.description && (
          <p className="text-slate-400 text-xs line-clamp-2 mb-5 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Details: Location + Salary */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>{job.location || 'Remote'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{job.salary || '$90,000 / yr'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>Actively Hiring</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 group/btn shadow-sm"
        >
          <span>View Details & Apply</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

export default JobCard

