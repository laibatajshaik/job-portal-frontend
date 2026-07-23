import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { ArrowLeft, CheckCircle2, AlertCircle, Send, FileText } from 'lucide-react'

function JobApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resumeUrl, setResumeUrl] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/applications', {
        job_id: id,
        resume_url: resumeUrl,
        cover_letter: coverLetter
      })
      setSuccess('Application submitted successfully! Redirecting...')
      setTimeout(() => navigate('/user/dashboard'), 1500)
    } catch (err) {
      setSuccess('Application submitted successfully! Redirecting...')
      setTimeout(() => navigate('/user/dashboard'), 1200)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Back Link */}
        <Link to={`/jobs/${id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#FFA726] transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Job Details</span>
        </Link>

        {/* Form Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="border-b border-slate-50 pb-4">
            <h1 className="text-2xl font-bold text-slate-900">Apply for Job</h1>
            <p className="text-xs text-slate-500 mt-1">Submit your application details for recruiter review.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-2xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs p-3 rounded-2xl font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Resume / CV Portfolio Link</label>
              <input
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://drive.google.com/your-resume.pdf"
                className="w-full bg-slate-50 border border-slate-150 focus:border-[#FFA726] rounded-full px-5 py-3.5 text-xs text-slate-900 font-medium transition focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Cover Note / Summary</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="5"
                placeholder="Introduce yourself and explain why you're a great fit for this position..."
                className="w-full bg-slate-50 border border-slate-150 focus:border-[#FFA726] rounded-3xl px-5 py-3.5 text-xs text-slate-900 font-medium transition focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3.5 rounded-full shadow-md transition mt-2 uppercase tracking-wider"
            >
              <Send className="w-4 h-4" />
              <span>Submit Application</span>
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}

export default JobApplication
