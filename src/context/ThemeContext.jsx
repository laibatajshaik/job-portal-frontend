import React, { createContext, useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      {/* Floating Glassmorphic Theme Toggle Widget */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-[9999] p-3.5 rounded-full bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-[#0066FF]/35 dark:border-slate-700 text-[#0066FF] dark:text-amber-400 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        ) : (
          <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
        )}
      </button>
    </ThemeContext.Provider>
  )
}
