import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPasswordPage = lazy(() => import('./pages/password/ForgotPasswordPage'))
const VerifyCodePage = lazy(() => import('./pages/password/VerifyCodePage'))
const ChangePasswordPage = lazy(() => import('./pages/password/ChangePasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/password/ResetPasswordPage'))
const JobListing = lazy(() => import('./pages/JobListing'))
const JobDetails = lazy(() => import('./pages/JobDetails'))
const JobApplication = lazy(() => import('./pages/JobApplication'))
const UserDashboard = lazy(() => import('./pages/UserDashboard'))
const ApplicationStatus = lazy(() => import('./pages/ApplicationStatus'))
const ManagerDashboard = lazy(() => import('./pages/ManagerDashboard'))
const JobPosting = lazy(() => import('./pages/JobPosting'))
const ApplicantManagement = lazy(() => import('./pages/ApplicantManagement'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))

function App() {
  const location = useLocation()
  const isDashboardRoute = location.pathname.includes('/dashboard') || location.pathname.includes('/manager/') || location.pathname.includes('/user/') || location.pathname.includes('/admin/dashboard')

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isDashboardRoute && <Navbar />}
      <div className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/forgot-password-verify" element={<VerifyCodePage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
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
          </Suspense>
        </ErrorBoundary>
      </div>
      {!isDashboardRoute && <Footer />}
    </div>
  )
}

export default App
