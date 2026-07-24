import { Link } from 'react-router-dom'
import { MapPin, Building, ArrowUpRight } from 'lucide-react'

function JobCard({ job }) {
  if (!job) return null
  const companyName = job.company_name || 'Demo Company'
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')

  return (
    <div className="bg-white border border-[#E87552]/20 hover:border-[#E87552]/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Title & Type */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#3B2525] leading-snug line-clamp-1">
              {job.title || 'Job Opening'}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Building className="w-3.5 h-3.5 text-[#E87552]" />
              <span>{companyName}</span>
            </div>
          </div>

          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shrink-0 shadow-sm ${
              isFullTime
                ? 'bg-[#3B2525] text-white'
                : 'bg-[#E87552]/10 text-[#3B2525] border border-[#E87552]/30'
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

          <div className="text-[#3B2525] font-extrabold bg-[#E87552]/10 px-3 py-1 rounded border border-[#E87552]/35">
            <span>{job.salary || '₹9,00,000'}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full inline-flex items-center justify-center gap-1 bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold py-3 px-5 rounded-lg shadow transition"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default JobCard
