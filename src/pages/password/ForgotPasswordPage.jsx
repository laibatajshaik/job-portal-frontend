import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { KeyRound, Mail, AlertCircle, ArrowLeft } from 'lucide-react'

function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRequestCode = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your registered email address')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email })
      setLoading(false)
      // Redirect to Reset Password Page with prefilled email state
      navigate('/reset-password', { state: { email } })
    } catch (err) {
      console.warn('Backend forgot-password failed, running fallback navigation:', err)
      setLoading(false)
      navigate('/reset-password', { state: { email } })
    }
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
            Forgot Password?
          </h2>
          <p className="text-xs text-slate-500">
            Enter your registered email address to receive a verification code.
          </p>
        </div>

        {error && (
          <div className="flex flex-col gap-1.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <p className="text-[10px] text-rose-500 font-medium pl-6">Tip: If you recently pushed changes, press Ctrl + Shift + R to clear browser cache and load the latest live build.</p>
          </div>
        )}

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
