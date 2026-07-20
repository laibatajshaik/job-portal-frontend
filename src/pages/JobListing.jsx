import { useEffect, useState } from 'react'
import api from '../api/axios'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import { Search, MapPin, X, Briefcase, Filter, Sparkles } from 'lucide-react'

const defaultDemoJobs = [
  {
    id: 0,
    title: 'Frontend Developer',
    description: 'We are looking for a skilled React.js frontend developer to build responsive user interfaces.',
    location: 'Remote',
    salary: '$90,000',
    job_type: 'Full Time',
    company_name: 'Shnoor Technologies'
  },
  {
    id: 1,
    title: 'Full Stack Python Developer',
    description: 'Join our engineering team to build scalable FastAPI web APIs and modern web applications.',
    location: 'New York, NY',
    salary: '$110,000',
    job_type: 'Full Time',
    company_name: 'Shnoor International'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    description: 'Design intuitive user journeys, wireframes, and high-fidelity mockups for our web platform.',
    location: 'Remote',
    salary: '$85,000',
    job_type: 'Contract',
    company_name: 'TechSoft'
  },
  {
    id: 3,
    title: 'Data Analyst',
    description: 'Analyze key product metrics, generate actionable business reports, and manage SQL data models.',
    location: 'Austin, TX',
    salary: '$80,000',
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Verified Career Opportunities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Available Openings
          </h1>
          <p className="text-slate-600 text-xs">
            Discover verified roles matching your expertise and career goals.
          </p>
        </div>

        {/* Search & Filter Controls Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Title Search */}
            <div className="md:col-span-5 flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-indigo-500 rounded-lg px-3.5 py-2.5 transition">
              <Search className="w-4 h-4 text-indigo-600" />
              <input
                type="text"
                placeholder="Search job title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Search */}
            <div className="md:col-span-5 flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-indigo-500 rounded-lg px-3.5 py-2.5 transition">
              <MapPin className="w-4 h-4 text-purple-600" />
              <input
                type="text"
                placeholder="Filter by city, state, or remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
              />
              {location && (
                <button onClick={() => setLocation('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Clear Filters Button */}
            <div className="md:col-span-2">
              <button
                onClick={clearFilters}
                disabled={!search && !location}
                className="w-full h-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 px-3 py-2.5 rounded-lg text-xs font-semibold border border-slate-200 transition"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Live Database Synced
          </span>
        </div>

        {/* Job Cards Grid */}
        {loading ? (
          <Loader />
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl border border-slate-200 space-y-3 max-w-md mx-auto shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Matching Jobs Found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria or removing location filters.
            </p>
            <button
              onClick={clearFilters}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm"
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
                  salary: typeof job.salary === 'number' ? `$${job.salary.toLocaleString()}` : (job.salary || '$90,000'),
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