import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import JobCard from '../components/JobCard'
import { Search, MapPin, ArrowRight, Briefcase, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react'

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
    <div className="min-h-screen bg-[#F7F5F0] text-slate-800 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-16">

        {/* SECTION 1: HERO / HOME SECTION */}
        <section className="bg-gradient-to-br from-[#E87552] to-[#3B2525] text-white rounded-[36px] py-20 px-6 sm:px-12 text-center relative overflow-hidden shadow-xl shadow-[#3B2525]/10">
          
          {/* Abstract background circles */}
          <div className="absolute w-96 h-96 rounded-full bg-white/5 -top-20 -right-20 pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full bg-white/5 -bottom-10 -left-10 pointer-events-none" />
          <div className="absolute w-60 h-60 rounded-full bg-white/10 bottom-20 right-20 pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20">
              <Briefcase className="w-3.5 h-3.5" />
              Welcome to Shnoor JobPortal
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white uppercase">
              Find your next <br />
              <span className="text-[#3B2525] bg-white px-3 py-1 rounded-2xl font-black text-3xl sm:text-5xl mt-2 inline-block">
                Dream Career
              </span>
            </h1>

            <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed font-semibold">
              Search open job opportunities across technology, design, and business with top global companies.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="pt-4 max-w-3xl mx-auto">
              <div className="bg-[#3B2525]/35 p-3 rounded-[28px] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center gap-3">
                
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 focus-within:border-white/40 focus-within:bg-white/15 rounded-2xl px-4 py-3.5 flex-1 w-full transition">
                  <Search className="w-4 h-4 text-white/60 shrink-0" />
                  <input
                    type="text"
                    placeholder="Job title, skill, or keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-white/50 focus:outline-none w-full font-bold"
                  />
                </div>

                <div className="flex items-center gap-2 bg-white/10 border border-white/10 focus-within:border-white/40 focus-within:bg-white/15 rounded-2xl px-4 py-3.5 flex-1 w-full transition">
                  <MapPin className="w-4 h-4 text-white/60 shrink-0" />
                  <input
                    type="text"
                    placeholder="City, state, or remote..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-white/50 focus:outline-none w-full font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-white hover:bg-slate-100 text-[#3B2525] font-extrabold text-xs px-8 py-4 rounded-2xl transition shrink-0 shadow-md uppercase tracking-wider"
                >
                  Search Jobs
                </button>

              </div>
            </form>
          </div>
        </section>

        {/* SECTION 2: SERVICES SECTION */}
        <section className="bg-white rounded-3xl border border-[#E87552]/20 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[#E87552] text-[10px] font-black uppercase tracking-widest bg-[#E87552]/10 px-4 py-1.5 rounded-full">
              What We Offer
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3B2525] tracking-tight uppercase">
              Our Premium Services
            </h2>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              We leverage modern technology to simplify recruitment pipelines for both recruiters and job seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="bg-[#F7F5F0] p-6 rounded-2xl border border-[#E87552]/10 space-y-4 hover:shadow transition duration-200">
              <div className="w-10 h-10 rounded-xl bg-white text-[#E87552] flex items-center justify-center shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-[#3B2525]">ATS Score Matching</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Recruiters see auto-calculated applicant matches based on CV data and experience levels, filtering candidates instantly.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-[#F7F5F0] p-6 rounded-2xl border border-[#E87552]/10 space-y-4 hover:shadow transition duration-200">
              <div className="w-10 h-10 rounded-xl bg-white text-[#E87552] flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-[#3B2525]">Direct Safe Submissions</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Submit applications along with direct CV Google Drive or Dropbox links that render smoothly inside inline panel viewers.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-[#F7F5F0] p-6 rounded-2xl border border-[#E87552]/10 space-y-4 hover:shadow transition duration-200">
              <div className="w-10 h-10 rounded-xl bg-white text-[#E87552] flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-[#3B2525]">Horizontal Dashboards</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Clean, state-of-the-art horizontal recruitment analytics views tailored for managers, admins, and candidates.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 3: ABOUT US SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl border border-[#E87552]/20 p-8 sm:p-12 shadow-sm">
          
          {/* About text */}
          <div className="space-y-6">
            <span className="text-[#E87552] text-[10px] font-black uppercase tracking-widest bg-[#E87552]/10 px-4 py-1.5 rounded-full inline-block">
              About JobPortal
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#3B2525] tracking-tight uppercase leading-tight">
              Bridging the gap between <br />
              talent and opportunity
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Shnoor JobPortal simplifies talent acquisition and job hunting through transparent, secure, and modern recruitment tools. We believe that job hunting shouldn't be tedious. Our platform gives candidates a place to present their capabilities and recruiter teams the analytics they need to find their next placement.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center sm:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#E87552]">10k+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Candidates</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#E87552]">500+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Published Jobs</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#E87552]">98%</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Graphical badge layout */}
          <div className="bg-[#F7F5F0] rounded-3xl border border-[#E87552]/15 p-8 flex flex-col justify-center space-y-6 relative overflow-hidden h-full min-h-[300px]">
            <div className="absolute w-60 h-60 rounded-full bg-[#E87552]/5 -top-20 -right-20 pointer-events-none" />
            <div className="space-y-2 relative z-10">
              <h3 className="font-extrabold text-lg text-[#3B2525] uppercase">Join as a Candidate or Recruiter</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Unlock instant access to dream careers or publish active openings on our dashboard console with real-time analytics.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 relative z-10">
              <Link
                to="/register"
                className="bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition"
              >
                Sign Up Now
              </Link>
              <Link
                to="/jobs"
                className="bg-white hover:bg-slate-50 text-[#3B2525] border border-[#E87552]/25 text-xs font-bold px-6 py-3 rounded-xl transition"
              >
                Browse Listings
              </Link>
            </div>
          </div>

        </section>

        {/* SECTION 4: DIRECT JOBS LISTING */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-slate-200/50 pb-4">
            <div>
              <h2 className="text-xl font-black text-[#3B2525] tracking-tight">LATEST JOB OPENINGS</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-bold">Handpicked opportunities updated daily</p>
            </div>
            <Link 
              to="/jobs" 
              className="text-xs font-bold text-[#E87552] hover:text-[#d15f3e] flex items-center gap-1 bg-[#E87552]/5 border border-[#E87552]/15 px-4 py-2.5 rounded-full transition shadow-sm"
            >
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