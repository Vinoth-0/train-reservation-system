package com.vinoth.trainreservationsystem.service;

import java.util.List;

import com.vinoth.trainreservationsystem.dto.request.BookingRequest;
import com.vinoth.trainreservationsystem.dto.response.BookingResponse;

public interface BookingService {

    BookingResponse createBooking(int userId, BookingRequest request);

    BookingResponse findBookingById(int id);

    BookingResponse findBookingByPnr(String pnrNumber);

    List<BookingResponse> findMyBookings(int userId);

    String cancelBooking(int id, int userId);
}