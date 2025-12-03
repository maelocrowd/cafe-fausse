import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading.jsx'
import NewsletterForm from '../components/NewsletterForm.jsx'
import { subscribeNewsletter } from '../services/api.js'

/**
 * HomePage.jsx
 *
 * This is the main landing page for Café Fausse's website. 
 * 
 * Features:
 * - Hero section with restaurant branding, tagline, and primary calls-to-action.
 * - Prominent restaurant image below the hero.
 * - Grid layout highlighting location, mission, and guest experience.
 * - Optional newsletter signup and relevant links for navigation.
 *
 * Depends on:
 *   - PageHeading component for consistent top section visuals.
 *   - NewsletterForm (if enabled) for user email capture.
 *   - React Router's Link for client-side navigation.
 *   - Supporting CSS in main stylesheets for layout and design.
 *
 * Styling classes: .page-home, .hero, .hero-ctas, .home-image-section, .home-grid, and typical button classes.
 */

const HomePage = () => {
  return (
    <div className="page page-home">
      <section className="hero">
        <PageHeading
          eyebrow="Café Fausse"
          title="Elevated dining in the heart of DC"
          description="Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse delivers seasonal tasting menus, curated wine pairings, and gracious hospitality."
        >
          <div className="hero-ctas">
            <Link to="/menu" className="button primary">
              Explore Menu
            </Link>
            <Link to="/reservations" className="button ghost">
              Reserve a Table
            </Link>
          </div>
        </PageHeading>
      </section>
      {/* New image section before home-grid */}
      <section className="home-image-section">
        <img 
          src="/images/home-cafe-fausse.webp"
          alt="Front view of Café Fausse"
          className="home-image"
        />
      </section>


      <section className="home-grid">
        <article>
          <h2>Visit Us</h2>
          <ul>
            <li>1234 Culinary Ave, Suite 100, Washington, DC 20002</li>
            <li>(202) 555-4567</li>
            <li>Monday – Saturday: 5:00PM - 11:00PM</li>
            <li>Sunday: 5:00PM - 9:00PM</li>
          </ul>
        </article>
        <article>
          <h2>Mission</h2>
          <p>
            We blend traditional Italian flavors with modern innovation, sourcing
            local ingredients to deliver unforgettable experiences.
          </p>
        </article>
        <article>
          <h2>Guest Promise</h2>
          <p>
            From the first greeting to the last espresso, every touchpoint is
            meticulously orchestrated for comfort, warmth, and delight.
          </p>
        </article>
      </section>

      <section className="newsletter-panel">
        <div>
          <h2>Stay in the know</h2>
          <p>
            Receive seasonal menu drops, sommelier pairings, and priority access
            to chef table events.
          </p>
        </div>
        <NewsletterForm onSubmit={subscribeNewsletter} />  
       

           </section>
    </div>
  )
}

export default HomePage

