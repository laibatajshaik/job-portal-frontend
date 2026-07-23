import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { Briefcase, ArrowLeft, CheckCircle2 } from 'lucide-react'

function JobPosting() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [jobType, setJobType] = useState('Full Time')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const parsedSalary = parseInt(salary.toString().replace(/[^0-9]/g, ''), 10) || 90000
      await api.post('/manager/jobs', {
        title,
        description,
        location,
        salary: parsedSalary,
        job_type: jobType,
        skills: ''
      })
      navigate('/jobs')
    } catch (err) {
      console.log(err)
      navigate('/jobs')
    }
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Back Link */}
        <Link to="/manager/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-black transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Manager Dashboard</span>
        </Link>

        {/* Form Card */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="border-b border-neutral-100 pb-4">
            <h1 className="text-2xl font-extrabold text-black">Post a New Job</h1>
            <p className="text-xs text-neutral-500 mt-1">Publish a job opening for candidates to explore and apply.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full bg-white border border-neutral-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-medium transition focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Job Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Describe key responsibilities and required experience..."
                className="w-full bg-white border border-neutral-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-medium transition focus:outline-none"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Remote or Bangalore, KA"
                  className="w-full bg-white border border-neutral-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-medium transition focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Salary (in ₹ / Rupees)</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 900000 or ₹9,00,000"
                  className="w-full bg-white border border-neutral-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-medium transition focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-white border border-neutral-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-medium transition focus:outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl shadow-md transition mt-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Job Opening</span>
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}

export default JobPosting
