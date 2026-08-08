import axios from "axios";

const API_URL = "http://localhost:8080/bookings";

const BookingService = {
  // Create booking
  bookTicket(userId, bookingData) {
    return axios.post(`${API_URL}/user/${userId}`, bookingData);
  },

  // Get booking by ID
  getBookingById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  // Get booking by PNR
  getBookingByPnr(pnrNumber) {
    return axios.get(`${API_URL}/pnr/${pnrNumber}`);
  },

  // Get all bookings of logged-in user
  getMyBookings(userId) {
    return axios.get(`${API_URL}/user/${userId}`);
  },

  // Cancel booking
  cancelBooking(id, userId) {
    return axios.put(`${API_URL}/${id}/cancel/user/${userId}`);
  },
};

export default BookingService;
