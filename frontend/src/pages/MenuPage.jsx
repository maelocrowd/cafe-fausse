import { useState, useEffect } from 'react'
import PageHeading from '../components/PageHeading.jsx'
import MenuSection from '../components/MenuSection.jsx'
import { menuSections } from '../services/api.js' // assuming this is an async function

/**
 * MenuPage.jsx
 *
 * This is the menu page for the restaurant website.
 * 
 * Features:
 * - Displays all menu sections and items in a grid layout.
 * - Each section has a title, description, and list of items.
 * - Each item has a name, description, price, and image.
 * - The page is styled with the page-menu class.
 *
 * Depends on:
 *   - PageHeading component for consistent title/description structure.
 *   - MenuSection component for displaying each menu section.
 *   - menuSections() API function to fetch menu data.
 * 
 * Styling classes: .page-menu, .menu-section, .menu-grid, .menu-card, .menu-card-text, .menu-card-image, .price.
 */
const MenuPage = () => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await menuSections() // call API
        setSections(data)
      } catch (error) {
        console.error('Error fetching menu sections:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="page page-menu">
      <PageHeading
        eyebrow="Dining"
        title="Seasonal menu curated by Chef Rossi"
        description="Each course celebrates locally sourced ingredients, handmade pastas, and thoughtful pairings."
      />

      {sections.length > 0 ? (
        sections.map((section) => (
          <MenuSection key={section.id || section.title} {...section} />
        ))
      ) : (
        <p>Loading menu...</p>
      )}
    </div>
  )
}

export default MenuPage