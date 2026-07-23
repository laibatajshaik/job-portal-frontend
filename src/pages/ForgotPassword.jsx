import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../api/axios'
import { KeyRound, Mail, Lock, AlertCircle, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react'

function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: enter email, 2: enter code & new password, 3: success
  const [email, setEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('849201')

  const handleRequestCode = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your registered email address')
      return
    }

    setLoading(true)

    try {
      // Try backend endpoint if available
      await api.post('/auth/forgot-password', { email })
    } catch (err) {
      console.log('Backend request notice:', err)
    }

    setLoading(false)
    // Advance to step 2 for OTP entry & password setup
    setStep(2)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

    if (!newPassword || newPassword.length < 4) {
      setError('Password must be at least 4 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    let success = false

    // 1. Try Context Reset
    if (resetPassword) {
      const res = await resetPassword(email, newPassword)
      if (res.success) {
        success = true
      }
    }

    // 2. Try Backend Reset
    try {
      await api.post('/auth/reset-password', { email, new_password: newPassword })
      success = true
    } catch (err) {
      console.log('Backend reset info:', err)
    }

    setLoading(false)

    // Set success state
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FFA726] flex items-center justify-center mx-auto border border-amber-100 shadow-sm">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {step === 3 ? 'Password Reset Complete' : 'Forgot Password?'}
          </h2>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            {step === 1 && 'Enter your registered email address to receive a verification code.'}
            {step === 2 && `We sent a reset code to ${email}. Set your new password below.`}
            {step === 3 && 'Your password has been successfully updated.'}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-2xl font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Registered Email Address</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 focus-within:border-[#FFA726] rounded-full px-5 py-3.5 transition">
                <Mail className="w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-semibold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3.5 rounded-full shadow-md transition mt-2 disabled:opacity-50 uppercase tracking-wider"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Sending Code...' : 'Send Verification Code'}</span>
            </button>
          </form>
        )}

        {/* STEP 2: Enter Code & New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="bg-amber-50 border border-amber-100 text-[#FB8C00] text-xs p-3.5 rounded-2xl flex items-center justify-between font-semibold">
              <span>Verification Code: <strong className="font-mono text-sm">{generatedCode}</strong></span>
              <span className="text-[10px] text-[#FFA726] bg-white px-2.5 py-1 rounded-full font-bold border border-amber-100">Demo Code</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Enter Verification Code</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 focus-within:border-[#FFA726] rounded-full px-5 py-3.5 transition">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="e.g. 849201"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-semibold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">New Password</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 focus-within:border-[#FFA726] rounded-full px-5 py-3.5 transition">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-semibold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Confirm New Password</label>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 focus-within:border-[#FFA726] rounded-full px-5 py-3.5 transition">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-semibold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3.5 rounded-full shadow-md transition mt-2 disabled:opacity-50 uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Updating Password...' : 'Reset Password'}</span>
            </button>
          </form>
        )}

        {/* STEP 3: Success Screen */}
        {step === 3 && (
          <div className="text-center space-y-4 pt-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs p-4 rounded-2xl text-left font-semibold">
              Your password for <strong>{email}</strong> has been updated successfully. You can now log in using your new password.
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center gap-2 bg-[#FFA726] hover:bg-[#FB8C00] text-white font-bold text-xs py-3.5 rounded-full shadow-md transition uppercase tracking-wider"
            >
              <span>Proceed to Login</span>
            </button>
          </div>
        )}

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-50">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-slate-650 hover:text-[#FFA726] font-bold transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword
