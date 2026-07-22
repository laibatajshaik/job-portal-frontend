import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import JobCard from '../components/JobCard'
import { Search, MapPin, ArrowRight } from 'lucide-react'

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

function Home() {
  const [jobs, setJobs] = useState(defaultDemoJobs)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

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

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`/jobs?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`)
  }

  const formatSalary = (salary) => {
    if (!salary) return '₹9,00,000'
    if (typeof salary === 'number') return `₹${salary.toLocaleString('en-IN')}`
    const strSal = String(salary).trim()
    if (strSal.startsWith('₹')) return strSal
    if (strSal.startsWith('$')) return `₹${strSal.substring(1)}`
    return `₹${strSal}`
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* HERO / SEARCH SECTION */}
        <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl py-16 px-6 sm:px-12 text-center relative overflow-hidden shadow-xl shadow-indigo-950/10">
          {/* Subtle Decorative Backdrop Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
          
          <div className="relative z-10 space-y-5 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/20">
              Welcome to Shnoor JobPortal
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Find your next job
            </h1>

            <p className="text-slate-350 text-sm max-w-lg mx-auto leading-relaxed">
              Search open job opportunities across technology, design, and business.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="pt-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-lg flex flex-col md:flex-row items-center gap-2">
                
                <div className="flex items-center gap-2 bg-white/5 border border-white/5 focus-within:bg-white/10 rounded-xl px-4 py-3 flex-1 w-full transition">
                  <Search className="w-4 h-4 text-indigo-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Job title, skill, or keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full font-medium"
                  />
                </div>

                <div className="flex items-center gap-2 bg-white/5 border border-white/5 focus-within:bg-white/10 rounded-xl px-4 py-3 flex-1 w-full transition">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="City, state, or remote..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition shadow-md shadow-indigo-600/20 shrink-0"
                >
                  Search Jobs
                </button>

              </div>
            </form>
          </div>
        </section>

        {/* DIRECT JOBS LISTING */}
        <section className="mt-12 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Latest Job Openings</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Handpicked opportunities updated daily</p>
            </div>
            <Link to="/jobs" className="text-xs font-bold text-indigo-600 hover:text-indigo-750 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition">
              <span>View all jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <JobCard
                key={index}
                job={{
                  id: job.id ?? index,
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
        </section>

      </div>
    </div>
  )
}

export default Home