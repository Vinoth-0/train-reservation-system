import { Link } from "react-router-dom";
import { FaTrain, FaClock, FaChair, FaRupeeSign, FaArrowRight } from "react-icons/fa";
import "./TrainCard.css";

function TrainCard({ train }) {
  const seatsLow = train.availableSeats < 20;

  return (
    <div className="train-card">

      {/* Header */}
      <div className="train-header">
        <div className="train-header-left">
          <h2>{train.trainName}</h2>
          <span className="train-number-badge">#{train.trainNumber}</span>
        </div>
        <div className="train-icon-wrap">
          <FaTrain />
        </div>
      </div>

      {/* Route */}
      <div className="route-section">
        <div className="route-stop departure">
          <span className="stop-label">From</span>
          <span className="stop-city">{train.source}</span>
          <span className="stop-time">{train.departureTime}</span>
        </div>

        <div className="route-middle">
          <div className="route-line-track">
            <div className="track-dot" />
            <div className="track-line" />
            <FaArrowRight className="track-arrow" />
          </div>
        </div>

        <div className="route-stop arrival">
          <span className="stop-label">To</span>
          <span className="stop-city">{train.destination}</span>
          <span className="stop-time">{train.arrivalTime}</span>
        </div>
      </div>

      {/* Info pills */}
      <div className="train-info">
        <span className="info-pill">
          <FaClock /> {train.departureTime} - {train.arrivalTime}
        </span>
        <span className={`info-pill ${seatsLow ? "seats-low" : ""}`}>
          <FaChair /> {train.availableSeats} seats {seatsLow ? "· Filling fast" : "available"}
        </span>
        <span className="info-pill">
          <FaRupeeSign /> {train.price}
        </span>
      </div>

      {/* Buttons */}
      <div className="train-buttons">
        <Link to={`/train/${train.id}`} className="details-btn">
          View Details
        </Link>
        <Link to={`/book/${train.id}`} className="book-btn">
          Book Now
        </Link>
      </div>

    </div>
  );
}

export default TrainCard;