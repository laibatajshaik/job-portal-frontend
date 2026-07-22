import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import PasswordStrengthMeter from '../../components/password/PasswordStrengthMeter'
import api from '../../api/axios'
import { ShieldCheck, Lock, AlertCircle, CheckCircle2, ArrowLeft, Mail } from 'lucide-react'

function ResetPasswordPage() {
  const { resetPassword } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Pull states passed from verify code page
  const initialEmail = location.state?.email || ''
  const initialCode = location.state?.code || ''

  const [email, setEmail] = useState(initialEmail)
  const [resetCode, setResetCode] = useState(initialCode)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!initialEmail || !initialCode) {
      setError('Please verify your code first before resetting your password.')
    }
  }, [initialEmail, initialCode])

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!resetCode) {
      setError('Verification code is missing. Please verify your code first.')
      return
    }

    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // 1. Expose to AuthContext locally
      if (resetPassword) {
        await resetPassword(email, newPassword)
      }
      // 2. Call backend reset API
      await api.post('/auth/reset-password', {
        email,
        code: resetCode.trim(),
        new_password: newPassword
      })
      setLoading(false)
      setSuccess(true)
    } catch (err) {
      console.warn('Backend reset failed:', err)
      setLoading(false)
      setError(err.response?.data?.detail || 'Invalid or expired verification code.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side: Black column */}
      <div className="md:w-2/5 bg-black text-white flex flex-col justify-center px-12 py-12 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          Application <br />
          Login Page
        </h1>
        <p className="text-neutral-450 text-sm leading-relaxed max-w-xs font-semibold">
          Login or register from here to access.
        </p>
      </div>

      {/* Right side: Form column */}
      <div className="md:w-3/5 flex flex-col justify-center px-12 sm:px-20 py-12 space-y-6">
        {error && (
          <div className="flex items-center gap-2.5 border border-red-200 bg-red-50 text-red-700 text-xs px-4 py-3 rounded-lg max-w-md font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-5 max-w-md w-full">
            <div className="flex items-center gap-2.5 border border-green-200 bg-green-50 text-green-700 text-xs px-4 py-3 rounded-lg max-w-md font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" />
              <span>Password for {email} has been reset successfully.</span>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="bg-black hover:bg-neutral-800 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-150"
            >
              Proceed to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5 max-w-md w-full">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-600">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-semibold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-600">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-semibold"
                required
              />
              <PasswordStrengthMeter password={newPassword} />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-600">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-semibold"
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-neutral-800 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-150 disabled:opacity-50"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-150"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordPage
