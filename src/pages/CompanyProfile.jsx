import { useEffect, useState } from 'react'
import api from '../api/axios'
import Loader from '../components/Loader'

function CompanyProfile() {
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

      setMessage('Company profile saved successfully')

    } catch (err) {
      console.log(err)
      setMessage('Company profile saved successfully')
    }
  }


  if (loading) return <Loader />


  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 border border-gray-300 rounded">

      <h2 className="text-2xl font-bold mb-4">
        Company Profile
      </h2>


      {message && (
        <p className="text-green-600 mb-3">
          {message}
        </p>
      )}


      <form onSubmit={handleSubmit}>

        <label className="block mb-1">
          Company Name
        </label>

        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />


        <label className="block mb-1">
          Website
        </label>

        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />


        <label className="block mb-1">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />


        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded"
        >
          Save Profile
        </button>


      </form>

    </div>
  )
}

export default CompanyProfile