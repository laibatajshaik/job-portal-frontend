import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'
import { PlusCircle, Building2, Users, Briefcase } from 'lucide-react'

function ManagerDashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyJobs()
  }, [])

  const fetchMyJobs = async () => {
    setLoading(true)
    try {
      const res = await api.get('/jobs/')
      if (Array.isArray(res.data)) {
        setJobs(res.data)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const formatSalary = (salary) => {
    if (!salary) return '₹90,000'
    if (typeof salary === 'number') return `₹${salary.toLocaleString('en-IN')}`
    const strSal = String(salary).trim()
    if (strSal.startsWith('₹')) return strSal
    if (strSal.startsWith('$')) return `₹${strSal.substring(1)}`
    return `₹${strSal}`
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Dashboard Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manager Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">Manage job postings, review applicants, and update company profile.</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/manager/post-job"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Job</span>
            </Link>

            <Link
              to="/manager/company-profile"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition"
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Company Profile</span>
            </Link>
          </div>
        </div>

        {/* Posted Jobs Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Posted Job Openings</h2>

          {loading ? (
            <Loader />
          ) : jobs.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">You haven't posted any jobs yet.</p>
              <Link
                to="/manager/post-job"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <span>Post a job opening now</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                    <th className="p-3 font-semibold">Job Title</th>
                    <th className="p-3 font-semibold">Location</th>
                    <th className="p-3 font-semibold">Salary Offered</th>
                    <th className="p-3 font-semibold">Job Type</th>
                    <th className="p-3 font-semibold text-right">Applicants</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-bold text-slate-900">{job.title}</td>
                      <td className="p-3 text-slate-600">{job.location}</td>
                      <td className="p-3 font-semibold text-emerald-700">{formatSalary(job.salary)}</td>
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                          {job.job_type || 'Full Time'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to={`/manager/applicants/${index}`}
                          className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-1 rounded-lg text-xs font-bold transition"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>View Candidates</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ManagerDashboard