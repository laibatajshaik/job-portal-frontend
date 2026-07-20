import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

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
      await api.post('/manager/jobs', {
        title,
        description,
        location,
        salary,
        job_type: jobType
      })
      navigate('/manager/dashboard')
    } catch (err) {
  alert(JSON.stringify(err.response?.data || err.message))
}
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        ></textarea>
        <label className="block mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <label className="block mb-1">Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <label className="block mb-1">Job Type</label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        >
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded"
        >
          Post Job
        </button>
      </form>
    </div>
  )
}

export default JobPosting
