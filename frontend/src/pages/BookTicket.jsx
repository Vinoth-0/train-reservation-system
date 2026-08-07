import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser, FaTrain, FaShieldAlt,
} from "react-icons/fa";
import "./BookTicket.css";

const INITIAL = { name: "", age: "", gender: "", berth: "", mobile: "", email: "" };

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passenger, setPassenger] = useState(INITIAL);

  // Dummy — replace with API later
  const train = {
    trainNumber: id,
    trainName: "Tamil Nadu Express",
    source: "Chennai",
    destination: "New Delhi",
    travelDate: "15 Jul 2026",
    travelClass: "AC 3-Tier (3A)",
    fare: 1650,
  };

  const handleChange = (e) =>
    setPassenger({ ...passenger, [e.target.name]: e.target.value });

  const handleBooking = (e) => {
    e.preventDefault();
    const empty = Object.values(passenger).some((v) => !v);
    if (empty) { toast.error("Please fill all fields."); return; }
    toast.success("Ticket booked successfully!");
    setTimeout(() => navigate("/my-bookings"), 1500);
  };

  return (
    <div className="book-ticket-page">

      {/* Header */}
      <div className="book-ticket-header">
        <span className="section-label">ATrain · Booking</span>
        <h1>Book Your Ticket</h1>
      </div>

      <div className="booking-container">

        {/* ── Passenger Form ── */}
        <div className="passenger-card">
          <div className="card-header">
            <div className="card-header-icon"><FaUser /></div>
            <span>Passenger Details</span>
          </div>

          <div className="card-body">
            <form onSubmit={handleBooking}>
              <div className="form-grid">

                <div className="field-group full-width">
                  <label>Full Name</label>
                  <input
                    type="text" name="name"
                    placeholder="e.g. Vinoth Kumar A"
                    value={passenger.name} onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label>Age</label>
                  <input
                    type="number" name="age" min="1" max="120"
                    placeholder="e.g. 21"
                    value={passenger.age} onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label>Gender</label>
                  <select name="gender" value={passenger.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Berth Preference</label>
                  <select name="berth" value={passenger.berth} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Lower</option>
                    <option>Middle</option>
                    <option>Upper</option>
                    <option>Side Lower</option>
                    <option>Side Upper</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Mobile</label>
                  <input
                    type="tel" name="mobile"
                    placeholder="+91 98765 43210"
                    value={passenger.mobile} onChange={handleChange}
                  />
                </div>

                <div className="field-group full-width">
                  <label>Email Address</label>
                  <input
                    type="email" name="email"
                    placeholder="you@example.com"
                    value={passenger.email} onChange={handleChange}
                  />
                </div>

              </div>

              <div className="booking-buttons">
                <button type="submit" className="confirm-btn">
                  Confirm Booking →
                </button>
                <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Summary Card ── */}
        <div className="summary-card">
          <div className="card-header">
            <div className="card-header-icon"><FaTrain /></div>
            <span>Booking Summary</span>
          </div>

          <div className="card-body">
            <div className="summary-items">
              {[
                { label: "Train",       value: train.trainName    },
                { label: "Train No",    value: `#${train.trainNumber}` },
                { label: "Route",       value: `${train.source} → ${train.destination}` },
                { label: "Date",        value: train.travelDate   },
                { label: "Class",       value: train.travelClass  },
                { label: "Passengers",  value: "1"                },
              ].map(({ label, value }) => (
                <div className="summary-item" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Total Fare</span>
              <strong>₹ {train.fare.toLocaleString()}</strong>
            </div>

            <p className="secure-note">
              <FaShieldAlt /> Secure & encrypted checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookTicket;