import { useState } from 'react'
import PageHeading from '../components/PageHeading.jsx'
import { awards, galleryImages, reviews } from '../data/gallery.js'

// GalleryPage.jsx
// 
// This page showcases the visual and reputational highlights of the restaurant.
// - Displays a grid of gallery images that can be enlarged in a lightbox on click.
// - Features a list of awards earned by the establishment.
// - Presents selected customer and critic reviews.
// 
// Depends on:
//   - PageHeading component for consistent title/description structure
//   - Data imports from gallery.js (galleryImages, awards, reviews)
// 
// Styling: Uses .gallery-grid, .awards, .reviews, and .lightbox classes for layout and interactive presentation.

const GalleryPage = () => {
  const [activeImage, setActiveImage] = useState(null)

  return (
    <div className="page page-gallery">
      <PageHeading
        eyebrow="Gallery"
        title="Atmosphere, awards, and unforgettable moments"
        description="Explore the dining room, signature dishes, kitchen behind-the-scenes, and the accolades that celebrate our craft."
      />

      <section className="gallery-grid">
        {galleryImages.map((image) => (
          <button
            key={image.id}
            type="button"
            className="gallery-tile"
            onClick={() => setActiveImage(image)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span>{image.title}</span>
          </button>
        ))}
      </section>

      <section className="awards">
        <h2>Awards</h2>
        <ul>
          {awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      </section>

      <section className="reviews">
        <h2>Reviews</h2>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.author}>
              <p>“{review.quote}”</p>
              <span>{review.author}</span>
            </article>
          ))}
        </div>
      </section>

      {activeImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <figure onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActiveImage(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <img src={activeImage.src} alt={activeImage.alt} />
            <figcaption>{activeImage.title}</figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}

export default GalleryPage

