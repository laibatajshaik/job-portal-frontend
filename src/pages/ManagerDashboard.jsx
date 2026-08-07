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

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  const [company, setCompany] = useState(null)
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)

  const [selectedJob, setSelectedJob] = useState(null)

  const [loading, setLoading] = useState(true)
  const [companyLoading, setCompanyLoading] = useState(false)
  const [savingCompany, setSavingCompany] = useState(false)

  const [activeTab, setActiveTab] = useState('pipeline')

  const [activeStepFilter, setActiveStepFilter] = useState('All')
  const [activeDeptFilter, setActiveDeptFilter] = useState('All')

  const [editingCompany, setEditingCompany] = useState(false)

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

  useEffect(() => {
    fetchJobs()
    fetchApplications()
    fetchCompany()
    fetchCompanies()
  }, [])

  /* =========================
     FETCH JOBS
  ========================= */

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

  /* =========================
     FETCH APPLICATIONS
  ========================= */

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

  /* =========================
     FETCH CURRENT COMPANY
  ========================= */

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

  /* =========================
     FETCH ALL COMPANIES
  ========================= */

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

  /* =========================
     COMPANY CLICK
  ========================= */

  const handleCompanyClick = async (companyName) => {
    try {
      setCompanyLoading(true)
      setSelectedCompany(null)
      setSelectedJob(null)

      const res = await api.get(
        `/manager/companies/${encodeURIComponent(companyName)}`
      )

      if (res.data?.company) {
        setSelectedCompany(res.data.company)
      } else {
        setSelectedCompany(res.data)
      }
    } catch (err) {
      console.log('Failed to fetch company:', err)

      alert(
        err.response?.data?.detail ||
        'Failed to load company specifications.'
      )
    } finally {
      setCompanyLoading(false)
    }
  }

  /* =========================
     COMPANY TAB
  ========================= */

  const handleCompanyTab = () => {
    setActiveTab('company-specifications')
    setSelectedCompany(null)
    setSelectedJob(null)
    fetchCompanies()
  }

  /* =========================
     FORMAT SALARY
  ========================= */

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified'

    const value = String(salary).trim()

    if (value.toLowerCase().includes('lpa')) {
      return value.startsWith('₹') ? value : `₹${value}`
    }

    const number = parseInt(
      value.replace(/[^0-9]/g, ''),
      10
    )

    if (isNaN(number)) return value

    if (number >= 100000) {
      const lpa = (number / 100000).toFixed(1)

      return `₹${
        lpa.endsWith('.0')
          ? lpa.slice(0, -2)
          : lpa
      } LPA`
    }

    return `₹${number}`
  }

  /* =========================
     FILTER JOBS
  ========================= */

  const getFilteredJobs = () => {
    return jobs.filter(job => {
      const jobApps = applications.filter(
        app => app.job_id === job.id
      )

      if (activeStepFilter !== 'All') {
        if (activeStepFilter === 'Sourced') {
          if (
            !jobApps.some(
              app =>
                app.status === 'Pending' ||
                app.status === 'Applied'
            )
          ) {
            return false
          }
        }

        if (activeStepFilter === '1st Interview') {
          if (
            !jobApps.some(
              app => app.status === 'Interviewing'
            )
          ) {
            return false
          }
        }

        if (activeStepFilter === 'Offer') {
          if (
            !jobApps.some(
              app =>
                app.status === 'Shortlisted' ||
                app.status === 'Selected'
            )
          ) {
            return false
          }
        }
      }

      if (activeDeptFilter !== 'All') {
        if (activeDeptFilter === 'Research') {
          if (
            !jobApps.some(
              app =>
                (app.candidate_name || '').length % 2 !== 0
            )
          ) {
            return false
          }
        }

        if (activeDeptFilter === 'Strategic') {
          if (
            !jobApps.some(
              app =>
                (app.candidate_name || '').length % 2 === 0
            )
          ) {
            return false
          }
        }

        if (activeDeptFilter === 'Support') {
          if (
            !jobApps.some(
              app => app.status === 'Rejected'
            )
          ) {
            return false
          }
        }
      }

      return true
    })
  }

  /* =========================
     DELETE JOB
  ========================= */

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

      alert('Job deleted successfully.')
    } catch (err) {
      console.log(err)

      alert(
        err.response?.data?.detail ||
        'Failed to delete job posting.'
      )
    }
  }

  /* =========================
     COMPANY EDIT
  ========================= */

  const startEditCompany = () => {
    setCompanyForm({
      name: company?.name || '',
      website: company?.website || '',
      description: company?.description || '',
      industry: company?.industry || '',
      company_size: company?.company_size || '',
      location: company?.location || '',
      email: company?.email || '',
      company_type: company?.company_type || '',
      founded_year: company?.founded_year || '',
      recruitment_status:
        company?.recruitment_status || 'Active',
      benefits: Array.isArray(company?.benefits)
        ? company.benefits.join(', ')
        : company?.benefits || ''
    })

    setEditingCompany(true)
  }

  const handleCompanyChange = (e) => {
    const { name, value } = e.target

    setCompanyForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

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

      if (res.data?.company) {
        setCompany(res.data.company)
      } else {
        setCompany(payload)
      }

      setEditingCompany(false)

      await fetchCompanies()

      alert(
        'Company specifications updated successfully.'
      )
    } catch (err) {
      console.log(err)

      alert(
        err.response?.data?.detail ||
        'Failed to update company specifications.'
      )
    } finally {
      setSavingCompany(false)
    }
  }

  /* =========================
     OPEN JOB DETAILS
  ========================= */

  const handleJobClick = (job) => {
    setSelectedJob(job)
  }

  const closeJobDetails = () => {
    setSelectedJob(null)
  }

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">

      {/* SIDEBAR */}

      <aside className="w-64 bg-[#003366] text-white flex flex-col justify-between shrink-0 sticky top-0 h-screen shadow-lg p-5">

        <div className="space-y-6">

          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">

            <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center">

              <Briefcase className="w-4 h-4" />

            </div>

            <span className="font-extrabold text-sm">
              Manager Workspace
            </span>

          </div>

          <nav className="flex flex-col gap-2 text-xs font-bold">

            <button
              onClick={() => {
                setActiveTab('pipeline')
                setSelectedCompany(null)
                setSelectedJob(null)
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg w-full text-left ${
                activeTab === 'pipeline'
                  ? 'bg-[#0066FF] text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              Job Openings
            </button>

            <button
              onClick={() => {
                setActiveTab('database')
                setSelectedCompany(null)
                setSelectedJob(null)
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg w-full text-left ${
                activeTab === 'database'
                  ? 'bg-[#0066FF] text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Database
            </button>

            <button
              onClick={handleCompanyTab}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg w-full text-left ${
                activeTab === 'company-specifications'
                  ? 'bg-[#0066FF] text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Company Specifications
            </button>

            <Link
              to="/manager/post-job"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10"
            >
              <PlusCircle className="w-4 h-4 text-[#0066FF]" />
              Publish Job
            </Link>

          </nav>

        </div>

        <button
          onClick={handleLogout}
          className="border-t border-white/10 pt-4 flex items-center gap-2 text-rose-300 text-xs font-bold"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <div className="flex-1 min-w-0 overflow-y-auto">

        <header className="bg-white border-b px-6 py-4 flex justify-between sticky top-0 z-30">

          <h1 className="text-base font-black text-[#003366] uppercase">
            Manager Dashboard
          </h1>

          <span className="text-xs font-bold bg-blue-50 px-3 py-2 rounded-full">
            Logged in: {user?.email || 'manager@gmail.com'}
          </span>

        </header>

        <main className="p-6 space-y-6">

          {/* =================================================
              JOB OPENINGS
          ================================================= */}

          {activeTab === 'pipeline' && (

            <>

              <section className="bg-white rounded-xl border p-5 shadow-sm">

                <h2 className="text-xs font-black text-[#003366] mb-4">
                  FILTER ACTIVE JOBS
                </h2>

                <div className="flex flex-wrap gap-8">

                  <div>

                    <p className="text-[10px] text-slate-400 font-bold mb-2">
                      FILTER BY STEP
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {[
                        'All',
                        'Sourced',
                        '1st Interview',
                        'Offer'
                      ].map(item => (

                        <button
                          key={item}
                          onClick={() =>
                            setActiveStepFilter(item)
                          }
                          className={`px-3 py-1.5 rounded text-[10px] ${
                            activeStepFilter === item
                              ? 'bg-[#003366] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item}
                        </button>

                      ))}

                    </div>

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-400 font-bold mb-2">
                      FILTER BY DEPARTMENT
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {[
                        'All',
                        'Research',
                        'Strategic',
                        'Support'
                      ].map(item => (

                        <button
                          key={item}
                          onClick={() =>
                            setActiveDeptFilter(item)
                          }
                          className={`px-3 py-1.5 rounded text-[10px] ${
                            activeDeptFilter === item
                              ? 'bg-[#003366] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item}
                        </button>

                      ))}

                    </div>

                  </div>

                </div>

              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-white rounded-xl border p-4 flex items-center gap-4">

                  <Briefcase className="text-[#0066FF]" />

                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">
                      ACTIVE JOBS
                    </p>

                    <p className="text-xl font-black text-[#003366]">
                      {jobs.length}
                    </p>
                  </div>

                </div>

                <div className="bg-white rounded-xl border p-4 flex items-center gap-4">

                  <Users className="text-[#0066FF]" />

                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">
                      APPLICATIONS
                    </p>

                    <p className="text-xl font-black text-[#003366]">
                      {applications.length}
                    </p>
                  </div>

                </div>

              </section>

              <section className="bg-white rounded-xl border shadow-sm p-6">

                <div className="flex justify-between items-center border-b pb-4 mb-4">

                  <h2 className="text-base font-black text-[#003366] uppercase">
                    Active Recruitment Openings
                  </h2>

                  <span className="text-xs font-bold text-slate-500">
                    {getFilteredJobs().length} Positions
                  </span>

                </div>

                {getFilteredJobs().length === 0 ? (

                  <div className="text-center py-12">

                    <p className="text-sm font-semibold text-slate-500">
                      No matching job openings.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {getFilteredJobs().map(job => (

                      <div
                        key={job.id}
                        className="border rounded-xl p-5 hover:shadow-md transition bg-slate-50"
                      >

                        <div className="flex flex-col md:flex-row justify-between gap-4">

                          {/* CLICK JOB */}

                          <button
                            onClick={() =>
                              handleJobClick(job)
                            }
                            className="text-left flex-1"
                          >

                            <h3 className="font-black text-[#003366] text-base hover:text-[#0066FF]">
                              {job.title}
                            </h3>

                            <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">

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

                            {job.expiry_date && (

                              <div className="flex items-center gap-1 text-xs text-slate-500 mt-3">

                                <Calendar className="w-3.5 h-3.5" />

                                Deadline:
                                {' '}
                                {job.expiry_date}

                              </div>

                            )}

                            <p className="text-xs text-[#0066FF] font-bold mt-3">
                              Click to view job details →
                            </p>

                          </button>

                          <div className="flex items-center gap-2">

                            <Link
                              to={`/manager/applicants/${job.id}`}
                              className="bg-[#003366] text-white px-4 py-2 rounded-lg text-xs font-bold"
                            >
                              Manage Applicants
                            </Link>

                            <button
                              onClick={() =>
                                handleDeleteJob(job.id)
                              }
                              className="p-2 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </section>

            </>

          )}

          {/* =================================================
              DATABASE
          ================================================= */}

          {activeTab === 'database' && (

            <section className="bg-white rounded-xl border shadow-sm p-6">

              <h2 className="text-base font-black text-[#003366] uppercase mb-5">
                Positions Database
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full text-left text-xs">

                  <thead>

                    <tr className="bg-slate-50 border-b">

                      <th className="p-3">Position</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Salary</th>
                      <th className="p-3">Type</th>

                    </tr>

                  </thead>

                  <tbody>

                    {getFilteredJobs().map(job => (

                      <tr
                        key={job.id}
                        className="border-b hover:bg-slate-50 cursor-pointer"
                        onClick={() =>
                          handleJobClick(job)
                        }
                      >

                        <td className="p-3 font-bold text-[#003366]">
                          {job.title}
                        </td>

                        <td className="p-3">
                          {job.location || 'Remote'}
                        </td>

                        <td className="p-3">
                          {formatSalary(job.salary)}
                        </td>

                        <td className="p-3">
                          {job.job_type || 'Full Time'}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          )}

          {/* =================================================
              COMPANY SPECIFICATIONS
          ================================================= */}

          {activeTab === 'company-specifications' && (

            <section className="bg-white rounded-xl border shadow-sm p-6">

              {!selectedCompany && (

                <>

                  <div className="flex justify-between items-center mb-6">

                    <div>
                      <h2 className="text-xl font-black text-[#003366]">
                        Company Specifications
                      </h2>

                      <p className="text-xs text-slate-500 mt-1">
                        Select a company to view its specifications
                      </p>
                    </div>

                    {company && (

                      <button
                        onClick={startEditCompany}
                        className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit My Company
                      </button>

                    )}

                  </div>

                  {companies.length === 0 ? (

                    <p className="text-center py-10 text-slate-500">
                      No companies available.
                    </p>

                  ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                      {companies.map((item, index) => {

                        const name =
                          item.name ||
                          item.company_name ||
                          `Company ${index + 1}`

                        const location =
                          item.location ||
                          'Location not available'

                        const industry =
                          item.industry ||
                          'Information Technology'

                        const totalJobs =
                          item.total_jobs ??
                          item.job_count ??
                          0

                        return (

                          <button
                            key={item.id || name}
                            onClick={() =>
                              handleCompanyClick(name)
                            }
                            className="text-left border rounded-xl p-5 hover:border-[#0066FF] hover:shadow-md transition"
                          >

                            <div className="flex items-start justify-between">

                              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

                                <Building2 className="w-5 h-5 text-[#0066FF]" />

                              </div>

                              <ArrowRight className="w-4 h-4 text-slate-400" />

                            </div>

                            <h3 className="font-black text-[#003366] mt-4">
                              {name}
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                              {industry}
                            </p>

                            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {location}
                            </p>

                            <p className="text-xs font-bold text-[#0066FF] mt-4">
                              {totalJobs} Jobs
                            </p>

                          </button>

                        )

                      })}

                    </div>

                  )}

                </>

              )}

              {/* COMPANY DETAILS */}

              {selectedCompany && !selectedJob && (

                <>

                  <button
                    onClick={() =>
                      setSelectedCompany(null)
                    }
                    className="flex items-center gap-2 text-xs font-bold text-[#003366] mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Companies
                  </button>

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-black text-[#003366]">
                        {selectedCompany.name}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {selectedCompany.industry ||
                          'Information Technology'}
                      </p>

                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

                    <Info
                      label="Company Type"
                      value={selectedCompany.company_type}
                    />

                    <Info
                      label="Company Size"
                      value={selectedCompany.company_size}
                    />

                    <Info
                      label="Location"
                      value={selectedCompany.location}
                    />

                    <Info
                      label="Founded Year"
                      value={selectedCompany.founded_year}
                    />

                    <Info
                      label="Email"
                      value={selectedCompany.email}
                    />

                    <Info
                      label="Website"
                      value={selectedCompany.website}
                    />

                  </div>

                  <div className="mt-8 border-t pt-6">

                    <h3 className="font-black text-[#003366]">
                      About Company
                    </h3>

                    <p className="text-sm text-slate-600 mt-3">
                      {selectedCompany.description ||
                        'No company description available.'}
                    </p>

                  </div>

                  <div className="mt-6">

                    <h3 className="font-black text-[#003366]">
                      Recruitment Status
                    </h3>

                    <p className="text-sm text-green-600 font-bold mt-2">
                      ✓ {selectedCompany.recruitment_status || 'Active'}
                    </p>

                  </div>

                  {/* CURRENT OPENINGS */}

                  <div className="mt-8 border-t pt-6">

                    <div className="flex justify-between items-center mb-5">

                      <h3 className="text-lg font-black text-[#003366]">
                        Current Openings
                      </h3>

                      <span className="text-xs font-bold text-slate-500">
                        {(
                          selectedCompany.jobs ||
                          []
                        ).length}{' '}
                        Jobs
                      </span>

                    </div>

                    {(
                      selectedCompany.jobs || []
                    ).length === 0 ? (

                      <div className="border rounded-xl p-8 text-center text-sm text-slate-500">
                        No current openings available.
                      </div>

                    ) : (

                      <div className="space-y-3">

                        {selectedCompany.jobs.map(
                          job => (

                            <button
                              key={job.id}
                              onClick={() =>
                                handleJobClick(job)
                              }
                              className="w-full text-left border rounded-xl p-5 hover:border-[#0066FF] hover:shadow-md transition bg-slate-50"
                            >

                              <div className="flex justify-between gap-4">

                                <div>

                                  <h4 className="font-black text-[#003366]">
                                    {job.title}
                                  </h4>

                                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">

                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3.5 h-3.5" />
                                      {job.location || 'Remote'}
                                    </span>

                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      {job.job_type || 'Full Time'}
                                    </span>

                                  </div>

                                  <p className="text-xs text-slate-600 mt-3">

                                    <b>Skills:</b>{' '}

                                    {Array.isArray(job.skills)
                                      ? job.skills.join(', ')
                                      : job.skills || 'Not specified'}

                                  </p>

                                  {job.expiry_date && (

                                    <p className="text-xs text-slate-500 mt-2">
                                      Expiry Date: {job.expiry_date}
                                    </p>

                                  )}

                                </div>

                                <ArrowRight className="w-5 h-5 text-[#0066FF]" />

                              </div>

                            </button>

                          )
                        )}

                      </div>

                    )}

                  </div>

                </>

              )}

            </section>

          )}

        </main>

      </div>

      {/* =====================================================
          JOB DETAILS MODAL
      ====================================================== */}

      {selectedJob && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

            <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">

              <div>

                <p className="text-xs text-[#0066FF] font-bold uppercase">
                  Job Details
                </p>

                <h2 className="text-xl font-black text-[#003366] mt-1">
                  {selectedJob.title}
                </h2>

              </div>

              <button
                onClick={closeJobDetails}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            <div className="p-6 space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Info
                  label="Location"
                  value={selectedJob.location}
                />

                <Info
                  label="Salary"
                  value={formatSalary(selectedJob.salary)}
                />

                <Info
                  label="Job Type"
                  value={selectedJob.job_type}
                />

                <Info
                  label="Expiry Date"
                  value={selectedJob.expiry_date}
                />

              </div>

              <div>

                <h3 className="font-black text-[#003366] mb-2">
                  Description
                </h3>

                <p className="text-sm text-slate-600 whitespace-pre-line">
                  {selectedJob.description ||
                    'No description available.'}
                </p>

              </div>

              <div>

                <h3 className="font-black text-[#003366] mb-2">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {(
                    Array.isArray(selectedJob.skills)
                      ? selectedJob.skills
                      : String(
                          selectedJob.skills || ''
                        )
                          .split(',')
                          .map(x => x.trim())
                          .filter(Boolean)
                  ).map((skill, index) => (

                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-[#003366] rounded-full text-xs font-bold"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">

                <button
                  onClick={closeJobDetails}
                  className="px-4 py-2 rounded-lg border text-xs font-bold"
                >
                  Close
                </button>

                <Link
                  to={`/manager/applicants/${selectedJob.id}`}
                  className="px-4 py-2 rounded-lg bg-[#003366] text-white text-xs font-bold"
                >
                  Manage Applicants
                </Link>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          EDIT COMPANY MODAL
      ====================================================== */}

      {editingCompany && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            <div className="sticky top-0 bg-white border-b p-5 flex justify-between">

              <h2 className="text-lg font-black text-[#003366]">
                Edit Company Specifications
              </h2>

              <button
                onClick={() =>
                  setEditingCompany(false)
                }
              >
                <X />
              </button>

            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

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

                  <label className="text-xs font-bold text-slate-600">
                    {label}
                  </label>

                  <input
                    name={name}
                    value={companyForm[name]}
                    onChange={handleCompanyChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0066FF]"
                  />

                </div>

              ))}

              <div className="md:col-span-2">

                <label className="text-xs font-bold text-slate-600">
                  Description
                </label>

                <textarea
                  name="description"
                  value={companyForm.description}
                  onChange={handleCompanyChange}
                  rows="4"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                />

              </div>

              <div className="md:col-span-2">

                <label className="text-xs font-bold text-slate-600">
                  Benefits
                </label>

                <input
                  name="benefits"
                  value={companyForm.benefits}
                  onChange={handleCompanyChange}
                  placeholder="Health Insurance, Remote Work, Paid Leave"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                />

              </div>

            </div>

            <div className="border-t p-5 flex justify-end gap-3">

              <button
                onClick={() =>
                  setEditingCompany(false)
                }
                className="px-4 py-2 border rounded-lg text-xs font-bold"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCompany}
                disabled={savingCompany}
                className="flex items-center gap-2 px-5 py-2 bg-[#003366] text-white rounded-lg text-xs font-bold"
              >

                <Save className="w-4 h-4" />

                {savingCompany
                  ? 'Saving...'
                  : 'Save Changes'}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

/* =========================================================
   REUSABLE INFO COMPONENT
========================================================= */

function Info({ label, value }) {
  return (
    <div className="border rounded-lg p-4">

      <p className="text-[10px] uppercase font-bold text-slate-400">
        {label}
      </p>

      <p className="text-sm font-bold text-[#003366] mt-1">
        {value || 'Not available'}
      </p>

    </div>
  )
}

export default ManagerDashboard
