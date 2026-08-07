import { Link } from "react-router-dom";
import {
  FaTrain,
  FaUser,
  FaCalendarAlt,
  FaTicketAlt,
  FaCheckCircle,
  FaDownload,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";
import "./BookingCard.css";

const STATUS_ICON = {
  Confirmed: <FaCheckCircle />,
  Cancelled: <FaTimesCircle />,
  Pending: <FaCalendarAlt />,
};

function BookingCard({ booking }) {
  const statusKey = booking.status || "Pending";
  const statusClass = statusKey.toLowerCase();

  return (
    <div className={`booking-card status-${statusClass}`}>
      {/* Header */}
      <div className="booking-header">
        <div className="booking-header-left">
          <h2>{booking.trainName}</h2>
          <span className="booking-train-badge">#{booking.trainNumber}</span>
        </div>

        <span className={`booking-status ${statusClass}`}>
          {STATUS_ICON[statusKey]}
          {statusKey}
        </span>
      </div>

      {/* Route strip */}
      <div className="booking-route">
        <div className="booking-stop departure">
          <span className="booking-stop-label">From</span>
          <span className="booking-city">{booking.source}</span>
        </div>

        <div className="booking-route-mid">
          <div className="route-line-track">
            <div className="track-dot" />
            <div className="track-line" />
            <FaArrowRight className="track-arrow" />
          </div>
        </div>

        <div className="booking-stop arrival">
          <span className="booking-stop-label">To</span>
          <span className="booking-city">{booking.destination}</span>
        </div>
      </div>

      {/* Info pills */}
      <div className="booking-pills">
        <span className="booking-pill pnr">
          <FaTicketAlt /> PNR: {booking.pnr}
        </span>
        <span className="booking-pill">
          <FaUser /> {booking.passengerName}
        </span>
        <span className="booking-pill">
          <FaCalendarAlt /> {booking.travelDate}
        </span>
        <span className="booking-pill">
          <FaTrain /> {booking.seatClass || "Sleeper"}
        </span>
      </div>

      {/* Actions */}
      <div className="booking-actions">
        <button className="action-btn btn-download">
          <FaDownload /> Download Ticket
        </button>

        {statusClass !== "cancelled" && (
          <button className="action-btn btn-cancel">
            <FaTimesCircle /> Cancel
          </button>
        )}

        <Link
          to={`/train/${booking.trainNumber}`}
          className="action-btn btn-view"
        >
          View Train
        </Link>
      </div>
    </div>
  );
}

export default BookingCard;
