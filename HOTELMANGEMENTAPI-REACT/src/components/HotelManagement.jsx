import React, { useState, useEffect } from "react";
import { API_URL } from "../config.js";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hotelData, setHotelData] = useState({
    name: "",
    location: "",
    roomsAvailable: 0,
    type: "Budget",
    rating: 1
  });
  const [message, setMessage] = useState(null); // New state for messages

  const fetchHotels = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      showMessage("Error fetching hotels", "error");
    }
  };

  useEffect(() => { fetchHotels(); }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000); // message disappears after 3s
  };

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedHotel) {
        await fetch(`${API_URL}/${selectedHotel.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hotelData)
        });
        showMessage("Hotel updated successfully");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hotelData)
        });
        showMessage("Hotel added successfully");
      }
      setShowForm(false);
      setSelectedHotel(null);
      setHotelData({ name: "", location: "", roomsAvailable: 0, type: "Budget", rating: 1 });
      fetchHotels();
    } catch (err) {
      console.error("Error saving hotel:", err);
      showMessage("Failed to save hotel", "error");
    }
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setHotelData(hotel);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchHotels();
        showMessage("Hotel deleted successfully");
      } catch (err) {
        console.error(err);
        showMessage("Failed to delete hotel", "error");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🏨 Hotel Management</h1>

      {message && (
        <div style={{ 
          padding: 10, 
          marginBottom: 20, 
          borderRadius: 8, 
          color: '#fff', 
          backgroundColor: message.type === "success" ? "#00b894" : "#d63031"
        }}>
          {message.text}
        </div>
      )}

      {showForm && (
        <form style={styles.form} onSubmit={handleSave}>
          <h2 style={styles.formHeading}>{selectedHotel ? "Edit Hotel" : "Add Hotel"}</h2>
          <input type="text" name="name" value={hotelData.name} onChange={handleChange} placeholder="Hotel Name" required style={styles.input} />
          <input type="text" name="location" value={hotelData.location} onChange={handleChange} placeholder="Location" required style={styles.input} />
          <input type="number" name="roomsAvailable" value={hotelData.roomsAvailable} onChange={handleChange} placeholder="Rooms Available" required style={styles.input} />
          <select name="type" value={hotelData.type} onChange={handleChange} style={styles.input}>
            <option value="Budget">Budget</option>
            <option value="Luxury">Luxury</option>
            <option value="Resort">Resort</option>
          </select>
          <select name="rating" value={hotelData.rating} onChange={handleChange} style={styles.input}>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
          <div style={styles.formButtons}>
            <button type="submit" style={{ ...styles.button, backgroundColor: "#00b894" }}>{selectedHotel ? "Update" : "Save"}</button>
            <button type="button" style={{ ...styles.button, backgroundColor: "#d63031" }} onClick={() => { setShowForm(false); setSelectedHotel(null); }}>Cancel</button>
          </div>
        </form>
      )}

      {!showForm && <button style={{ ...styles.button, backgroundColor: "#0984e3", marginBottom: 20 }} onClick={() => setShowForm(true)}>+ Add Hotel</button>}

      <div style={styles.list}>
        {hotels.length === 0 && <p style={styles.empty}>No hotels available. Add a hotel to start.</p>}
        {hotels.map(hotel => (
          <div key={hotel.id} style={{ ...styles.card, background: cardGradient(hotel.type) }}>
            <div style={styles.cardHeader}>
              <h3 style={{ color: '#fff' }}>{hotel.name}</h3>
              <span style={styles.rating}>{"⭐".repeat(hotel.rating)}</span>
            </div>
            <p style={{ color: '#fff' }}><strong>Location:</strong> {hotel.location}</p>
            <p style={{ color: '#fff' }}><strong>Rooms:</strong> {hotel.roomsAvailable}</p>
            <p style={{ color: '#fff' }}><strong>Type:</strong> {hotel.type}</p>
            <div style={styles.cardButtons}>
              <button style={{ ...styles.button, backgroundColor: "#6c5ce7" }} onClick={() => handleEdit(hotel)}>Edit</button>
              <button style={{ ...styles.button, backgroundColor: "#d63031" }} onClick={() => handleDelete(hotel.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Gradient by hotel type
const cardGradient = (type) => {
  switch (type) {
    case "Luxury": return "linear-gradient(135deg, #f6d365 0%, #fda085 100%)";
    case "Resort": return "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)";
    default: return "linear-gradient(135deg, #55efc4 0%, #00b894 100%)"; // Budget
  }
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '50px auto',
    background: 'linear-gradient(135deg, #ffeaa7, #fab1a0)',
    padding: 40,
    borderRadius: 20,
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif"
  },
  heading: { marginBottom: 30, fontSize: 36, color: '#2d3436', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' },
  form: { background: '#fff3e0', padding: 30, borderRadius: 15, marginBottom: 40, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
  formHeading: { marginBottom: 20, color: '#d35400' },
  input: { width: '100%', padding: 12, margin: '10px 0', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 },
  formButtons: { display: 'flex', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, padding: 12, margin: 5, borderRadius: 8, border: 'none', fontWeight: 600, color: '#fff', cursor: 'pointer', fontSize: 16 },
  list: { display: 'flex', flexWrap: 'wrap', gap: 25, justifyContent: 'center' },
  card: { padding: 25, width: 300, borderRadius: 15, boxShadow: '0 10px 25px rgba(0,0,0,0.25)', transition: 'transform 0.3s, box-shadow 0.3s' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  rating: { fontSize: 18, color: '#fff' },
  cardButtons: { display: 'flex', justifyContent: 'space-between', marginTop: 15 },
  empty: { fontSize: 18, color: '#2d3436', marginTop: 20 },
};

export default HotelManagement;
