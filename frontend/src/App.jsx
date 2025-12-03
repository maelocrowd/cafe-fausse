import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
/**
 * App.jsx
 *
 * The root-level layout component for the Café Fausse website.
 * 
 * - Handles application-wide navigation and main shell styling.
 * - Imports global stylesheet and sets up <Outlet /> for page routing.
 * - Defines navigation links used in the main menu.
 *
 * Styling: .app-shell, .site-header, .primary-nav, .site-main, .site-footer, etc.
 */

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
  // { to: '/admin', label: 'Admin' },
 
]

const App = () => {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <p className="eyebrow">Café Fausse</p>
          <h1>Fine dining, reimagined</h1>
          <p>Washington, DC · (202) 555-4567</p>
        </div>
        <nav className="primary-nav">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className="nav-link">
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>1234 Culinary Ave · Washington, DC</p>
        <p>© {new Date().getFullYear()} Café Fausse</p>
      </footer>
    </div>
  )
}

export default App
