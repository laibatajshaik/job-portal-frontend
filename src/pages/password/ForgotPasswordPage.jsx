import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import PasswordStrengthMeter from '../../components/password/PasswordStrengthMeter'
import { KeyRound, Mail, Lock, AlertCircle, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react'

function ForgotPasswordPage() {
  const { resetPassword } = useContext(AuthContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: Email, 2: OTP & New Password, 3: Success
  const [email, setEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedCode] = useState('849201')

  const handleRequestCode = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your registered email address')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 600)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    if (resetPassword) {
      await resetPassword(email, newPassword)
    }

    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {step === 3 ? 'Password Reset Complete' : 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {step === 1 && 'Enter your registered email address to receive a verification code.'}
            {step === 2 && `Verification code sent to ${email}. Set your new strong password.`}
            {step === 3 && 'Your password has been successfully updated.'}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registered Email Address</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-3.5 py-2.5 transition">
                <Mail className="w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl shadow-sm transition mt-2 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Sending Code...' : 'Send Verification Code'}</span>
            </button>
          </form>
        )}

        {/* STEP 2: Enter OTP Code & New Password with Strength Meter */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 text-blue-800 text-xs p-3 rounded-xl flex items-center justify-between">
              <span>Verification Code: <strong className="font-mono text-sm">{generatedCode}</strong></span>
              <span className="text-[10px] text-blue-600 bg-white px-2 py-0.5 rounded font-medium border border-blue-200">Demo OTP</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Verification Code</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-3.5 py-2.5 transition">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="e.g. 849201"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-3.5 py-2.5 transition">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                  required
                />
              </div>

              {/* Password Strength Meter */}
              <PasswordStrengthMeter password={newPassword} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-3.5 py-2.5 transition">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl shadow-sm transition mt-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Updating Password...' : 'Reset Password'}</span>
            </button>
          </form>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <div className="text-center space-y-4 pt-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xl text-left font-medium">
              Password for <strong>{email}</strong> updated successfully. You can now sign in with your new password.
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl shadow-sm transition"
            >
              <span>Proceed to Sign In</span>
            </button>
          </div>
        )}

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-semibold transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPasswordPage
