import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitLogin } from '../services/api'
import '../LoginPage.css'

/**
 * LoginPage.jsx
 *
 * This is the login page for the restaurant admin portal.
 * 
 * Features:
 * - Form for admin login with username and password.
 * - Automatic redirect to dashboard if already logged in.
 * - Error handling for invalid credentials.
 * - Loading state during login.
 * - Message display for success or error.
 * - Forgot password and create account links.
 *
 * Depends on:
 *   - submitLogin() API function for authentication.
 *   - React Router's useNavigate for programmatic navigation.
 *   - Supporting CSS in LoginPage.css for layout and design.
 *
 * Styling classes: .login-container, .login-form, .form-group, .form-group label, .form-group input, .btn-brown, .success, .error, .login-footer, .login-footer a.
 */ 
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // ✅ Auto‑redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setError('')
    setMessage('')

    try {
      const data = await submitLogin(username, password) // Axios returns response.data
      console.log('Login response:', data)

      setStatus('success')
      
      // ✅ Save token so ProtectedRoute works
      localStorage.setItem('adminToken', data.token || 'fake-admin-token')

      // Redirect to dashboard
      navigate('/admin/dashboard')
    } catch (err) {
      setStatus('error')
      setError(err.response?.data?.message || 'Invalid Credentials !')
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Café name at the very top */}
        <h1 className="cafe-name">Café Fausse</h1>

        {/* Updated heading */}
        <h2 className="login-title">Admin Portal Sign in</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-brown" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <div className="login-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <span> | </span>
          <a href="/register">Create Account</a>
        </div>
      </form>
    </div>
  )
}

export default LoginPage