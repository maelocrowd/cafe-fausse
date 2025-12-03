/**
 * MenuSection.jsx
 *
 * Component for displaying a menu section with a title, description, and list of items.
 * - Displays a title, description, and list of items in a grid layout.
 * - Each item has a name, description, price, and image.
 * - The section is styled with the menu-section class.
 *
 * Usage: <MenuSection title="Menu Section Title" description="Menu Section Description" items={items} />
 */

const MenuSection = ({ title, description, items }) => {
  return (
    <section className="menu-section">
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="menu-grid">
        {items.map((item) => (
          <article 
            key={item.name} 
            className="menu-card"
          >
            {/* Left column: text */}
            <div className="menu-card-text">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </div>

            {/* Right column: image */}
            {item.image && (
              <div className="menu-card-image">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-item-image"
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default MenuSection