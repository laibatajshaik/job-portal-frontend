import { Link } from 'react-router-dom'

function Home() {
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Shnoor Technologies',
      location: 'Hyderabad',
    },
    {
      id: 2,
      title: 'Python Developer',
      company: 'Shnoor International Solutions',
      location: 'Bangalore',
    },
    {
      id: 3,
      title: 'Java Developer',
      company: 'TechSoft',
      location: 'Chennai',
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">

      
      <section id="home" className="text-center py-16">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">
          Welcome to Job Portal
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Find jobs, apply online, and track your application status with ease.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-900"
          >
            Browse Jobs
          </Link>

          <Link
            to="/register"
            className="border border-slate-800 text-slate-800 px-6 py-3 rounded hover:bg-slate-800 hover:text-white"
          >
            Register
          </Link>
        </div>
      </section>

      
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-3">
              1. Register
            </h3>
            <p className="text-gray-600">
              Create an account as a Job Seeker or Company Manager.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-3">
              2. Complete Profile
            </h3>
            <p className="text-gray-600">
              Add your profile details, skills, and resume.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-3">
              3. Apply
            </h3>
            <p className="text-gray-600">
              Browse available jobs and submit your applications.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-3">
              4. Track Status
            </h3>
            <p className="text-gray-600">
              Monitor your application progress anytime.
            </p>
          </div>

        </div>
      </section>

      
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white border rounded p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Job Search
            </h3>
            <p className="text-gray-600">
              Search jobs based on your skills and interests.
            </p>
          </div>

          <div className="bg-white border rounded p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Easy Application
            </h3>
            <p className="text-gray-600">
              Apply for jobs quickly using your profile.
            </p>
          </div>

          <div className="bg-white border rounded p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Company Profiles
            </h3>
            <p className="text-gray-600">
              View company information before applying.
            </p>
          </div>

          <div className="bg-white border rounded p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Track Applications
            </h3>
            <p className="text-gray-600">
              Check your application status in real time.
            </p>
          </div>

          <div className="bg-white border rounded p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Recruiter Dashboard
            </h3>
            <p className="text-gray-600">
              Manage job postings and applicants easily.
            </p>
          </div>

          <div className="bg-white border rounded p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Admin Dashboard
            </h3>
            <p className="text-gray-600">
              Monitor users, jobs, companies, and applications.
            </p>
          </div>

        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border rounded p-5 shadow"
            >
              <h3 className="text-xl font-semibold">
                {job.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {job.company}
              </p>

              <p className="text-gray-500">
                {job.location}
              </p>

              <Link
                to="/jobs"
                className="inline-block mt-4 text-slate-800 font-medium"
              >
                View Details
              </Link>
            </div>
          ))}

        </div>

        <div className="text-center mt-10">
          <Link
            to="/jobs"
            className="bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-900"
          >
            View All Jobs
          </Link>
        </div>
      </section>

      
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center">

          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p>Jobs</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">100+</h3>
            <p>Companies</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">1000+</h3>
            <p>Candidates</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">50+</h3>
            <p>Recruiters</p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home