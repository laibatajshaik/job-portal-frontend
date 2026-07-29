import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" />
    if (user.role === 'manager') return <Navigate to="/manager/dashboard" />
    return <Navigate to="/user/dashboard" />
  }

  return children
}

export default PrivateRoute
