import React, { useState, useEffect } from "react"
import { menuSections, updateMenuItemPrice } from "../services/api.js"
import "../MenuDashboard.css"
import '../loginpage.css';
// AdminDashboard.jsx - Admin interface for menu management
// 
// This component is a dashboard for restaurant admins to:
// - Fetch and display all menu sections and items
// - Edit menu items (name, description, price, image)
// - Add or remove menu items within sections
// - Save updated menu item info to the backend using provided API
// - Logout functionality (clears admin token, redirects to login)
// 
// UI is styled with MenuDashboard.css and loginpage.css
// 
// Relies on: 
//   - Async menuSections() API call to get menu data
//   - updateMenuItemPrice() or similar methods for persisting edits
// 
// All state updates for sections/menu items are local until saved.

export default function AdminDashboard() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await menuSections()
        setSections(data)
      } catch (error) {
        console.error("Error fetching menu sections:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // ✅ Logout handler linked to token-based auth
  const handleLogout = () => {
    localStorage.removeItem("adminToken")   // clear token
    window.location.href = "/admin"         // redirect to login
  }

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    const updatedSections = [...sections]
    updatedSections[sectionIndex].items[itemIndex][field] = value
    setSections(updatedSections)
  }

  const handleAddItem = (sectionIndex) => {
    const updatedSections = [...sections]
    updatedSections[sectionIndex].items.push({
      name: "New Item",
      description: "Description here",
      price: "$0.00",
      image: ""
    })
    setSections(updatedSections)
  }

  const handleRemoveItem = (sectionIndex, itemIndex) => {
    const updatedSections = [...sections]
    updatedSections[sectionIndex].items.splice(itemIndex, 1)
    setSections(updatedSections)
  }

  const handleSaveItem = async (sectionIndex, itemIndex) => {
    const item = sections[sectionIndex].items[itemIndex]
    try {
      await updateMenuItemPrice(item.name, item.price)
      alert(`Saved price update for ${item.name}: ${item.price}`)
    } catch (error) {
      console.error("Error saving item:", error)
      alert("Failed to save changes. Please try again.")
    }
  }

  return (
    <div className="menu-dashboard">
      <h1>Café Fausse Menu Editor</h1>

      {/* ✅ Logout button */}
      {/* <button onClick={handleLogout} className="btn-brown logout-btn">
        Logout
      </button> */}
      <button className="logout-btn" onClick={handleLogout}>
  Logout
</button>

      {loading ? (
        <p>Loading menu...</p>
      ) : sections.length > 0 ? (
        sections.map((section, sectionIndex) => (
          <div key={section.id || sectionIndex} className="menu-section">
            <h2>{section.title}</h2>
            <p>{section.description}</p>

            <table className="menu-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                  <th>Save</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item, itemIndex) => (
                  <tr key={item.id || itemIndex}>
                    <td>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(sectionIndex, itemIndex, "name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(sectionIndex, itemIndex, "description", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(sectionIndex, itemIndex, "price", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.image}
                        placeholder="Click to upload or paste URL"
                        readOnly
                        onClick={() => {
                          const fileInput = document.createElement("input")
                          fileInput.type = "file"
                          fileInput.accept = "image/*"
                          fileInput.onchange = (e) => {
                            const file = e.target.files[0]
                            if (file) {
                              const imageUrl = URL.createObjectURL(file)
                              handleItemChange(sectionIndex, itemIndex, "image", imageUrl)
                            }
                          }
                          fileInput.click()
                        }}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleRemoveItem(sectionIndex, itemIndex)}>
                        Remove
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleSaveItem(sectionIndex, itemIndex)}>
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={() => handleAddItem(sectionIndex)}>+ Add Item</button>
          </div>
        ))
      ) : (
        <p>No menu sections available.</p>
      )}
    </div>
  )
}