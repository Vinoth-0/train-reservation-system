import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

const BookingService = {
  // Book Ticket
  bookTicket(bookingData) {
    return axios.post(`${API_URL}/book`, bookingData);
  },

  // Get all bookings of logged-in user
  getMyBookings() {
    return axios.get(`${API_URL}/my-bookings`);
  },

  // Get booking by PNR
  getBookingByPnr(pnr) {
    return axios.get(`${API_URL}/pnr/${pnr}`);
  },

  // Cancel booking
  cancelBooking(id) {
    return axios.delete(`${API_URL}/${id}`);
  },

  // Download ticket
  downloadTicket(id) {
    return axios.get(`${API_URL}/${id}/download`, {
      responseType: "blob",
    });
  },

  // Admin - Get all bookings
  getAllBookings() {
    return axios.get(API_URL);
  },
};

export default BookingService;