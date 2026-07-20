import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Award,
  Code,
  LineChart,
  Palette,
  Megaphone
} from 'lucide-react'

function Home() {
  const categories = [
    { title: 'Software Engineering', count: '140+ Open Roles', icon: Code, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { title: 'Product & Design', count: '85+ Open Roles', icon: Palette, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { title: 'Data & Analytics', count: '62+ Open Roles', icon: LineChart, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { title: 'Sales & Marketing', count: '45+ Open Roles', icon: Megaphone, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  ]

  const featuredJobs = [
    {
      id: 0,
      title: 'Frontend Developer',
      company: 'Shnoor Technologies',
      location: 'Remote',
      type: 'Full Time',
      salary: '$90,000 / yr',
      tags: ['React', 'JavaScript', 'TailwindCSS']
    },
    {
      id: 1,
      title: 'Full Stack Python Developer',
      company: 'Shnoor International',
      location: 'New York, NY',
      type: 'Full Time',
      salary: '$110,000 / yr',
      tags: ['Python', 'FastAPI', 'PostgreSQL']
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'TechSoft',
      location: 'Remote',
      type: 'Contract',
      salary: '$85,000 / yr',
      tags: ['Figma', 'Prototyping', 'UI/UX']
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">

      {/* HERO SECTION */}
      <section id="home" className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/70 via-slate-50 to-slate-50">
        
        <div className="max-w-4xl mx-auto text-center space-y-5">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Modern Career & Hiring Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Find Your Dream Job <br />
            <span className="text-indigo-600">Accelerate Your Career</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Discover verified remote & tech opportunities, connect directly with recruiters, and apply with 1-click ATS profiles.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-md flex flex-col sm:flex-row items-center gap-2">
              
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-1 w-full">
                <Search className="w-4 h-4 text-indigo-600" />
                <input
                  type="text"
                  placeholder="Job title or skill..."
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-1 w-full">
                <MapPin className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Location or remote..."
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                />
              </div>

              <Link
                to="/jobs"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 pt-2">
            <span className="font-semibold text-slate-700">Popular:</span>
            <Link to="/jobs" className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition">
              React Developer
            </Link>
            <Link to="/jobs" className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition">
              Python FastAPI
            </Link>
            <Link to="/jobs" className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition">
              UI/UX Designer
            </Link>
          </div>

        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-8 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          
          <div className="p-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">500+</h3>
            <p className="text-xs text-slate-500 font-medium">Active Jobs</p>
          </div>

          <div className="p-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">120+</h3>
            <p className="text-xs text-slate-500 font-medium">Companies</p>
          </div>

          <div className="p-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">2,500+</h3>
            <p className="text-xs text-slate-500 font-medium">Applicants Hired</p>
          </div>

          <div className="p-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">98%</h3>
            <p className="text-xs text-slate-500 font-medium">Match Accuracy</p>
          </div>

        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Top Categories</h2>
          <p className="text-slate-600 text-xs max-w-md mx-auto">
            Browse through specialized job roles in tech, product, and design.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon
            return (
              <Link
                key={idx}
                to="/jobs"
                className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition shadow-sm hover:shadow-md"
              >
                <div className={`w-10 h-10 rounded-lg ${cat.color} border flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">{cat.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{cat.count}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Openings</h2>
            <p className="text-slate-500 text-xs mt-0.5">Hand-picked remote & high-growth job opportunities.</p>
          </div>

          <Link
            to="/jobs"
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {job.type}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{job.salary}</span>
                </div>
                
                <h3 className="text-base font-bold text-slate-900 mb-0.5">{job.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{job.company} • {job.location}</p>

                <div className="flex flex-wrap gap-1 mb-5">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/jobs/${job.id}`}
                className="w-full text-center bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How It Works</h2>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Simple steps to kickstart your application or hire talent.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Register Account</h3>
            <p className="text-xs text-slate-500">
              Sign up as a Job Seeker or Recruiter Manager.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Complete Profile</h3>
            <p className="text-xs text-slate-500">
              Add your skills, resume, and experience details.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-pink-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Apply to Jobs</h3>
            <p className="text-xs text-slate-500">
              Explore verified listings and submit applications.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900">Track & Get Hired</h3>
            <p className="text-xs text-slate-500">
              Monitor application progress in real time.
            </p>
          </div>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-indigo-900 text-white p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black">Ready to Take the Next Step?</h2>
            <p className="text-indigo-200 text-xs max-w-lg">
              Create your profile today to browse top tech jobs or start hiring talent immediately.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/register"
              className="bg-white text-indigo-900 hover:bg-slate-100 font-bold px-5 py-2.5 rounded-lg text-xs transition shadow"
            >
              Get Started
            </Link>
            <Link
              to="/jobs"
              className="bg-indigo-800 text-white hover:bg-indigo-700 border border-indigo-700 font-bold px-5 py-2.5 rounded-lg text-xs transition"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home