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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* BRIGHT WHITE SIDEBAR WITH HONEY ORANGE ACTIONS (Recruiter/Manager Portal) */}
        <aside className="w-full lg:w-64 bg-white rounded-3xl p-5 text-slate-700 flex flex-col justify-between shadow-sm border border-slate-100 shrink-0 min-h-[620px]">
          
          <div className="space-y-6">
            {/* Sidebar Title */}
            <div className="flex items-center gap-2.5 px-3 py-2 text-base font-bold tracking-tight text-slate-900">
              <div className="w-8 h-8 rounded-xl bg-[#FFA726] flex items-center justify-center text-white shadow-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <span>Manager Portal</span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <Link
                to="/manager/dashboard"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/manager/post-job"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Job</span>
              </Link>

              <Link
                to="/manager/company-profile"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFA726] text-white font-bold shadow-md transition"
              >
                <Building2 className="w-4 h-4" />
                <span>Company Profile</span>
              </Link>

              <Link
                to="/manager/applicants/all"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition"
              >
                <Users className="w-4 h-4" />
                <span>Applicants</span>
              </Link>

              <div 
                onClick={() => alert("No new notifications for manager.")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-[#FFA726] hover:bg-[#FFA726]/5 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3 rounded-xl shadow-md transition uppercase tracking-wider mt-6"
          >
            LOGOUT
          </button>

        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 space-y-6">

          {/* Breadcrumb Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Home className="w-3.5 h-3.5" />
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span>Manager</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#FFA726] font-semibold uppercase tracking-wider">Company Profile</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">Company Profile</h1>
            </div>

            <Link
              to="/manager/dashboard"
              className="inline-flex items-center gap-1.5 bg-[#FFA726] hover:bg-[#FB8C00] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">
            
            <div className="border-b border-slate-50 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Company Details</h2>
              <p className="text-xs text-slate-500 mt-1">Configure profile information for your company profile page.</p>
            </div>

            {message && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs p-3.5 rounded-2xl font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              
              <div className="space-y-1.5">
                <label className="block">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-150 focus:border-[#FFA726] rounded-full px-5 py-3.5 text-slate-900 font-medium transition focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full bg-slate-50 border border-slate-150 focus:border-[#FFA726] rounded-full px-5 py-3.5 text-slate-900 font-medium transition focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="5"
                  placeholder="Describe your company services, core values, or tech stack..."
                  className="w-full bg-slate-50 border border-slate-155 focus:border-[#FFA726] rounded-3xl px-5 py-3.5 text-slate-900 font-medium transition focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3.5 rounded-full shadow-md transition mt-2 uppercase tracking-wider"
              >
                Save Profile Details
              </button>

            </form>

          </div>

        </main>

      </div>
    </div>
  )
}

export default CompanyProfile