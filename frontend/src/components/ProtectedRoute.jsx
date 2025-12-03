// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"

/**
 * ProtectedRoute
 *
 * Component for protecting admin routes.
 * - Checks for the existence of 'adminToken' in localStorage.
 * - If not present, redirects the user to the admin login page (/admin).
 * - If present, renders the protected children components.
 *
 * Usage:
 * <ProtectedRoute>
 *   <AdminComponent />
 * </ProtectedRoute>
 */

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken")

  if (!token) {
    // Not logged in → redirect to your login page at /admin
    return <Navigate to="/admin" replace />
  }

  return children
}