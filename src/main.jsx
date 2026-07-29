import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

if (typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
  const cleanPath = window.location.pathname
  if (!cleanPath.includes('.') && !cleanPath.startsWith('/api')) {
    window.location.replace('/#' + cleanPath + window.location.search + window.location.hash)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
