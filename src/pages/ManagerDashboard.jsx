import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loader from '../components/Loader'

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
      setJobs(res.data)
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-4">
        Manager Dashboard
      </h2>

      <div className="flex gap-3 mb-6">

        <Link
          to="/manager/post-job"
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Post New Job
        </Link>

        <Link
          to="/manager/company-profile"
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Company Profile
        </Link>

      </div>


      <h3 className="text-xl font-semibold mb-3">
        My Posted Jobs
      </h3>


      {loading ? (
        <Loader />
      ) : jobs.length === 0 ? (

        <p className="text-gray-600">
          You have not posted any jobs yet.
        </p>

      ) : (

        <table className="w-full bg-white border border-gray-300">

          <thead>
            <tr className="bg-gray-200">

              <th className="p-2 text-left border-b">
                Title
              </th>

              <th className="p-2 text-left border-b">
                Location
              </th>

              <th className="p-2 text-left border-b">
                Salary
              </th>

              <th className="p-2 text-left border-b">
                Action
              </th>

            </tr>
          </thead>


          <tbody>

            {jobs.map((job, index) => (

              <tr key={index}>

                <td className="p-2 border-b">
                  {job.title}
                </td>

                <td className="p-2 border-b">
                  {job.location}
                </td>

                <td className="p-2 border-b">
                  {job.salary}
                </td>


                <td className="p-2 border-b">

                  <Link
                    to={`/manager/applicants/${index}`}
                    className="text-blue-700 hover:underline"
                  >
                    View Applicants
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  )
}

export default ManagerDashboard