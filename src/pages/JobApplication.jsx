import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

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
      setSuccess('Application submitted successfully')
      setTimeout(() => navigate('/user/dashboard'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Resume URL</label>
        <input
          type="text"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          placeholder="Link to your resume"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <label className="block mb-1">Cover Letter</label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows="5"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}

export default JobApplication
