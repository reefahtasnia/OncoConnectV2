import { useState } from "react"
import "./CSS/AppointmentForm.css"
import axios from "axios"

const AppointmentForm = ({ onClose, doctorName, doctorId, userId, userName }) => {
  const [formData, setFormData] = useState({
    user_id: userId,
    user_name: userName || "", // Add a default empty string
    doctor_id: doctorId,
    date: "",
    medium: "Online",
  })

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    if (!formData.date) {
      setErrorMessage("Please select an appointment date.")
      return
    }

    try {
      const response = await axios.post("/api/submit-appointment", formData)
      alert("Appointment booked successfully!")
      onClose()
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage("Something went wrong. Please try again.")
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="appointment-overlay">
      <div className="appointment-content">
        <div className="appointment-header">
          <h2>Add Appointment</h2>
          <button className="close-btn" onClick={onClose}>
            <span>Close</span>✕
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Write your name"
                value={formData.user_name || ""} // Ensure it's always a string
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="medium">Medium</label>
              <select id="medium" name="medium" value={formData.medium} onChange={handleChange} required>
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AppointmentForm

