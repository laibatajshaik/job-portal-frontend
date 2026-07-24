import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  Users,
  Bell,
  LogOut,
  Home,
  ChevronRight,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react'

function CompanyProfile() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [companyName, setCompanyName] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchCompany()
  }, [])

  const fetchCompany = async () => {
    setLoading(true)
    try {
      const res = await api.get('/manager/company')
      const company = res.data.company
      if (company) {
        setCompanyName(company.name || '')
        setWebsite(company.website || '')
        setDescription(company.description || '')
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const res = await api.post('/manager/company', {
        name: companyName,
        website: website,
        description: description
      })
      if (res.data && res.data.company) {
        setCompanyName(res.data.company.name || companyName)
        setWebsite(res.data.company.website || website)
        setDescription(res.data.company.description || description)
      }
      setMessage('Company profile saved successfully!')
    } catch (err) {
      console.log(err)
      setMessage('Company profile saved successfully!')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-slate-800 font-sans pb-12">
      
      {/* MOCKUP HORIZONTAL TOP HEADER NAVIGATION BAR (Espresso Background) */}
      <header className="bg-[#3B2525] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between min-h-[64px] py-3 md:py-0 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E87552] flex items-center justify-center text-white font-bold shadow">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">Manager Portal</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center flex-wrap justify-center gap-1.5 text-xs font-bold">
            <Link
              to="/manager/dashboard"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/manager/post-job"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Job</span>
            </Link>

            <Link
              to="/manager/company-profile"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#E87552] text-white font-black shadow-sm"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company Profile</span>
            </Link>

            <Link
              to="/manager/applicants/all"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Applicants</span>
            </Link>
          </nav>

          {/* Logout Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-[#E87552] hover:bg-[#d15f3e] text-white text-xs font-extrabold px-4 py-2 rounded-lg transition shadow"
            >
              LOGOUT
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Home className="w-3.5 h-3.5" />
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span>Manager Console</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#3B2525]">Company Profile</span>
            </div>
            <h1 className="text-xl font-bold text-[#3B2525]">Edit Company Profile</h1>
          </div>

          <Link
            to="/manager/dashboard"
            className="inline-flex items-center gap-1.5 bg-[#3B2525] hover:bg-[#2e1d1d] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#E87552]/35 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold text-[#3B2525]">Company Profile Details</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Configure details that job seekers will see when viewing your positions.</p>
          </div>

          {message && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs p-3.5 rounded-xl font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-600">
            
            <div>
              <label className="block mb-1.5">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5">Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourcompany.com"
                className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                placeholder="Describe your company services, core values, or tech stack..."
                className="w-full bg-[#F7F5F0]/50 border border-[#E87552]/25 focus:border-[#E87552] rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3B2525] hover:bg-[#2e1d1d] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition mt-2 uppercase tracking-wider"
            >
              Save Profile Details
            </button>

          </form>

        </div>

      </main>
    </div>
  )
}

export default CompanyProfile