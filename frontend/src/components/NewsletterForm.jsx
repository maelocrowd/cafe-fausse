import { useState } from 'react'

/**
 * NewsletterForm.jsx
 *
 * Component for handling newsletter form submissions.
 * - Manages form state for email input.
 * - Validates form input and provides error messages.
 * - Submits newsletter data to the backend using the onSubmit prop.
 *
 * Usage: <NewsletterForm onSubmit={subscribeNewsletter} />
 */
const NewsletterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setError('Please enter an email address.')
      return
    }

    setStatus('loading')
    setError('')
    try {
      const response = await (onSubmit
        ? onSubmit(email)
        : Promise.resolve({
            message: 'Subscribed locally. API integration coming soon.',
          }))
      setStatus('success')
      setMessage(response?.message || 'Thank you for subscribing!')
      setEmail('')
    } catch (submissionError) {
      setStatus('error')
      setError(
        submissionError?.message || 'Unable to subscribe. Please try again.',
      )
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email">Join our newsletter</label>
      <div className="newsletter-fields">
        <input
          id="newsletter-email"
          type="email"
          placeholder="name@domain.com"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Notify Me'}
        </button>
      </div>
      {error && <p className="form-feedback error">{error}</p>}
      {status === 'success' && (
        <p className="form-feedback success">{message}</p>
      )}
    </form>
  )
}

export default NewsletterForm

