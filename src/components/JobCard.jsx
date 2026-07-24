import { Link } from 'react-router-dom'
import { MapPin, Building, ArrowUpRight } from 'lucide-react'

function JobCard({ job }) {
  if (!job) return null
  const companyName = job.company_name || 'Demo Company'
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')

  return (
    <div className="bg-white border border-[#DDB892]/20 hover:border-[#B58463]/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Title & Type */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#4D3A2F] leading-snug line-clamp-1">
              {job.title || 'Job Opening'}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Building className="w-3.5 h-3.5 text-[#B58463]" />
              <span>{companyName}</span>
            </div>
          </div>

          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shrink-0 shadow-sm ${
              isFullTime
                ? 'bg-[#4D3A2F] text-[#DDB892]'
                : 'bg-[#DDB892]/20 text-[#4D3A2F] border border-[#DDB892]/30'
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

          <div className="text-[#4D3A2F] font-extrabold bg-[#DDB892]/20 px-3 py-1 rounded border border-[#DDB892]/30">
            <span>{job.salary || '₹9,00,000'}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full inline-flex items-center justify-center gap-1 bg-[#4D3A2F] hover:bg-[#3d2e25] text-[#DDB892] text-xs font-bold py-3 px-5 rounded-lg shadow transition"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default JobCard
