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
      const res = await api.post('/auth/forgot-password', { email })
      const devCode = res.data?.dev_code
      setLoading(false)
      navigate('/forgot-password-verify', { state: { email, devCode } })
    } catch (err) {
      console.warn('Backend forgot-password failed, running fallback navigation:', err)
      setLoading(false)
      navigate('/forgot-password-verify', { state: { email } })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#003366] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        <div className="md:w-1/2 bg-gradient-to-br from-[#0080FF] to-[#0040A0] text-white flex flex-col justify-center px-10 py-16 relative overflow-hidden shrink-0">
          <div className="absolute w-96 h-96 rounded-full bg-[#0055D0] -bottom-20 -left-20 pointer-events-none opacity-80" />
          <div className="absolute w-72 h-72 rounded-full bg-[#0055D0] -top-10 -right-10 pointer-events-none opacity-60" />
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-[#0080FF] to-[#0040A0] bottom-10 left-32 pointer-events-none shadow-xl border border-white/10 z-10" />

          <div className="relative z-20 space-y-6">
            <span className="text-[11px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full font-bold">
              Premium Job Portal
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none uppercase">
              RECOVER <br />
              <span className="text-[#003366] bg-white px-2 py-0.5 rounded mt-2 inline-block font-black text-2xl sm:text-3xl">
                YOUR PASSWORD
              </span>
            </h1>
            <p className="text-white/70 text-xs leading-relaxed max-w-xs font-semibold">
              Enter your registered email address and we will generate a verification code to help you reset your password.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-12 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#003366] tracking-tight">Forgot Password</h2>
            <p className="text-[11px] text-slate-400 font-semibold">
              Get a verification code sent to your registered email.
            </p>
          </div>

          {error && (
            <div className="flex flex-col gap-1.5 border border-rose-100 bg-rose-50 text-rose-700 text-xs px-4 py-3 rounded-2xl font-bold">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
              <p className="text-[9px] text-rose-500 font-medium pl-6">
                Tip: Press Ctrl + Shift + R if you need to reload the latest live build assets.
              </p>
            </div>
          )}

          <form onSubmit={handleRequestCode} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#003366] hover:bg-[#002244] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md hover:shadow-lg transition uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? 'Sending Code...' : 'Send Code'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold text-xs px-6 py-4 rounded-2xl transition duration-150"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <p className="text-[11px] font-bold text-slate-500">
              Remember your password?{" "}
              <Link to="/login" className="text-[#0066FF] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ForgotPasswordPage
