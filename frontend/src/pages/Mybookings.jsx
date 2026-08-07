import { useState } from "react";
import BookingCard from "../components/BookingCard";
import "./MyBookings.css";

function MyBookings() {
  // Dummy data (Replace with API later)
  const [bookings] = useState([
    {
      pnr: "PNR123456",
      trainNumber: "12621",
      trainName: "Tamil Nadu Express",
      passengerName: "Vinoth Kumar",
      source: "Chennai",
      destination: "New Delhi",
      travelDate: "15 Jul 2026",
      status: "Confirmed",
    },
    {
      pnr: "PNR654321",
      trainNumber: "12627",
      trainName: "Karnataka Express",
      passengerName: "Vinoth Kumar",
      source: "Chennai",
      destination: "Bengaluru",
      travelDate: "22 Jul 2026",
      status: "Waiting",
    },
    {
      pnr: "PNR987654",
      trainNumber: "12676",
      trainName: "Kovai Express",
      passengerName: "Vinoth Kumar",
      source: "Chennai",
      destination: "Coimbatore",
      travelDate: "05 Aug 2026",
      status: "Cancelled",
    },
  ]);

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="booking-list">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.pnr}
              booking={booking}
            />
          ))}
        </div>
      ) : (
        <div className="empty-bookings">
          <h2>No Bookings Found</h2>
          <p>You haven't booked any train tickets yet.</p>
        </div>
      )}
    </div>
  );
}

export default MyBookings;