import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'

import {
  Briefcase,
  Users,
  PlusCircle,
  MapPin,
  FileSpreadsheet,
  Building2,
  Trash2,
  Pencil,
  Save,
  X,
  Mail,
  Globe,
  Factory,
  UsersRound,
  ArrowLeft,
  ArrowRight,
  Calendar,
  DollarSign,
  Clock,
  LogOut
} from 'lucide-react'

function ManagerDashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  // =========================================================
  // STATES
  // =========================================================

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  const [company, setCompany] = useState(null)
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)

  const [selectedJob, setSelectedJob] = useState(null)

  const [loading, setLoading] = useState(true)
  const [companyLoading, setCompanyLoading] = useState(false)

  const [activeTab, setActiveTab] = useState('pipeline')

  const [activeStepFilter, setActiveStepFilter] = useState('All')
  const [activeDeptFilter, setActiveDeptFilter] = useState('All')

  // Company edit
  const [editingCompany, setEditingCompany] = useState(false)
  const [savingCompany, setSavingCompany] = useState(false)

  const [companyForm, setCompanyForm] = useState({
    name: '',
    website: '',
    description: '',
    industry: '',
    company_size: '',
    location: '',
    email: '',
    company_type: '',
    founded_year: '',
    recruitment_status: 'Active',
    benefits: ''
  })

  // Individual job edit inside Company Specifications
  const [editingSelectedJob, setEditingSelectedJob] = useState(false)
  const [savingSelectedJob, setSavingSelectedJob] = useState(false)

  const [jobEditForm, setJobEditForm] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    job_type: '',
    skills: '',
    expiry_date: ''
  })

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchJobs()
    fetchApplications()
    fetchCompany()
    fetchCompanies()
  }, [])

  // =========================================================
  // FETCH MANAGER JOBS
  // =========================================================

  const fetchJobs = async () => {
    try {
      setLoading(true)

      const res = await api.get('/jobs/my-jobs')

      if (Array.isArray(res.data)) {
        setJobs(res.data)
      } else if (Array.isArray(res.data?.jobs)) {
        setJobs(res.data.jobs)
      } else {
        setJobs([])
      }
    } catch (err) {
      console.log('Failed to fetch jobs:', err)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  // =========================================================
  // FETCH APPLICATIONS
  // =========================================================

  const fetchApplications = async () => {
    try {
      const res = await api.get('/manager/applicants')

      if (Array.isArray(res.data?.applicants)) {
        setApplications(res.data.applicants)
      } else {
        setApplications([])
      }
    } catch (err) {
      console.log('Failed to fetch applications:', err)
      setApplications([])
    }
  }

  // =========================================================
  // FETCH CURRENT MANAGER COMPANY
  // =========================================================

  const fetchCompany = async () => {
    try {
      const res = await api.get('/manager/company')

      if (res.data?.company) {
        setCompany(res.data.company)
      }
    } catch (err) {
      console.log('Failed to fetch company:', err)
    }
  }

  // =========================================================
  // FETCH ALL COMPANIES
  // =========================================================

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/manager/companies')

      if (Array.isArray(res.data?.companies)) {
        setCompanies(res.data.companies)
      } else {
        setCompanies([])
      }
    } catch (err) {
      console.log('Failed to fetch companies:', err)
      setCompanies([])
    }
  }

  // =========================================================
  // OPEN COMPANY SPECIFICATIONS
  // =========================================================

  const handleCompanyTab = () => {
    setActiveTab('company-specifications')
    setSelectedCompany(null)
    setSelectedJob(null)
    setEditingCompany(false)
    setEditingSelectedJob(false)

    fetchCompanies()
  }

  // =========================================================
  // COMPANY CLICK
  // =========================================================

  const handleCompanyClick = async (companyName) => {
    try {
      setCompanyLoading(true)

      setSelectedJob(null)
      setEditingSelectedJob(false)

      const res = await api.get(
        `/manager/companies/${encodeURIComponent(companyName)}`
      )

      if (res.data?.company) {
        setSelectedCompany(res.data.company)
      } else {
        setSelectedCompany(res.data)
      }
    } catch (err) {
      console.log('Failed to fetch company specifications:', err)

      alert(
        err.response?.data?.detail ||
        'Failed to load company specifications.'
      )
    } finally {
      setCompanyLoading(false)
    }
  }

  // =========================================================
  // GO BACK TO COMPANY LIST
  // =========================================================

  const backToCompanies = () => {
    setSelectedCompany(null)
    setSelectedJob(null)
    setEditingCompany(false)
    setEditingSelectedJob(false)
  }

  // =========================================================
  // SALARY FORMAT
  // =========================================================

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified'

    const salStr = String(salary).trim()

    if (salStr.toLowerCase().includes('lpa')) {
      return salStr.startsWith('₹')
        ? salStr
        : `₹${salStr}`
    }

    const num = parseInt(
      salStr.replace(/[^0-9]/g, ''),
      10
    )

    if (isNaN(num)) {
      return salStr
    }

    if (num >= 100000) {
      const lpa = (num / 100000).toFixed(1)

      const formatted = lpa.endsWith('.0')
        ? lpa.slice(0, -2)
        : lpa

      return `₹${formatted} LPA`
    }

    return `₹${num}`
  }

  // =========================================================
  // JOB FILTERS
  // =========================================================

  const getFilteredJobs = () => {
    return jobs.filter(job => {
      const jobApps = applications.filter(
        app => app.job_id === job.id
      )

      if (activeStepFilter !== 'All') {
        if (activeStepFilter === 'Sourced') {
          const hasSourced = jobApps.some(
            app =>
              app.status === 'Pending' ||
              app.status === 'Applied'
          )

          if (!hasSourced) return false
        }

        if (activeStepFilter === '1st Interview') {
          const hasInterview = jobApps.some(
            app => app.status === 'Interviewing'
          )

          if (!hasInterview) return false
        }

        if (activeStepFilter === 'Offer') {
          const hasOffer = jobApps.some(
            app =>
              app.status === 'Shortlisted' ||
              app.status === 'Selected'
          )

          if (!hasOffer) return false
        }
      }

      if (activeDeptFilter !== 'All') {
        if (activeDeptFilter === 'Research') {
          const hasResearch = jobApps.some(
            app =>
              (app.candidate_name || '').length % 2 !== 0
          )

          if (!hasResearch) return false
        }

        if (activeDeptFilter === 'Strategic') {
          const hasStrategic = jobApps.some(
            app =>
              (app.candidate_name || '').length % 2 === 0
          )

          if (!hasStrategic) return false
        }

        if (activeDeptFilter === 'Support') {
          const hasSupport = jobApps.some(
            app => app.status === 'Rejected'
          )

          if (!hasSupport) return false
        }
      }

      return true
    })
  }

  // =========================================================
  // DELETE JOB
  // =========================================================

  const handleDeleteJob = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this job posting permanently?'
      )
    ) {
      return
    }

    try {
      await api.delete(`/jobs/${id}`)

      setJobs(prev =>
        prev.filter(job => job.id !== id)
      )

      if (
        selectedCompany &&
        Array.isArray(selectedCompany.jobs)
      ) {
        setSelectedCompany(prev => ({
          ...prev,
          jobs: prev.jobs.filter(job => job.id !== id),
          total_jobs: Math.max(
            0,
            (prev.total_jobs || prev.jobs.length) - 1
          )
        }))
      }

      if (selectedJob?.id === id) {
        setSelectedJob(null)
      }

      await fetchCompanies()

      alert('Job deleted successfully.')
    } catch (err) {
      console.log('Failed to delete job:', err)

      alert(
        err.response?.data?.detail ||
        'Failed to delete job posting.'
      )
    }
  }

  // =========================================================
  // OPEN INDIVIDUAL JOB
  // =========================================================

  const handleJobClick = (job) => {
    setSelectedJob(job)

    setJobEditForm({
      title: job.title || '',
      description: job.description || '',
      location: job.location || '',
      salary: job.salary || '',
      job_type: job.job_type || '',
      skills: Array.isArray(job.skills)
        ? job.skills.join(', ')
        : job.skills || '',
      expiry_date: job.expiry_date || ''
    })

    setEditingSelectedJob(false)
  }

  // =========================================================
  // CLOSE JOB DETAILS
  // =========================================================

  const closeJobDetails = () => {
    setSelectedJob(null)
    setEditingSelectedJob(false)
  }

  // =========================================================
  // START EDIT INDIVIDUAL JOB
  // =========================================================

  const startEditSelectedJob = () => {
    if (!selectedJob) return

    setJobEditForm({
      title: selectedJob.title || '',
      description: selectedJob.description || '',
      location: selectedJob.location || '',
      salary: selectedJob.salary || '',
      job_type: selectedJob.job_type || '',
      skills: Array.isArray(selectedJob.skills)
        ? selectedJob.skills.join(', ')
        : selectedJob.skills || '',
      expiry_date: selectedJob.expiry_date || ''
    })

    setEditingSelectedJob(true)
  }

  // =========================================================
  // JOB FORM CHANGE
  // =========================================================

  const handleJobEditChange = (e) => {
    const { name, value } = e.target

    setJobEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // =========================================================
  // SAVE INDIVIDUAL JOB
  // =========================================================

  const saveSelectedJob = async () => {
    if (!selectedJob) return

    if (!jobEditForm.title.trim()) {
      alert('Please enter job title.')
      return
    }

    if (!jobEditForm.description.trim()) {
      alert('Please enter job description.')
      return
    }

    if (!jobEditForm.location.trim()) {
      alert('Please enter job location.')
      return
    }

    if (!String(jobEditForm.salary).trim()) {
      alert('Please enter salary.')
      return
    }

    if (!jobEditForm.job_type.trim()) {
      alert('Please enter job type.')
      return
    }

    try {
      setSavingSelectedJob(true)

      const payload = {
        title: jobEditForm.title,
        description: jobEditForm.description,
        location: jobEditForm.location,
        salary: jobEditForm.salary,
        job_type: jobEditForm.job_type,

        skills: jobEditForm.skills
          .split(',')
          .map(skill => skill.trim())
          .filter(Boolean),

        expiry_date:
          jobEditForm.expiry_date || null
      }

      const res = await api.put(
        `/manager/jobs/${selectedJob.id}`,
        payload
      )

      const updatedJob = res.data?.job || {
        ...selectedJob,
        ...payload
      }

      // Update selected job
      setSelectedJob(updatedJob)

      // Update main jobs
      setJobs(prev =>
        prev.map(job =>
          job.id === selectedJob.id
            ? updatedJob
            : job
        )
      )

      // Update company opening list
      if (
        selectedCompany &&
        Array.isArray(selectedCompany.jobs)
      ) {
        setSelectedCompany(prev => ({
          ...prev,
          jobs: prev.jobs.map(job =>
            job.id === selectedJob.id
              ? updatedJob
              : job
          )
        }))
      }

      setEditingSelectedJob(false)

      alert('Job updated successfully.')
    } catch (err) {
      console.log('Failed to update job:', err)

      alert(
        err.response?.data?.detail ||
        'Failed to update job.'
      )
    } finally {
      setSavingSelectedJob(false)
    }
  }

  // =========================================================
  // COMPANY EDIT
  // =========================================================

  const startEditCompany = () => {
    const sourceCompany =
      selectedCompany || company

    setCompanyForm({
      name: sourceCompany?.name || '',
      website: sourceCompany?.website || '',
      description: sourceCompany?.description || '',
      industry: sourceCompany?.industry || '',
      company_size: sourceCompany?.company_size || '',
      location: sourceCompany?.location || '',
      email: sourceCompany?.email || '',
      company_type: sourceCompany?.company_type || '',
      founded_year: sourceCompany?.founded_year || '',
      recruitment_status:
        sourceCompany?.recruitment_status || 'Active',

      benefits: Array.isArray(sourceCompany?.benefits)
        ? sourceCompany.benefits.join(', ')
        : sourceCompany?.benefits || ''
    })

    setEditingCompany(true)
  }

  // =========================================================
  // COMPANY FORM CHANGE
  // =========================================================

  const handleCompanyChange = (e) => {
    const { name, value } = e.target

    setCompanyForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // =========================================================
  // SAVE COMPANY
  // =========================================================

  const handleSaveCompany = async () => {
    if (!companyForm.name.trim()) {
      alert('Please enter company name.')
      return
    }

    try {
      setSavingCompany(true)

      const payload = {
        name: companyForm.name,
        website: companyForm.website,
        description: companyForm.description,
        industry: companyForm.industry,
        company_size: companyForm.company_size,
        location: companyForm.location,
        email: companyForm.email,
        company_type: companyForm.company_type,
        founded_year: companyForm.founded_year,
        recruitment_status:
          companyForm.recruitment_status,

        benefits: companyForm.benefits
          .split(',')
          .map(item => item.trim())
          .filter(Boolean)
      }

      const res = await api.post(
        '/manager/company',
        payload
      )

      const updatedCompany =
        res.data?.company || payload

      setCompany(updatedCompany)

      if (selectedCompany) {
        setSelectedCompany(prev => ({
          ...prev,
          ...updatedCompany
        }))
      }

      setEditingCompany(false)

      await fetchCompanies()

      alert(
        'Company specifications updated successfully.'
      )
    } catch (err) {
      console.log(
        'Failed to update company:',
        err
      )

      alert(
        err.response?.data?.detail ||
        'Failed to update company specifications.'
      )
    } finally {
      setSavingCompany(false)
    }
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return <Loader />
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="w-64 bg-[#003366] text-white flex flex-col justify-between shrink-0 sticky top-0 h-screen border-r border-[#0066FF]/20 shadow-lg p-5">

        <div className="space-y-6">

          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">

            <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center shadow">

              <Briefcase className="w-4 h-4" />

            </div>

            <span className="font-extrabold text-sm tracking-tight">
              Manager Workspace
            </span>

          </div>

          <nav className="flex flex-col gap-2 text-xs font-bold">

            {/* JOB OPENINGS */}

            <button
              onClick={() => {
                setActiveTab('pipeline')
                setSelectedCompany(null)
                setSelectedJob(null)
                setEditingSelectedJob(false)
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition text-left w-full ${
                activeTab === 'pipeline'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Job Openings</span>
            </button>

            {/* DATABASE */}

            <button
              onClick={() => {
                setActiveTab('database')
                setSelectedCompany(null)
                setSelectedJob(null)
                setEditingSelectedJob(false)
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition text-left w-full ${
                activeTab === 'database'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Database</span>
            </button>

            {/* COMPANY SPECIFICATIONS */}

            <button
              onClick={handleCompanyTab}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition text-left w-full ${
                activeTab === 'company-specifications'
                  ? 'bg-[#0066FF] text-white shadow'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Company Specifications</span>
            </button>

            {/* PUBLISH JOB */}

            <Link
              to="/manager/post-job"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition w-full font-bold"
            >
              <PlusCircle className="w-4 h-4 text-[#0066FF]" />
              <span>Publish Job</span>
            </Link>

          </nav>

        </div>

        {/* LOGOUT */}

        <div className="border-t border-white/10 pt-4">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-rose-300 hover:bg-rose-900/20 transition text-left text-xs font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* HEADER */}

        <header className="bg-white border-b border-[#0066FF]/15 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">

          <h1 className="text-base font-black text-[#003366] uppercase tracking-tight">
            Manager Dashboard
          </h1>

          <span className="text-xs text-slate-600 font-bold bg-[#0066FF]/10 px-3 py-1.5 rounded-full">
            Logged in: {user?.email || 'manager@gmail.com'}
          </span>

        </header>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <main className="flex-1 p-6 space-y-6">

          {/* ===================================================
              JOB OPENINGS TAB
          ==================================================== */}

          {activeTab === 'pipeline' && (

            <>

              {/* FILTERS */}

              <section className="bg-white rounded-xl border border-[#0066FF]/30 p-4 shadow-sm">

                <div className="text-xs font-bold text-[#003366] mb-4">
                  Filter Active Jobs
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-2">
                      Filter by Step
                    </span>

                    <div className="flex flex-wrap gap-1">

                      {[
                        'All',
                        'Sourced',
                        '1st Interview',
                        'Offer'
                      ].map(f => (

                        <button
                          key={f}
                          onClick={() =>
                            setActiveStepFilter(f)
                          }
                          className={`px-3 py-1.5 rounded text-[10px] border ${
                            activeStepFilter === f
                              ? 'bg-[#003366] text-white'
                              : 'bg-slate-50 text-slate-600'
                          }`}
                        >
                          {f}
                        </button>

                      ))}

                    </div>

                  </div>

                  <div>

                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-2">
                      Filter by Department
                    </span>

                    <div className="flex flex-wrap gap-1">

                      {[
                        'All',
                        'Research',
                        'Strategic',
                        'Support'
                      ].map(f => (

                        <button
                          key={f}
                          onClick={() =>
                            setActiveDeptFilter(f)
                          }
                          className={`px-3 py-1.5 rounded text-[10px] border ${
                            activeDeptFilter === f
                              ? 'bg-[#003366] text-white'
                              : 'bg-slate-50 text-slate-600'
                          }`}
                        >
                          {f}
                        </button>

                      ))}

                    </div>

                  </div>

                </div>

              </section>

              {/* STATS */}

              <section className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <div className="bg-white rounded-lg p-4 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">

                  <div className="w-9 h-9 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Active Jobs
                    </p>

                    <p className="text-lg font-black text-[#003366]">
                      {jobs.length}
                    </p>
                  </div>

                </div>

                <div className="bg-white rounded-lg p-4 border border-[#0066FF]/20 shadow-sm flex items-center gap-3">

                  <div className="w-9 h-9 rounded bg-[#F4F7FC] text-[#003366] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Applications
                    </p>

                    <p className="text-lg font-black text-[#003366]">
                      {applications.length}
                    </p>
                  </div>

                </div>

              </section>

              {/* JOB LIST */}

              <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6">

                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">

                  <h2 className="text-base font-black text-[#003366] uppercase tracking-tight">
                    Active Recruitment Openings
                  </h2>

                  <span className="text-xs text-slate-500 font-bold">
                    {getFilteredJobs().length} Positions
                  </span>

                </div>

                {getFilteredJobs().length === 0 ? (

                  <div className="text-center py-12">

                    <p className="text-sm text-slate-600 font-semibold mb-4">
                      You haven't posted any job openings yet.
                    </p>

                    <Link
                      to="/manager/post-job"
                      className="inline-flex items-center gap-2 bg-[#003366] text-white px-5 py-2.5 rounded-lg text-xs font-bold"
                    >
                      Publish Your First Job
                      <PlusCircle className="w-4 h-4" />
                    </Link>

                  </div>

                ) : (

                  <div className="grid grid-cols-1 gap-4">

                    {getFilteredJobs().map(job => (

                      <div
                        key={job.id}
                        className="bg-[#F4F7FC]/50 rounded-xl p-5 border border-[#0066FF]/15 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >

                        <div>

                          <h3 className="font-extrabold text-sm text-[#003366]">
                            {job.title}
                          </h3>

                          <div className="flex flex-wrap gap-4 text-[11px] text-slate-600 mt-2">

                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.location || 'Remote'}
                            </span>

                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" />
                              {formatSalary(job.salary)}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {job.job_type || 'Full Time'}
                            </span>

                          </div>

                        </div>

                        <div className="flex items-center gap-2">

                          <Link
                            to={`/manager/applicants/${job.id}`}
                            className="bg-[#003366] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            Manage Applicants
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() =>
                              handleDeleteJob(job.id)
                            }
                            className="p-2 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </section>

            </>

          )}

          {/* ===================================================
              DATABASE TAB
          ==================================================== */}

          {activeTab === 'database' && (

            <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6">

              <h2 className="text-base font-black text-[#003366] uppercase mb-2">
                Positions Raw Data
              </h2>

              <p className="text-xs text-slate-500 mb-5">
                Job listings posted under the manager account.
              </p>

              <div className="overflow-x-auto">

                <table className="w-full text-left text-xs">

                  <thead>

                    <tr className="border-b bg-slate-50 text-[#003366]">

                      <th className="p-3">
                        Position
                      </th>

                      <th className="p-3">
                        Location
                      </th>

                      <th className="p-3">
                        Salary
                      </th>

                      <th className="p-3">
                        Type
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y">

                    {jobs.map(job => (

                      <tr key={job.id}>

                        <td className="p-3 font-bold">
                          {job.title}
                        </td>

                        <td className="p-3">
                          {job.location}
                        </td>

                        <td className="p-3">
                          {formatSalary(job.salary)}
                        </td>

                        <td className="p-3">
                          {job.job_type}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          )}

          {/* ===================================================
              COMPANY SPECIFICATIONS
          ==================================================== */}

          {activeTab === 'company-specifications' && (

            <section className="bg-white rounded-xl border border-[#0066FF]/35 shadow-sm p-6">

              {/* ================================================
                  COMPANY LIST
              ================================================= */}

              {!selectedCompany && !selectedJob && (

                <>

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <h2 className="text-xl font-black text-[#003366]">
                        Company Specifications
                      </h2>

                      <p className="text-xs text-slate-500 mt-1">
                        Select a company to view its specifications
                      </p>

                    </div>

                    <span className="text-xs font-bold text-slate-500">
                      {companies.length} Companies
                    </span>

                  </div>

                  {companyLoading ? (

                    <Loader />

                  ) : companies.length === 0 ? (

                    <div className="text-center py-12 text-slate-500">
                      No companies available.
                    </div>

                  ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                      {companies.map((item, index) => {

                        const companyName =
                          item.name ||
                          item.company_name ||
                          `Company ${index + 1}`

                        return (

                          <button
                            key={item.id || companyName}
                            onClick={() =>
                              handleCompanyClick(companyName)
                            }
                            className="text-left bg-[#F4F7FC]/60 hover:bg-[#F4F7FC] border border-[#0066FF]/15 hover:border-[#0066FF]/40 rounded-xl p-5 transition"
                          >

                            <div className="flex items-start justify-between">

                              <div className="w-10 h-10 rounded-lg bg-[#003366] text-white flex items-center justify-center">
                                <Building2 className="w-5 h-5" />
                              </div>

                              <ArrowRight className="w-4 h-4 text-slate-400" />

                            </div>

                            <h3 className="font-black text-[#003366] mt-4">
                              {companyName}
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                              {item.industry ||
                                'Information Technology'}
                            </p>

                            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location || 'Location not available'}
                            </p>

                          </button>

                        )

                      })}

                    </div>

                  )}

                </>

              )}

              {/* ================================================
                  COMPANY DETAILS
              ================================================= */}

              {selectedCompany && !selectedJob && (

                <div>

                  {/* BACK */}

                  <button
                    onClick={backToCompanies}
                    className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#003366] mb-5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Companies
                  </button>

                  {/* COMPANY HEADER */}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b pb-5">

                    <div>

                      <h2 className="text-2xl font-black text-[#003366]">
                        {selectedCompany.name}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {selectedCompany.industry ||
                          'Information Technology'}
                      </p>

                    </div>

                    <button
                      onClick={startEditCompany}
                      className="flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white px-4 py-2 rounded-lg text-xs font-bold"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Company
                    </button>

                  </div>

                  {/* COMPANY DETAILS / EDIT FORM */}

                  {editingCompany ? (

                    <div className="mt-6 space-y-4">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {[
                          ['name', 'Company Name'],
                          ['website', 'Website'],
                          ['industry', 'Industry'],
                          ['company_size', 'Company Size'],
                          ['location', 'Location'],
                          ['email', 'Email'],
                          ['company_type', 'Company Type'],
                          ['founded_year', 'Founded Year']
                        ].map(([name, label]) => (

                          <div key={name}>

                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              {label}
                            </label>

                            <input
                              name={name}
                              value={companyForm[name]}
                              onChange={handleCompanyChange}
                              className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-[#0066FF]"
                            />

                          </div>

                        ))}

                      </div>

                      <div>

                        <label className="block text-xs font-bold text-slate-500 mb-1">
                          Description
                        </label>

                        <textarea
                          name="description"
                          value={companyForm.description}
                          onChange={handleCompanyChange}
                          className="w-full border border-slate-200 rounded-lg p-3 text-sm min-h-[120px]"
                        />

                      </div>

                      <div>

                        <label className="block text-xs font-bold text-slate-500 mb-1">
                          Benefits
                        </label>

                        <input
                          name="benefits"
                          value={companyForm.benefits}
                          onChange={handleCompanyChange}
                          placeholder="Health Insurance, Remote Work, etc."
                          className="w-full border border-slate-200 rounded-lg p-3 text-sm"
                        />

                      </div>

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setEditingCompany(false)
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>

                        <button
                          onClick={handleSaveCompany}
                          disabled={savingCompany}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0066FF] text-white text-xs font-bold"
                        >
                          <Save className="w-4 h-4" />
                          {savingCompany
                            ? 'Saving...'
                            : 'Save Company'}
                        </button>

                      </div>

                    </div>

                  ) : (

                    <>

                      {/* SPECIFICATIONS */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                        <Specification
                          icon={<Factory className="w-4 h-4" />}
                          label="Company Type"
                          value={
                            selectedCompany.company_type ||
                            'Not available'
                          }
                        />

                        <Specification
                          icon={<UsersRound className="w-4 h-4" />}
                          label="Company Size"
                          value={
                            selectedCompany.company_size ||
                            'Not available'
                          }
                        />

                        <Specification
                          icon={<MapPin className="w-4 h-4" />}
                          label="Location"
                          value={
                            selectedCompany.location ||
                            'Not available'
                          }
                        />

                        <Specification
                          icon={<Calendar className="w-4 h-4" />}
                          label="Founded Year"
                          value={
                            selectedCompany.founded_year ||
                            'Not available'
                          }
                        />

                        <Specification
                          icon={<Mail className="w-4 h-4" />}
                          label="Email"
                          value={
                            selectedCompany.email ||
                            'Not available'
                          }
                        />

                        <Specification
                          icon={<Globe className="w-4 h-4" />}
                          label="Website"
                          value={
                            selectedCompany.website ||
                            'Not available'
                          }
                        />

                      </div>

                      {/* ABOUT */}

                      <div className="mt-6">

                        <h3 className="text-sm font-black text-[#003366] mb-2">
                          About Company
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {selectedCompany.description ||
                            'No company description available.'}
                        </p>

                      </div>

                      {/* RECRUITMENT STATUS */}

                      <div className="mt-6">

                        <h3 className="text-sm font-black text-[#003366] mb-2">
                          Recruitment Status
                        </h3>

                        <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">
                          ✓
                          {selectedCompany.recruitment_status ||
                            'Active'}
                        </span>

                      </div>

                    </>

                  )}

                  {/* ==========================================
                      CURRENT OPENINGS
                  =========================================== */}

                  <div className="mt-8 border-t pt-6">

                    <div className="flex items-center justify-between mb-4">

                      <div>

                        <h3 className="text-base font-black text-[#003366]">
                          Current Openings
                        </h3>

                        <p className="text-xs text-slate-500">
                          Click a job to view complete details
                        </p>

                      </div>

                      <span className="text-xs font-bold text-slate-500">
                        {Array.isArray(selectedCompany.jobs)
                          ? selectedCompany.jobs.length
                          : selectedCompany.total_jobs || 0}{' '}
                        Jobs
                      </span>

                    </div>

                    {Array.isArray(selectedCompany.jobs) &&
                    selectedCompany.jobs.length > 0 ? (

                      <div className="space-y-3">

                        {selectedCompany.jobs.map(job => (

                          <button
                            key={job.id}
                            onClick={() =>
                              handleJobClick(job)
                            }
                            className="w-full text-left bg-[#F4F7FC]/60 hover:bg-[#F4F7FC] border border-[#0066FF]/15 hover:border-[#0066FF]/40 rounded-xl p-4 transition"
                          >

                            <div className="flex items-center justify-between gap-4">

                              <div>

                                <h4 className="font-black text-[#003366]">
                                  {job.title}
                                </h4>

                                <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">

                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {job.location || 'Remote'}
                                  </span>

                                  <span className="flex items-center gap-1">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    {formatSalary(job.salary)}
                                  </span>

                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {job.job_type || 'Full Time'}
                                  </span>

                                </div>

                              </div>

                              <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

                            </div>

                          </button>

                        ))}

                      </div>

                    ) : (

                      <div className="bg-slate-50 rounded-lg p-6 text-center text-sm text-slate-500">
                        No current openings available.
                      </div>

                    )}

                  </div>

                </div>

              )}

              {/* ================================================
                  INDIVIDUAL JOB DETAILS
              ================================================= */}

              {selectedJob && (

                <div>

                  {/* BACK TO COMPANY */}

                  <button
                    onClick={closeJobDetails}
                    className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#003366] mb-5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Company
                  </button>

                  {/* JOB HEADER */}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b pb-5">

                    <div>

                      <h2 className="text-2xl font-black text-[#003366]">
                        {editingSelectedJob
                          ? 'Edit Job Details'
                          : selectedJob.title}
                      </h2>

                      {!editingSelectedJob && (
                        <p className="text-sm text-slate-500 mt-1">
                          {selectedCompany?.name || 'Company'}
                        </p>
                      )}

                    </div>

                    {!editingSelectedJob ? (

                      <button
                        onClick={startEditSelectedJob}
                        className="flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>

                    ) : (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setEditingSelectedJob(false)
                          }
                          className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>

                        <button
                          onClick={saveSelectedJob}
                          disabled={savingSelectedJob}
                          className="flex items-center gap-2 bg-[#0066FF] text-white px-4 py-2 rounded-lg text-xs font-bold"
                        >
                          <Save className="w-4 h-4" />
                          {savingSelectedJob
                            ? 'Saving...'
                            : 'Save'}
                        </button>

                      </div>

                    )}

                  </div>

                  {/* EDIT FORM */}

                  {editingSelectedJob ? (

                    <div className="mt-6 space-y-5">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>

                          <label className="block text-xs font-bold text-slate-500 mb-1">
                            Job Title
                          </label>

                          <input
                            name="title"
                            value={jobEditForm.title}
                            onChange={handleJobEditChange}
                            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-[#0066FF] outline-none"
                          />

                        </div>

                        <div>

                          <label className="block text-xs font-bold text-slate-500 mb-1">
                            Location
                          </label>

                          <input
                            name="location"
                            value={jobEditForm.location}
                            onChange={handleJobEditChange}
                            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-[#0066FF] outline-none"
                          />

                        </div>

                        <div>

                          <label className="block text-xs font-bold text-slate-500 mb-1">
                            Salary
                          </label>

                          <input
                            name="salary"
                            value={jobEditForm.salary}
                            onChange={handleJobEditChange}
                            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-[#0066FF] outline-none"
                          />

                        </div>

                        <div>

                          <label className="block text-xs font-bold text-slate-500 mb-1">
                            Job Type
                          </label>

                          <input
                            name="job_type"
                            value={jobEditForm.job_type}
                            onChange={handleJobEditChange}
                            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-[#0066FF] outline-none"
                          />

                        </div>

                        <div>

                          <label className="block text-xs font-bold text-slate-500 mb-1">
                            Skills
                          </label>

                          <input
                            name="skills"
                            value={jobEditForm.skills}
                            onChange={handleJobEditChange}
                            placeholder="React, Python, FastAPI"
                            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-[#0066FF] outline-none"
                          />

                        </div>

                        <div>

                          <label className="block text-xs font-bold text-slate-500 mb-1">
                            Expiry Date
                          </label>

                          <input
                            type="date"
                            name="expiry_date"
                            value={jobEditForm.expiry_date || ''}
                            onChange={handleJobEditChange}
                            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-[#0066FF] outline-none"
                          />

                        </div>

                      </div>

                      <div>

                        <label className="block text-xs font-bold text-slate-500 mb-1">
                          Job Description
                        </label>

                        <textarea
                          name="description"
                          value={jobEditForm.description}
                          onChange={handleJobEditChange}
                          className="w-full border border-slate-200 rounded-lg p-3 text-sm min-h-[160px] focus:border-[#0066FF] outline-none"
                        />

                      </div>

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setEditingSelectedJob(false)
                          }
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>

                        <button
                          onClick={saveSelectedJob}
                          disabled={savingSelectedJob}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0066FF] text-white text-xs font-bold"
                        >
                          <Save className="w-4 h-4" />
                          {savingSelectedJob
                            ? 'Saving...'
                            : 'Save Changes'}
                        </button>

                      </div>

                    </div>

                  ) : (

                    /* ==========================================
                       VIEW JOB DETAILS
                    =========================================== */

                    <div className="mt-6 space-y-6">

                      <div>

                        <h3 className="text-sm font-black text-[#003366] mb-2">
                          Job Description
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {selectedJob.description ||
                            'No job description available.'}
                        </p>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <Specification
                          icon={<MapPin className="w-4 h-4" />}
                          label="Location"
                          value={
                            selectedJob.location ||
                            'Not specified'
                          }
                        />

                        <Specification
                          icon={<DollarSign className="w-4 h-4" />}
                          label="Salary"
                          value={formatSalary(
                            selectedJob.salary
                          )}
                        />

                        <Specification
                          icon={<Clock className="w-4 h-4" />}
                          label="Job Type"
                          value={
                            selectedJob.job_type ||
                            'Not specified'
                          }
                        />

                        <Specification
                          icon={<Calendar className="w-4 h-4" />}
                          label="Application Deadline"
                          value={
                            selectedJob.expiry_date ||
                            'Not specified'
                          }
                        />

                      </div>

                      <div>

                        <h3 className="text-sm font-black text-[#003366] mb-2">
                          Required Skills
                        </h3>

                        <div className="flex flex-wrap gap-2">

                          {Array.isArray(selectedJob.skills) ? (

                            selectedJob.skills.map(
                              (skill, index) => (

                                <span
                                  key={index}
                                  className="bg-[#F4F7FC] text-[#003366] border border-[#0066FF]/20 px-3 py-1.5 rounded-full text-xs font-bold"
                                >
                                  {skill}
                                </span>

                              )
                            )

                          ) : (

                            <span className="text-sm text-slate-500">
                              {selectedJob.skills ||
                                'Not specified'}
                            </span>

                          )}

                        </div>

                      </div>

                      {/* MANAGE APPLICANTS */}

                      <div className="border-t pt-5">

                        <Link
                          to={`/manager/applicants/${selectedJob.id}`}
                          className="inline-flex items-center gap-2 bg-[#003366] text-white px-5 py-2.5 rounded-lg text-xs font-bold"
                        >
                          <Users className="w-4 h-4" />
                          Manage Applicants
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                      </div>

                    </div>

                  )}

                </div>

              )}

            </section>

          )}

        </main>

      </div>

    </div>
  )
}

// =============================================================
// SPECIFICATION COMPONENT
// =============================================================

function Specification({
  icon,
  label,
  value
}) {
  return (
    <div className="bg-[#F4F7FC]/60 border border-[#0066FF]/15 rounded-lg p-4">

      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-1">

        <span className="text-[#003366]">
          {icon}
        </span>

        {label}

      </div>

      <p className="text-sm font-bold text-slate-700 break-words">
        {value}
      </p>

    </div>
  )
}

export default ManagerDashboard
