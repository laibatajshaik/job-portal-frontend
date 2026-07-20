import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  UserCheck, 
  Award,
  Code,
  LineChart,
  Palette,
  Megaphone
} from 'lucide-react'

function Home() {
  const categories = [
    { title: 'Software Engineering', count: '140+ Open Roles', icon: Code, color: 'from-indigo-500 to-blue-600' },
    { title: 'Product & Design', count: '85+ Open Roles', icon: Palette, color: 'from-purple-500 to-pink-600' },
    { title: 'Data & Analytics', count: '62+ Open Roles', icon: LineChart, color: 'from-emerald-500 to-teal-600' },
    { title: 'Sales & Marketing', count: '45+ Open Roles', icon: Megaphone, color: 'from-amber-500 to-orange-600' },
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
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-mesh selection:bg-indigo-500 selection:text-white">

      {/* HERO SECTION */}
      <section id="home" className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>Next-Gen Recruitment Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Find Your Dream Job <br />
            <span className="text-gradient">Accelerate Your Career</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Discover thousands of high-paying tech jobs, connect with top hiring managers, and apply seamlessly with 1-click ATS matching.
          </p>

          {/* Search Box */}
          <div className="pt-6 max-w-3xl mx-auto">
            <div className="p-2 sm:p-3 rounded-2xl glass-card border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center gap-3">
              
              <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 flex-1 w-full">
                <Search className="w-5 h-5 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or skills..."
                  className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 flex-1 w-full">
                <MapPin className="w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  placeholder="City, state, or remote..."
                  className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
                />
              </div>

              <Link
                to="/jobs"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 pt-4">
            <span className="font-semibold text-slate-300">Popular Searches:</span>
            <Link to="/jobs" className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300 transition">
              React Developer
            </Link>
            <Link to="/jobs" className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300 transition">
              Python FastAPI
            </Link>
            <Link to="/jobs" className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300 transition">
              UI/UX Designer
            </Link>
          </div>

        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-10 border-y border-slate-800/80 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="p-4 space-y-1">
            <div className="inline-flex p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-white">500+</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active Job Postings</p>
          </div>

          <div className="p-4 space-y-1">
            <div className="inline-flex p-2.5 rounded-xl bg-purple-500/10 text-purple-400 mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-white">120+</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Verified Companies</p>
          </div>

          <div className="p-4 space-y-1">
            <div className="inline-flex p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 mb-2">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-white">2,500+</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Candidates Placed</p>
          </div>

          <div className="p-4 space-y-1">
            <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 text-amber-400 mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-white">98%</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Placement Success Rate</p>
          </div>

        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Explore Top Categories</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Browse through specialized job roles in tech, product, design, and analytics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon
            return (
              <Link
                key={idx}
                to="/jobs"
                className="group glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/10"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition">{cat.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">{cat.count}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Featured Openings</h2>
            <p className="text-slate-400 text-sm mt-1">Hand-picked remote and high-growth opportunities.</p>
          </div>

          <Link
            to="/jobs"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            <span>View All Openings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {job.type}
                  </span>
                  <span className="text-xs font-bold text-slate-300">{job.salary}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{job.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{job.company} • {job.location}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/jobs/${job.id}`}
                className="w-full text-center bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                View Job Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How JobSpark Works</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Simple, transparent steps to kickstart your application or hire top talent.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center relative space-y-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md">
              1
            </div>
            <h3 className="text-base font-bold text-white">Create Account</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign up as a Job Seeker or Recruiter Manager in seconds.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center relative space-y-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md">
              2
            </div>
            <h3 className="text-base font-bold text-white">Complete Profile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Add your resume, technical skills, and experience details.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center relative space-y-3">
            <div className="w-10 h-10 rounded-full bg-pink-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md">
              3
            </div>
            <h3 className="text-base font-bold text-white">Submit Applications</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore verified job listings and apply with 1 click.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center relative space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md">
              4
            </div>
            <h3 className="text-base font-bold text-white">Track & Get Hired</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track application status and interview updates live.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Platform Features</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Built with modern technology to provide a seamless hiring experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2.5 w-max rounded-xl bg-indigo-500/10 text-indigo-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Advanced Search & Filters</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly filter jobs by title, location, salary range, and employment type.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2.5 w-max rounded-xl bg-purple-500/10 text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">One-Click Application</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit applications instantly using your saved profile credentials and resume link.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2.5 w-max rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Real-Time Status Tracker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitor your application status from Applied to Shortlisted and Hired.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2.5 w-max rounded-xl bg-amber-500/10 text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Company Profiles</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Recruiters can create and display verified company profiles and web links.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2.5 w-max rounded-xl bg-blue-500/10 text-blue-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Manager Portal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated dashboard for recruiters to post jobs, evaluate candidates, and update statuses.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-2.5 w-max rounded-xl bg-pink-500/10 text-pink-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Admin Management</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprehensive admin control panel to manage registered users, jobs, and platform metrics.
            </p>
          </div>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-8 sm:p-12 border border-indigo-500/30 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Create your profile today to browse top tech jobs or start hiring talent immediately.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/register"
                className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/jobs"
                className="bg-indigo-600/30 border border-indigo-400/40 text-white hover:bg-indigo-600/50 font-bold px-6 py-3 rounded-xl text-sm transition"
              >
                Browse All Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home