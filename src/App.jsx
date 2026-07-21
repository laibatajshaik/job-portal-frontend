import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import JobListing from './pages/JobListing'
import JobDetails from './pages/JobDetails'
import JobApplication from './pages/JobApplication'
import UserDashboard from './pages/UserDashboard'
import ApplicationStatus from './pages/ApplicationStatus'
import ManagerDashboard from './pages/ManagerDashboard'
import CompanyProfile from './pages/CompanyProfile'
import JobPosting from './pages/JobPosting'
import ApplicantManagement from './pages/ApplicantManagement'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

function App() {
  const location = useLocation()
  const isDashboardRoute = location.pathname.includes('/dashboard') || location.pathname.includes('/manager/') || location.pathname.includes('/user/') || location.pathname.includes('/admin/dashboard')

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isDashboardRoute && <Navbar />}
      <div className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/apply/:id"
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <JobApplication />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/status"
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <ApplicationStatus />
                </PrivateRoute>
              }
            />

            <Route
              path="/manager/dashboard"
              element={
                <PrivateRoute allowedRoles={['manager']}>
                  <ManagerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager/company-profile"
              element={
                <PrivateRoute allowedRoles={['manager']}>
                  <CompanyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager/post-job"
              element={
                <PrivateRoute allowedRoles={['manager']}>
                  <JobPosting />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager/applicants/:jobId"
              element={
                <PrivateRoute allowedRoles={['manager']}>
                  <ApplicantManagement />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
      {!isDashboardRoute && <Footer />}
    </div>
  )
}

export default App
