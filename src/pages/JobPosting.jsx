import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'
import {
  Briefcase,
  Users,
  Building,
  PlusCircle,
  Clock,
  ArrowLeft,
  X,
  FileSpreadsheet,
  Building2,
  DollarSign,
  MapPin,
  FileText,
  Bookmark
} from 'lucide-react'

function JobPosting() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [jobType, setJobType] = useState('Full Time')
  const [companyName, setCompanyName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [loading, setLoading] = useState(false)

  const [activeTab, setTab] = useState('pipeline')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/jobs/', {
        title,
        description,
        location,
        salary,
        job_type: jobType,
        company_name: companyName,
        expiry_date: expiryDate || null
      })
      navigate('/manager/dashboard')
    } catch (err) {
      console.log(err)
      alert('Failed to publish job opening.')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
            <span className="font-extrabold text-sm tracking-tight text-white">Recruitment Console</span>
          </div>

          {}
          <nav className="flex items-center gap-2 text-xs font-bold">
            <Link
              to="/manager/dashboard"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </Link>

            <button
              onClick={() => navigate('/manager/dashboard')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
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
              to="/manager/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4.5 py-2.5 rounded-lg transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Console</span>
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

      <main className="max-w-3xl mx-auto px-4 mt-6">
        
        {}
        <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-[#003366] uppercase tracking-tight">Publish Job Opening</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
              Create a new position posting. Candidates matching the specifications will be calculated instantly in your pipeline.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-600">
            
            {}
            <div>
              <label className="block mb-1.5">Job Position Title</label>
              <div className="flex items-center gap-2 bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus-within:border-[#0066FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 transition">
                <Bookmark className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="bg-transparent text-xs text-[#003366] placeholder-slate-400 focus:outline-none w-full font-bold"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block mb-1.5">Company Name</label>
              <div className="flex items-center gap-2 bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus-within:border-[#0066FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 transition">
                <Building className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Swiggy, Zomato, Razorpay"
                  className="bg-transparent text-xs text-[#003366] placeholder-slate-400 focus:outline-none w-full font-bold"
                />
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5">Salary Package (Annual INR)</label>
                <div className="flex items-center gap-2 bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus-within:border-[#0066FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 transition">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. ₹12,00,000"
                    className="bg-transparent text-xs text-[#003366] placeholder-slate-400 focus:outline-none w-full font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Location Address / Remote</label>
                <div className="flex items-center gap-2 bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus-within:border-[#0066FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 transition">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, KA"
                    className="bg-transparent text-xs text-[#003366] placeholder-slate-400 focus:outline-none w-full font-bold"
                  />
                </div>
              </div>
            </div>

            {}
            <div>
              <label className="block mb-1.5">Job Contract Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus:bg-white focus:border-[#0066FF] rounded-xl px-4 py-3 text-slate-700 font-bold focus:outline-none cursor-pointer"
              >
                <option value="Full Time">Full Time Position</option>
                <option value="Part Time">Part Time Position</option>
                <option value="Contract">Contract Spec</option>
                <option value="Internship">Internship Node</option>
              </select>
            </div>

            <div>
              <label className="block mb-1.5">Job Expiry Date</label>
              <div className="flex items-center gap-2 bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus-within:border-[#0066FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 transition">
                <Clock className="w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="bg-transparent text-xs text-[#003366] focus:outline-none w-full font-bold cursor-pointer"
                />
              </div>
            </div>

            {}
            <div>
              <label className="block mb-1.5">Position Description & Skills Required</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                placeholder="Describe role responsibilities, required technical skills, experience metrics..."
                className="w-full bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus:border-[#0066FF] focus:bg-white focus:ring-2 focus:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition font-bold text-xs"
              ></textarea>
            </div>

            {}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#003366] hover:bg-[#002244] text-white font-extrabold text-xs py-3.5 rounded-xl shadow transition mt-2 uppercase tracking-wider disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>{loading ? 'Publishing Spec...' : 'Publish Opening'}</span>
            </button>

          </form>

        </section>

      </main>

    </div>
  )
}

export default JobPosting
