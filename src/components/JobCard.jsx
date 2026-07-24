import { Link } from 'react-router-dom'
import { MapPin, Building, ArrowUpRight } from 'lucide-react'

function JobCard({ job }) {
  if (!job) return null
  const companyName = job.company_name || 'Demo Company'
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')

  return (
    <div className="bg-white border border-slate-100 hover:border-[#0066FF]/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Title & Type */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-[#003366] leading-snug line-clamp-1">
              {job.title || 'Job Opening'}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Building className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{companyName}</span>
            </div>
          </div>

          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 shadow-sm ${
              isFullTime
                ? 'bg-[#003366] text-white'
                : 'bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20'
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

          <div className="text-[#0066FF] font-extrabold bg-[#0066FF]/10 px-3 py-1 rounded-full border border-[#0066FF]/20">
            <span>{job.salary || '₹9,00,000'}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full inline-flex items-center justify-center gap-1 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold py-3 px-5 rounded-2xl shadow-sm hover:shadow transition"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default JobCard
