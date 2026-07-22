import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, AlertCircle, ArrowRight } from 'lucide-react'

function VerifyCodePage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Retrieve email passed from Forgot Password page
  const email = location.state?.email || ''
  const devCode = location.state?.devCode || ''
  
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleVerify = (e) => {
    e.preventDefault()
    setError('')

    if (!code || code.trim().length !== 6) {
      setError('Please enter the 6-digit verification code sent to your email')
      return
    }

    // Go to Reset Password page passing email and the verified code
    navigate('/reset-password', { state: { email, code: code.trim() } })
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

        <form onSubmit={handleVerify} className="space-y-5 max-w-md w-full">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-600">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-semibold text-center tracking-widest font-mono text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-150"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-150"
            >
              Change Email
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyCodePage
