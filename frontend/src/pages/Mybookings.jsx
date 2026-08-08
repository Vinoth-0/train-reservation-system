import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookingCard from "../components/BookingCard";
import BookingService from "../services/BookingService";
import "./MyBookings.css";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      toast.error("Please login to view your bookings.");
      navigate("/login");
      return;
    }

    fetchBookings(loggedInUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookings = async (userId) => {
    setLoading(true);
    try {
      const response = await BookingService.getMyBookings(userId);
      setBookings(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load your bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      await BookingService.cancelBooking(bookingId, loggedInUser.id);
      toast.success("Booking cancelled successfully.");
      fetchBookings(loggedInUser.id);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to cancel booking."
      );
    }
  };

  if (loading) {
    return (
      <div className="my-bookings-page">
        <h1>My Bookings</h1>
        <div className="empty-bookings">
          <p>Loading your bookings…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="booking-list">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
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