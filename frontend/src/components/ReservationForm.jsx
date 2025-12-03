import { useState } from 'react'

/**
 * ReservationForm.jsx
 *
 * Component for handling reservation form submissions.
 * - Manages form state for datetime, guests, name, email, and phone.
 * - Validates form input and provides error messages.
 * - Submits reservation data to the backend using the onSubmit prop.
 *
 * Usage: <ReservationForm onSubmit={submitReservation} />
 */

const defaultState = {
  datetime: '',
  guests: '2',
  name: '',
  email: '',
  phone: '',
}

const ReservationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(defaultState)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!formData.datetime) {
      return 'Please select a date and time.'
    }
    if (!formData.name.trim()) {
      return 'Please add the guest name.'
    }
    if (!formData.email.trim()) {
      return 'Please provide an email address.'
    }
    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setStatus('loading')
    setError('')
    try {
      const response = await (onSubmit
        ? onSubmit(formData)
        : Promise.resolve({
            message:
              'Your request has been captured locally. API integration coming soon.',
          }))

      setStatus('success')
      setMessage(response?.message || 'Reservation request submitted.')
      setFormData(defaultState)
    } 
 
    catch (submissionError) {
      setStatus('error');
      if (submissionError?.response?.data?.message) {
        setError(submissionError.response.data.message);
      } else {
        setError(
          submissionError?.message ||
          'Something went wrong. Please try again shortly.'
        );
      }
    }

  }

  const minDateTime = new Date().toISOString().slice(0, 16)

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="datetime">Time Slot</label>
        <input
          id="datetime"
          name="datetime"
          type="datetime-local"
          value={formData.datetime}
          onChange={handleChange}
          min={minDateTime}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="guests">Number of Guests</label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
        >
          {[...Array(10)].map((_, index) => {
            const value = index + 1
            return (
              <option key={value} value={value}>
                {value} {value === 1 ? 'Guest' : 'Guests'}
              </option>
            )
          })}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="name">Customer Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          pattern="[A-Za-z\s]+"
          title="Please enter a name using letters only"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="phone">Phone Number (optional)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(202) 555-4567"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {error && <p className="form-feedback error">{error}</p>}
      {status === 'success' && (
        <p className="form-feedback success">{message}</p>
      )}

      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Request Reservation'}
      </button>
    </form>
  )
}

export default ReservationForm

