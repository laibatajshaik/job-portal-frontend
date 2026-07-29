import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import PasswordStrengthMeter from '../../components/password/PasswordStrengthMeter'
import { Lock, ShieldCheck, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'

function ChangePasswordPage() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChangePassword = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!currentPassword) {
      setError('Please enter your current password')
      return
    }

    if (!newPassword || newPassword.length < 8) {
      setError('New password must be at least 8 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 600)
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
              CHANGE <br />
              <span className="text-[#003366] bg-white px-2 py-0.5 rounded mt-2 inline-block font-black text-2xl sm:text-3xl">
                YOUR PASSWORD
              </span>
            </h1>
            <p className="text-white/70 text-xs leading-relaxed max-w-xs font-semibold">
              Enter your current password and pick a strong new password to update your login credentials.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-12 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#003366] tracking-tight">Change Password</h2>
            <p className="text-[11px] text-slate-400 font-semibold">
              Update your account password securely.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 border border-rose-100 bg-rose-50 text-rose-700 text-xs px-4 py-3 rounded-2xl font-bold animate-pulse">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-2.5 border border-emerald-100 bg-emerald-50 text-emerald-700 text-xs px-4 py-3 rounded-2xl font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Your password has been changed successfully!</span>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="w-full bg-[#003366] hover:bg-[#002244] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md hover:shadow-lg transition uppercase tracking-wider"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                  className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
                />
                <PasswordStrengthMeter password={newPassword} />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full bg-[#F4F7FC] border-none focus:ring-2 focus:ring-[#0066FF] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 font-bold outline-none transition"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#003366] hover:bg-[#002244] text-white font-extrabold text-xs py-4 rounded-2xl shadow-md hover:shadow-lg transition uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Change Password'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold text-xs px-6 py-4 rounded-2xl transition duration-150"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default ChangePasswordPage
