import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import ReservationsPage from './pages/ReservationsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import './index.css'

// Entry point for Café Fausse React SPA: sets up routing, root rendering, and main providers.

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'reservations', element: <ReservationsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'gallery', element: <GalleryPage /> },

    ],
  },
  {
    // Login page for the admin dashboard.
   path: '/admin',
    element: <LoginPage />,
 },
 {
  // Protected route for the admin dashboard.
   path: '/admin/dashboard',
   element:  (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  ),
 },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
