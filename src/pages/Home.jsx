import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import JobCard from '../components/JobCard'
import { Search, MapPin, Briefcase, ArrowRight, Code, Palette, LineChart, Megaphone } from 'lucide-react'

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

  const categories = [
    { title: 'Software Engineering', count: '140+ jobs', icon: Code },
    { title: 'Product & Design', count: '85+ jobs', icon: Palette },
    { title: 'Data & Analytics', count: '62+ jobs', icon: LineChart },
    { title: 'Sales & Marketing', count: '45+ jobs', icon: Megaphone },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

      {/* HERO / SEARCH SECTION */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find your next job
          </h1>

          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Search open job opportunities across technology, design, and business.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-3xl mx-auto">
            <div className="bg-white p-2 rounded-xl border border-slate-300 shadow-sm flex flex-col sm:flex-row items-center gap-2">
              
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Job title, skill, or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-1 w-full">
                <MapPin className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="City, state, or remote..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition"
              >
                Search Jobs
              </button>

            </div>
          </form>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon
            return (
              <Link
                key={idx}
                to="/jobs"
                className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-400 transition shadow-sm flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <IconComp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{cat.title}</h3>
                  <p className="text-[11px] text-slate-500">{cat.count}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* DIRECT JOBS LISTING */}
      <section className="py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Latest Job Openings</h2>
          <Link to="/jobs" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <span>View all jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job, index) => (
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
      </section>

    </div>
  )
}

export default Home