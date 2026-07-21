import { Check, X } from 'lucide-react'

function PasswordStrengthMeter({ password = '' }) {
  const checks = {
    length: password.length >= 8,
    hasUpperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-=+]/.test(password),
  }

  const score = Object.values(checks).filter(Boolean).length

  const getLabelAndColor = () => {
    if (!password) return { label: 'Password Strength', color: 'text-slate-400', barBg: 'bg-slate-200' }
    if (score <= 1) return { label: 'Weak', color: 'text-rose-600', barBg: 'bg-rose-500' }
    if (score === 2) return { label: 'Medium', color: 'text-amber-600', barBg: 'bg-amber-500' }
    if (score === 3) return { label: 'Strong', color: 'text-blue-600', barBg: 'bg-blue-600' }
    return { label: 'Very Strong', color: 'text-emerald-600', barBg: 'bg-emerald-500' }
  }

  const { label, color, barBg } = getLabelAndColor()

  return (
    <div className="space-y-2 mt-2 pt-1">
      {/* Label and Score */}
      <div className="flex items-center justify-between text-[11px] font-semibold">
        <span className="text-slate-500">Password Strength:</span>
        <span className={color}>{label}</span>
      </div>

      {/* 4-Segment Progress Bar */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-full rounded-full transition-all duration-300 ${
              score >= level ? barBg : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Requirement Checklist */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-500 pt-1">
        <div className={`flex items-center gap-1 font-medium ${checks.length ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.length ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-300" />}
          <span>At least 8 characters</span>
        </div>

        <div className={`flex items-center gap-1 font-medium ${checks.hasUpperLower ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.hasUpperLower ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-300" />}
          <span>Uppercase & lowercase</span>
        </div>

        <div className={`flex items-center gap-1 font-medium ${checks.hasNumber ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-300" />}
          <span>At least 1 number</span>
        </div>

        <div className={`flex items-center gap-1 font-medium ${checks.hasSpecial ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.hasSpecial ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-300" />}
          <span>Special character (!@#$)</span>
        </div>
      </div>
    </div>
  )
}

export default PasswordStrengthMeter
