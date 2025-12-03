import PageHeading from '../components/PageHeading.jsx'
import ReservationForm from '../components/ReservationForm.jsx'
import { submitReservation } from '../services/api.js'
/**
 * ReservationsPage.jsx
 *
 * This page allows guests to request a reservation at Café Fausse.
 * 
 * Features:
 * - Displays booking instructions and policies for reservations.
 * - Integrates ReservationForm for guests to submit their preferred date, time, and party size.
 * - Calls submitReservation API on form submit to place a hold request.
 * - Clearly states the confirmation process and what guests can expect after submitting.
 *
 * Depends on:
 *   - PageHeading component for title/description header.
 *   - ReservationForm component for handling reservation input and validation.
 *   - submitReservation API function for backend submission.
 * 
 * Styling classes: .page-reservations, .reservation-layout, .reservation-details, .disclaimer.
 */

const ReservationsPage = () => {
  return (
    <div className="page page-reservations">
      <PageHeading
        eyebrow="Reservations"
        title="Book an unforgettable evening"
        description="Complete the form to request seating. Our team confirms availability, assigns one of 30 tables, and follows up within 2 hours."
      />

      <section className="reservation-layout">
        <div className="reservation-details">
          <ul>
            <li>Tables accommodate up to 10 guests.</li>
            <li>Private dining available with advanced notice.</li>
            <li>
              Dietary accommodations and chef tastings available upon request.
            </li>
          </ul>
          <p className="disclaimer">
            Submitting the form places a hold on your preferred slot. Our
            concierge will confirm final details via email.
          </p>
        </div>
        <ReservationForm onSubmit={submitReservation} />
      </section>
    </div>
  )
}

export default ReservationsPage

