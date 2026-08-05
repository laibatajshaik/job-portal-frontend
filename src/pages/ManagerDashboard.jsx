import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  Briefcase,
  Users,
  Building,
  PlusCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  X,
  FileSpreadsheet,
  Building2,
  Trash2,
  DollarSign
} from 'lucide-react'

function ManagerDashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState('pipeline')

  const [activeStepFilter, setActiveStepFilter] = useState('All')
  const [activeDeptFilter, setActiveDeptFilter] = useState('All')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await api.get('/jobs/my-jobs')
      if (Array.isArray(res.data)) {
        setJobs(res.data)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting permanently?")) return
    try {
      await api.delete(`/jobs/${id}`)
      setJobs(prev => prev.filter(j => j.id !== id))
    } catch (err) {
      console.log(err)
      alert("Failed to delete job posting.")
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-12">
      
      {}
      <header className="bg-[#003366] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {}
          <div className="flex items-center gap-2.5">
            <Link to="/manager/dashboard" className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white font-bold shadow">
              <Briefcase className="w-4 h-4" />
            </Link>
            <span className="font-extrabold text-sm tracking-tight text-white">Recruiter Workspace</span>
          </div>

          {}
          <nav className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'pipeline'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Job Openings</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'database'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Database</span>
            </button>

            <Link
              to="/manager/company"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company Spec</span>
            </Link>
          </nav>

          {}
          <div className="flex items-center gap-3">
            <Link
              to="/manager/post-job"
              className="bg-[#0066FF] hover:bg-[#0040A0] text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1 shadow"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Publish Job</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-white text-xs font-bold"
            >
              Logout
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/30 p-4 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#003366]">
            <span>Filter Active Jobs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            {}
            <div className="space-y-1.5">
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Step</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Sourced', '1st Interview', 'Offer'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveStepFilter(f)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition ${
                      activeStepFilter === f
                        ? 'bg-[#003366] text-white border-[#003366]'
                        : 'bg-slate-50 text-slate-600 border-[#0066FF]/20 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {}
            <div className="space-y-1.5">
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Filter by Department</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Research', 'Strategic', 'Support'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveDeptFilter(f)}
                    className={`px-2.5 py-1 rounded text-[10px] border transition ${
                      activeDeptFilter === f
                        ? 'bg-[#003366] text-white border-[#003366]'
                        : 'bg-slate-50 text-slate-600 border-[#0066FF]/20 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Jobs</p>
              <p className="text-sm font-black text-[#003366]">{jobs.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Company Spec</p>
              <p className="text-sm font-black text-[#003366]">Configured</p>
            </div>
          </div>

        </section>

        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6">
          
          {}
          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#003366] uppercase tracking-tight">Active Recruitment Openings</h2>
                <span className="text-xs text-slate-455 font-bold">
                  {jobs.length} Positions Published
                </span>
              </div>

              {jobs.length === 0 ? (
                <div className="text-center py-12 text-slate-600 space-y-3 font-semibold">
                  <p className="text-sm">You haven't posted any job openings yet.</p>
                  <Link
                    to="/manager/post-job"
                    className="inline-flex items-center gap-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition"
                  >
                    <span>Publish Your First Job</span>
                    <PlusCircle className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-[#F4F7FC]/50 hover:bg-[#F4F7FC] rounded-xl p-5 border border-[#0066FF]/15 flex flex-col md:flex-row md:items-center justify-between gap-4 transition duration-150"
                    >
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#003366] flex items-center gap-2">
                            {job.title}
                            {job.expiry_date && new Date(job.expiry_date) < new Date(new Date().setHours(0,0,0,0)) && (
                              <span className="bg-rose-100 text-rose-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-rose-200">
                                Expired
                              </span>
                            )}
                          </h4>
                          <div className="flex items-center gap-3 text-[11px] text-slate-600 font-semibold mt-0.5">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location || 'Remote'}</span>
                            <span className="text-slate-300">|</span>
                            <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-400" /> {job.salary || '₹9,00,000'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Job Type: {job.job_type || 'Full Time'}</span>
                          </div>
                          {job.expiry_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>Expires: {job.expiry_date}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between md:justify-end gap-3.5 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                        
                        <Link
                          to={`/manager/applicants/${job.id}`}
                          className="bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition flex items-center gap-1"
                        >
                          <span>Manage Applicants</span>
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </Link>

                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-slate-400 hover:text-rose-600 p-2 rounded transition"
                          title="Delete Job Posting"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DATABASE */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#003366] uppercase">Positions Raw Data</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Raw database representation of job listings posted under your recruiter account credentials.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead>
                    <tr className="border-b border-[#0066FF]/20 text-[#003366] bg-slate-50 font-bold">
                      <th className="p-3">Position</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Salary</th>
                      <th className="p-3">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map(job => (
                      <tr key={job.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-[#003366]">{job.title}</td>
                        <td className="p-3 text-slate-600">{job.location}</td>
                        <td className="p-3 text-slate-600">{job.salary}</td>
                        <td className="p-3 text-slate-600">{job.job_type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </section>

      </main>

    </div>
  )
}

export default ManagerDashboard