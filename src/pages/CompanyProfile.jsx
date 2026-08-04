import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  Briefcase,
  Users,
  Building2,
  Building,
  PlusCircle,
  Clock,
  ArrowLeft,
  X,
  FileSpreadsheet,
  Globe,
  MapPin,
  Save,
  CheckCircle2
} from 'lucide-react'

function CompanyProfile() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [companyName, setCompanyName] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [activeTab, setActiveTab] = useState('position')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await api.get('/jobs/my-company')
      if (res.data) {
        setCompanyName(res.data.name || '')
        setWebsite(res.data.website || '')
        setLocation(res.data.location || '')
        setDescription(res.data.description || '')
      }
    } catch (err) {
      console.log('Using initial empty profile fallback')
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    try {
      await api.put('/jobs/my-company', {
        name: companyName,
        website,
        location,
        description
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.log(err)
      alert('Failed to update company profile details.')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading && !companyName) return <Loader />

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

            <button
              onClick={() => setActiveTab('position')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition ${
                activeTab === 'position'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Company Spec</span>
            </button>
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
            <h2 className="text-lg font-black text-[#003366] uppercase tracking-tight">Configure Company Spec</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
              Define the default corporate parameters that candidates see on active job postings.
            </p>
          </div>

          {success && (
            <div className="flex items-center gap-2 border border-emerald-100 bg-emerald-50 text-emerald-800 text-xs px-4 py-3.5 rounded-xl font-bold animate-fade-in">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
              <span>Company profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-600">
            
            {}
            <div>
              <label className="block mb-1.5">Official Company Name</label>
              <div className="flex items-center gap-2 bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus-within:border-[#0066FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 transition">
                <Building className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Shnoor Technologies"
                  className="bg-transparent text-xs text-[#003366] placeholder-slate-400 focus:outline-none w-full font-bold"
                />
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5">Corporate Website URL</label>
                <div className="flex items-center gap-2 bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus-within:border-[#0066FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 transition">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.com"
                    className="bg-transparent text-xs text-[#003366] placeholder-slate-400 focus:outline-none w-full font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Primary Location Address</label>
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
              <label className="block mb-1.5">Company Overview / Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                placeholder="Describe your company domain, culture, operations..."
                className="w-full bg-[#F4F7FC]/50 border border-[#0066FF]/25 focus:border-[#0066FF] focus:bg-white focus:ring-2 focus:ring-[#0066FF]/10 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition font-bold text-xs"
              ></textarea>
            </div>

            {}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#003366] hover:bg-[#002244] text-white font-extrabold text-xs py-3.5 rounded-xl shadow transition mt-2 uppercase tracking-wider disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-white" />
              <span>{loading ? 'Saving Spec...' : 'Save Corporate Spec'}</span>
            </button>

          </form>

        </section>

      </main>

    </div>
  )
}

export default CompanyProfile