package com.vinoth.trainreservationsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.vinoth.trainreservationsystem.dto.request.BookingRequest;
import com.vinoth.trainreservationsystem.dto.response.BookingResponse;
import com.vinoth.trainreservationsystem.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse createBooking(
            @PathVariable int userId,
            @Valid @RequestBody BookingRequest request) {

        return bookingService.createBooking(userId, request);
    }

    @GetMapping("/{id}")
    public BookingResponse findBookingById(
            @PathVariable int id) {

        return bookingService.findBookingById(id);
    }

    @GetMapping("/pnr/{pnrNumber}")
    public BookingResponse findBookingByPnr(
            @PathVariable String pnrNumber) {

        return bookingService.findBookingByPnr(pnrNumber);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> findMyBookings(
            @PathVariable int userId) {

        return bookingService.findMyBookings(userId);
    }

    @PutMapping("/{id}/cancel/user/{userId}")
    public String cancelBooking(
            @PathVariable int id,
            @PathVariable int userId) {

        return bookingService.cancelBooking(id, userId);
    }
}