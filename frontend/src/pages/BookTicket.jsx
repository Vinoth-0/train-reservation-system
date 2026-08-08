import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaTrain, FaShieldAlt } from "react-icons/fa";

import TrainService from "../services/TrainService";
import BookingService from "../services/BookingService";

import "./BookTicket.css";

const INITIAL_PASSENGER = {
  name: "",
  age: "",
  gender: "",
  berth: "",
  mobile: "",
  email: "",
};

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [passenger, setPassenger] = useState(INITIAL_PASSENGER);

  const [train, setTrain] = useState(null);
  const [travelDate, setTravelDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // Get train details
  useEffect(() => {
    fetchTrain();
  }, [id]);

  const fetchTrain = async () => {
    try {
      setLoading(true);

      const response = await TrainService.getTrainById(id);

      setTrain(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load train details.",
      );

      navigate("/search");
    } finally {
      setLoading(false);
    }
  };

  // Passenger input changes
  const handleChange = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });
  };

  // Booking
  const handleBooking = async (e) => {
    e.preventDefault();

    // Validate passenger fields
    const emptyField = Object.values(passenger).some((value) => !value);

    if (emptyField) {
      toast.error("Please fill all passenger details.");
      return;
    }

    // Validate travel date
    if (!travelDate) {
      toast.error("Please select your travel date.");
      return;
    }

    // Get logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setBooking(true);

      const bookingData = {
        trainId: Number(id),

        travelDate: travelDate,

        passenger: {
          name: passenger.name,
          age: Number(passenger.age),
          gender: passenger.gender,
          mobile: passenger.mobile,
          email: passenger.email,
          berthPreference: passenger.berth,
        },
      };

      const response = await BookingService.bookTicket(
        loggedInUser.id,
        bookingData,
      );

      toast.success(
        `Ticket booked successfully! PNR: ${response.data.pnrNumber}`,
      );

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to book ticket.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h2>Loading train details...</h2>
      </div>
    );
  }

  if (!train) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h2>Train not found</h2>
      </div>
    );
  }

  return (
    <div className="book-ticket-page">
      {/* Header */}
      <div className="book-ticket-header">
        <span className="section-label">ATrain · Booking</span>

        <h1>Book Your Ticket</h1>
      </div>

      <div className="booking-container">
        {/* Passenger Form */}
        <div className="passenger-card">
          <div className="card-header">
            <div className="card-header-icon">
              <FaUser />
            </div>

            <span>Passenger Details</span>
          </div>

          <div className="card-body">
            <form onSubmit={handleBooking}>
              <div className="form-grid">
                {/* Name */}
                <div className="field-group full-width">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={passenger.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Age */}
                <div className="field-group">
                  <label>Age</label>

                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={handleChange}
                  />
                </div>

                {/* Gender */}
                <div className="field-group">
                  <label>Gender</label>

                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Berth */}
                <div className="field-group">
                  <label>Berth Preference</label>

                  <select
                    name="berth"
                    value={passenger.berth}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>

                    <option value="Lower">Lower</option>

                    <option value="Middle">Middle</option>

                    <option value="Upper">Upper</option>

                    <option value="Side Lower">Side Lower</option>

                    <option value="Side Upper">Side Upper</option>
                  </select>
                </div>

                {/* Mobile */}
                <div className="field-group">
                  <label>Mobile</label>

                  <input
                    type="tel"
                    name="mobile"
                    value={passenger.mobile}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="field-group full-width">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={passenger.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Travel Date */}
                <div className="field-group full-width">
                  <label>Travel Date</label>

                  <input
                    type="date"
                    value={travelDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="booking-buttons">
                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={booking}
                >
                  {booking ? "Booking..." : "Confirm Booking →"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate(-1)}
                  disabled={booking}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="summary-card">
          <div className="card-header">
            <div className="card-header-icon">
              <FaTrain />
            </div>

            <span>Booking Summary</span>
          </div>

          <div className="card-body">
            <div className="summary-items">
              <div className="summary-item">
                <span>Train</span>
                <strong>{train.trainName}</strong>
              </div>

              <div className="summary-item">
                <span>Train No</span>
                <strong>#{train.trainNumber}</strong>
              </div>

              <div className="summary-item">
                <span>Route</span>
                <strong>
                  {train.source} → {train.destination}
                </strong>
              </div>

              <div className="summary-item">
                <span>Departure</span>
                <strong>{train.departureTime}</strong>
              </div>

              <div className="summary-item">
                <span>Arrival</span>
                <strong>{train.arrivalTime}</strong>
              </div>

              <div className="summary-item">
                <span>Date</span>
                <strong>{travelDate || "Not selected"}</strong>
              </div>

              <div className="summary-item">
                <span>Passengers</span>
                <strong>1</strong>
              </div>
            </div>

            {/* Fare */}
            <div className="summary-total">
              <span>Total Fare</span>

              <strong>₹ {Number(train.price).toLocaleString()}</strong>
            </div>

            <p className="secure-note">
              <FaShieldAlt />
              Secure & encrypted checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTicket;
