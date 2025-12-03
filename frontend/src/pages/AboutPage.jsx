import PageHeading from '../components/PageHeading.jsx'

/**
 * AboutPage.jsx
 *
 * This page provides information about the restaurant and its founders.
 * 
 * Features:
 * - Displays a story panel with the restaurant's history and mission.
 * - Features a grid of founders with their bios.
 * - Displays a grid of values that the restaurant stands for.
 *
 * Depends on:
 *   - PageHeading component for consistent title/description structure.
 *   - founders array for the founders' information.
 *   - values array for the values that the restaurant stands for.
 *
 * Styling classes: .page-about, .story-panel, .founders-grid, .values-grid.
 */
const founders = [
  {
    name: 'Chef Antonio Rossi',
    bio: 'Raised in Emilia-Romagna, Antonio studied under Michelin-starred mentors before bringing his modern Italian cuisine to Washington, DC.',
  },
  {
    name: 'Maria Lopez',
    bio: 'Hospitality visionary and sommelier, Maria curates the beverage program and leads the guest experience team.',
  },
]

const AboutPage = () => {
  return (
    <div className="page page-about">
      <PageHeading
        eyebrow="Our Story"
        title="Tradition meets innovation"
        description="Founded in 2010, Café Fausse blends rustic Italian flavors with contemporary plating, celebrating locally sourced ingredients and heartfelt service."
      />

      <section className="story-panel">
        <p>
          What began as a tiny chef’s table has evolved into a destination for
          tasting menus, wine pairings, and intimate celebrations. Our mission
          is to honor culinary heritage while innovating nightly.
        </p>
        <p>
          Sustainability guides every partnership—from nearby farms to artisans
          crafting our ceramics. We invest in passionate people, continuous
          training, and community initiatives throughout DC.
        </p>
      </section>

      <section className="founders-grid">
        {founders.map((founder) => (
          <article key={founder.name}>
            <h3>{founder.name}</h3>
            <p>{founder.bio}</p>
          </article>
        ))}
      </section>

      <section className="values-grid">
        <article>
          <h4>Unforgettable Dining</h4>
          <p>
            Multi-course menus, somm pairings, and polished service anchor every
            evening.
          </p>
        </article>
        <article>
          <h4>Locally Sourced</h4>
          <p>We source produce from Mid-Atlantic farms and highlight purveyors.</p>
        </article>
        <article>
          <h4>Guest Connection</h4>
          <p>
            Concierge communication ensures anniversaries, proposals, and
            milestones feel effortless.
          </p>
        </article>
      </section>
    </div>
  )
}

export default AboutPage

