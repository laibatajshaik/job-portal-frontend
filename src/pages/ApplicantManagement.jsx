import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'

function ApplicantManagement() {
  const { jobId } = useParams()

  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplicants()
  }, [jobId])

  const fetchApplicants = async () => {
    setLoading(true)

    try {
      const res = await api.get('/manager/applicants')
      setApplicants(res.data.applicants)
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Applicants
      </h2>

      {applicants.length === 0 ? (
        <p className="text-gray-600">
          No applicants available.
        </p>
      ) : (
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">Email</th>
              <th className="p-2 text-left border-b">ATS Score</th>
              <th className="p-2 text-left border-b">Status</th>
            </tr>
          </thead>

          <tbody>
            {applicants.map((app, index) => (
              <tr key={index}>
                <td className="p-2 border-b">{app.name}</td>
                <td className="p-2 border-b">{app.email}</td>
                <td className="p-2 border-b">{app.ats_score}%</td>
                <td className="p-2 border-b">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ApplicantManagement