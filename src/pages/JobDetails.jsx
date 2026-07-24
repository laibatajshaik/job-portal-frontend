import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { MapPin, Building, Briefcase, ArrowLeft, CheckCircle2 } from 'lucide-react'

const defaultDemoJobs = [
  {
    id: 0,
    title: 'Frontend Developer',
    description: 'We are looking for a skilled React.js frontend developer to build responsive user interfaces.',
    location: 'Bengaluru, KA',
    salary: '₹9,00,000',
    job_type: 'Full Time',
    company_name: 'Shnoor Technologies'
  },
  {
    id: 1,
    title: 'Full Stack Python Developer',
    description: 'Join our engineering team to build scalable FastAPI web APIs and modern web applications.',
    location: 'Mumbai, MH',
    salary: '₹11,50,000',
    job_type: 'Full Time',
    company_name: 'Shnoor International'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    description: 'Design intuitive user journeys, wireframes, and high-fidelity mockups for our web platform.',
    location: 'Hyderabad, TS',
    salary: '₹8,50,000',
    job_type: 'Contract',
    company_name: 'TechSoft'
  },
  {
    id: 3,
    title: 'Data Analyst',
    description: 'Analyze key product metrics, generate actionable business reports, and manage SQL data models.',
    location: 'Pune, MH',
    salary: '₹8,00,000',
    job_type: 'Full Time',
    company_name: 'Analytics Hub'
  }
]

function JobDetails() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/jobs/${id}`)
      if (res.data && res.data.job) {
        setJob(res.data.job)
        setLoading(false)
        return
      }
    } catch (err) {
      console.log(err)
    }
    const idx = parseInt(id, 10) || 0
    setJob(defaultDemoJobs[idx] || defaultDemoJobs[0])
    setLoading(false)
  }

  const formatSalary = (salary) => {
    if (!salary) return '₹90,000'
    if (typeof salary === 'number') return `₹${salary.toLocaleString('en-IN')}`
    const strSal = String(salary).trim()
    if (strSal.startsWith('₹')) return strSal
    if (strSal.startsWith('$')) return `₹${strSal.substring(1)}`
    return `₹${strSal}`
  }

  if (loading) return <Loader />
  if (!job) return <p className="text-center mt-10">Job not found</p>

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back Link */}
        <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#E87552] transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Job Listings</span>
        </Link>

        {/* Main Job Detail Card */}
        <div className="bg-white border border-[#E87552]/20 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#3B2525]">{job.title}</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <Building className="w-4 h-4 text-[#E87552]" />
                <span className="font-bold text-slate-700">{job.company_name || 'Demo Company'}</span>
                <span>•</span>
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{job.location || 'Remote'}</span>
              </div>
            </div>

            <span className="self-start px-3 py-1 rounded-full bg-[#3B2525] text-white text-xs font-bold shadow-sm">
              {job.job_type || 'Full Time'}
            </span>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-[#E87552]/15">
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Offered Salary</p>
              <p className="text-sm font-black text-[#3B2525] mt-0.5">{formatSalary(job.salary)}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Job Type</p>
              <p className="text-sm font-black text-slate-800 mt-0.5">{job.job_type || 'Full Time'}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#3B2525]">Job Description</h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line font-medium">
              {job.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100">
            {user && user.role === 'user' ? (
              <Link
                to={`/apply/${job.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3B2525] hover:bg-[#2e1d1d] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition uppercase tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E87552]" />
                <span>Apply for this Position</span>
              </Link>
            ) : !user ? (
              <div className="bg-slate-100 p-4 rounded-xl text-center text-xs text-slate-650 font-semibold">
                Please{' '}
                <Link to="/login" className="text-[#E87552] font-black hover:underline">
                  Sign In
                </Link>{' '}
                to apply for this position.
              </div>
            ) : (
              <p className="text-xs text-slate-450 font-bold italic">
                Logged in as Manager/Admin. Candidate applications are submitted by Job Seekers.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}

export default JobDetails
