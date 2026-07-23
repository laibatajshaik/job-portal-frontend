import { useEffect, useState } from 'react'
import api from '../api/axios'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import { Search, MapPin, X, Briefcase, Filter } from 'lucide-react'

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

function JobListing() {
  const [jobs, setJobs] = useState(defaultDemoJobs)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/')
      if (Array.isArray(res.data) && res.data.length > 0) {
        setJobs(res.data)
      }
    } catch (err) {
      console.log('Using initial jobs fallback:', err)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setLocation('')
  }

  const filteredJobs = jobs.filter((job) => {
    const matchTitle = (job.title || '')
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchLocation = (job.location || '')
      .toLowerCase()
      .includes(location.toLowerCase())

    return matchTitle && matchLocation
  })

  const formatSalary = (salary) => {
    if (!salary) return '₹90,000'
    if (typeof salary === 'number') return `₹${salary.toLocaleString('en-IN')}`
    const strSal = String(salary).trim()
    if (strSal.startsWith('₹')) return strSal
    if (strSal.startsWith('$')) return `₹${strSal.substring(1)}`
    return `₹${strSal}`
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* STYLED HONEY ORANGE BANNER CARD (From mockup illustration) */}
        <div className="bg-gradient-to-r from-[#FFA726] to-[#FFB84C] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <div className="space-y-1 z-10">
            <h2 className="text-lg font-medium opacity-90">Available Openings</h2>
            <p className="text-2xl font-bold tracking-tight">Discover roles matching your expertise</p>
          </div>
        </div>

        {/* Search & Filter Controls Card */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Title Search */}
            <div className="md:col-span-5 flex items-center gap-2.5 bg-slate-50 border border-slate-100 focus-within:border-[#FFA726] rounded-full px-5 py-3 transition">
              <Search className="w-4 h-4 text-[#FFA726]" />
              <input
                type="text"
                placeholder="Search job title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-semibold"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-650">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Search */}
            <div className="md:col-span-5 flex items-center gap-2.5 bg-slate-50 border border-slate-100 focus-within:border-[#FFA726] rounded-full px-5 py-3 transition">
              <MapPin className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by city, state, or remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-semibold"
              />
              {location && (
                <button onClick={() => setLocation('')} className="text-slate-400 hover:text-slate-650">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Clear Filters Button */}
            <div className="md:col-span-2">
              <button
                onClick={clearFilters}
                disabled={!search && !location}
                className="w-full h-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 px-3 py-3 rounded-full text-xs font-semibold border border-slate-100 transition"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <span>
            Showing <strong className="text-[#FFA726] font-bold">{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
          </span>
        </div>

        {/* Job Cards Grid */}
        {loading ? (
          <Loader />
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-3xl border border-slate-100 space-y-3 max-w-md mx-auto shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center mx-auto">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Matching Jobs Found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria or removing location filters.
            </p>
            <button
              onClick={clearFilters}
              className="bg-[#FFA726] hover:bg-[#FB8C00] text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={index}
                job={{
                  id: index,
                  title: job.title,
                  description: job.description,
                  location: job.location,
                  salary: formatSalary(job.salary),
                  job_type: job.job_type,
                  company_name: job.company_name || "Demo Company"
                }}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default JobListing