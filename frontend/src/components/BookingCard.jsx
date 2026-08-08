import {
  FaTrain,
  FaTicketAlt,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";

import "./BookingCard.css";

function BookingCard({ booking, onCancel }) {

  const isCancelled =
    booking.bookingStatus?.toUpperCase() === "CANCELLED";

  return (
    <div className="booking-card">

      {/* Header */}
      <div className="booking-card-header">

        <div className="booking-train">

          <div className="booking-train-icon">
            <FaTrain />
          </div>

          <div>
            <h2>{booking.trainName}</h2>

            <span>
              Train No: #{booking.trainNumber}
            </span>
          </div>

        </div>

        <span
          className={`booking-status ${
            isCancelled ? "cancelled" : "confirmed"
          }`}
        >
          {booking.bookingStatus}
        </span>

      </div>


      {/* PNR */}
      <div className="booking-pnr">

        <div>
          <span>PNR NUMBER</span>
          <strong>{booking.pnrNumber}</strong>
        </div>

        <FaTicketAlt />

      </div>


      {/* Route */}
      <div className="booking-route">

        <div className="booking-station">

          <span>FROM</span>

          <strong>
            <FaMapMarkerAlt />
            {booking.source}
          </strong>

        </div>


        <div className="route-line">
          <FaTrain />
          <div></div>
        </div>


        <div className="booking-station destination">

          <span>TO</span>

          <strong>
            {booking.destination}
            <FaMapMarkerAlt />
          </strong>

        </div>

      </div>


      {/* Booking Details */}
      <div className="booking-details">

        <div className="booking-detail">

          <FaCalendarAlt />

          <div>
            <span>Travel Date</span>
            <strong>{booking.travelDate}</strong>
          </div>

        </div>


        <div className="booking-detail">

          <FaCalendarAlt />

          <div>
            <span>Booked On</span>
            <strong>{booking.bookingDate}</strong>
          </div>

        </div>


        <div className="booking-detail">

          <FaUser />

          <div>
            <span>Passenger</span>
            <strong>
              {booking.passenger?.name}
            </strong>
          </div>

        </div>


        <div className="booking-detail">

          <FaRupeeSign />

          <div>
            <span>Total Fare</span>

            <strong>
              ₹ {Number(booking.totalFare).toLocaleString()}
            </strong>
          </div>

        </div>

      </div>


      {/* Passenger Information */}
      <div className="booking-passenger">

        <div className="passenger-title">
          <FaUser />
          <span>Passenger Details</span>
        </div>

        <div className="passenger-info">

          <span>
            {booking.passenger?.age} years
          </span>

          <span>
            {booking.passenger?.gender}
          </span>

          <span>
            {booking.passenger?.berthPreference}
          </span>

        </div>

      </div>


      {/* Cancel action */}
      {!isCancelled && onCancel && (
        <div className="booking-actions">
          <button
            type="button"
            className="cancel-booking-btn"
            onClick={() => onCancel(booking.id)}
          >
            Cancel Booking
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="booking-card-footer">

        <div className="booking-contact">

          <span>
            {booking.passenger?.mobile}
          </span>

          <span>
            {booking.passenger?.email}
          </span>

        </div>

        <div className="booking-fare">

          <span>Total Fare</span>

          <strong>
            ₹ {Number(booking.totalFare).toLocaleString()}
          </strong>

        </div>

      </div>

    </div>
  );
}

export default BookingCard;