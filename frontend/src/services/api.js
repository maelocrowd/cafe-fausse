import axios from 'axios'

/**
 * api.js
 *
 * This file contains the API client for the restaurant website.
 * 
 * Features:
 * - Creates an axios instance for the API client.
 * - Exports functions for submitting reservations, subscribing to newsletters, fetching menu sections, and logging in.
 *   - submitReservation() function for submitting reservation requests.
 *   - subscribeNewsletter() function for subscribing to the newsletter.
 *   - menuSections() function for fetching the menu sections.
 *   - submitLogin() function for logging in as an admin.
 *   - updateMenuItemPrice() function for updating the price of a menu item.
 * 
 * Styling classes: none.
 */ 
const apiBaseUrl =
  // import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:5000'
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:80'

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})
// All API functions below use the shared apiClient instance for communicating
// with the backend. They are exported for use in React pages and components.

export const submitReservation = async (payload) => {
  const response = await apiClient.post('/api/reservations', payload)
  return response.data
}

// Submit a newsletter subscription request to the backend.
export const subscribeNewsletter = async (email) => {
  const response = await apiClient.post('/api/newsletter', { email })
  return response.data
}

// Fetch the menu sections from the backend.
export const menuSections = async () => {
  const response = await apiClient.get('/api/menu')
  // alert('message from server, is flowing ... ')
  return response.data
}

// Submit a login request to the backend.
export const submitLogin = async (username, password) => {
  try {
    const response = await apiClient.post('/api/admin', {
      username,
      password,
    })
    return response.data   // { message: "...", token: "..." }
  } catch (err) {
    // Axios attaches server response to err.response
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message || "Login failed")
    }
    throw new Error("Network or unexpected error")
  }
}

// Update price for a specific menu item by name in the backend.
export const updateMenuItemPrice = async (name, newPrice) => {
  try {
    const response = await apiClient.post("/api/menuchange", {
      name,
      price: newPrice,
    })
    return response.data
  } catch (error) {
    console.error("Error updating menu item price:", error)
    throw error
  }
}
