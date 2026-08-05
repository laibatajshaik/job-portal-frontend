import { Link } from 'react-router-dom'
import { MapPin, Building, ArrowUpRight, Calendar } from 'lucide-react'

function JobCard({ job }) {
  if (!job) return null
  const companyName = job.company_name || 'Demo Company'
  const isFullTime = (job.job_type || '').toLowerCase().includes('full')
  const isExpired = job.expiry_date && new Date(job.expiry_date) < new Date(new Date().setHours(0,0,0,0))

  return (
    <div className="bg-white border border-[#0066FF]/20 hover:border-[#0066FF]/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-full">
      <div className="space-y-4">
        {}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#003366] leading-snug line-clamp-1">
              {job.title || 'Job Opening'}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
              <Building className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{companyName}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isExpired && (
              <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-rose-200 shadow-sm">
                Expired
              </span>
            )}
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shrink-0 shadow-sm ${
                isFullTime
                  ? 'bg-[#003366] text-white'
                  : 'bg-[#0066FF]/10 text-[#003366] border border-[#0066FF]/30'
              }`}
            >
              {job.job_type || 'Full Time'}
            </span>
          </div>
        </div>

        {}
        {job.description && (
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed font-medium">
            {job.description}
          </p>
        )}

        {job.expiry_date && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mt-1">
            <Calendar className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Expires: {job.expiry_date}</span>
          </div>
        )}

        {}
        <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{job.location || 'Remote'}</span>
          </div>

          <div className="text-[#003366] font-extrabold bg-[#0066FF]/10 px-3 py-1 rounded border border-[#0066FF]/35">
            <span>{job.salary || '₹9,00,000'}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full inline-flex items-center justify-center gap-1 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold py-3 px-5 rounded-lg shadow transition"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default JobCard
