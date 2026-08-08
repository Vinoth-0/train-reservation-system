package com.vinoth.trainreservationsystem.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.vinoth.trainreservationsystem.dto.request.BookingRequest;
import com.vinoth.trainreservationsystem.dto.response.BookingResponse;
import com.vinoth.trainreservationsystem.entity.Booking;
import com.vinoth.trainreservationsystem.entity.Passenger;
import com.vinoth.trainreservationsystem.entity.TrainEntity;
import com.vinoth.trainreservationsystem.entity.UserEntity;
import com.vinoth.trainreservationsystem.mapper.BookingMapper;
import com.vinoth.trainreservationsystem.repository.BookingRepository;
import com.vinoth.trainreservationsystem.repository.TrainRepository;
import com.vinoth.trainreservationsystem.repository.UserRepository;
import com.vinoth.trainreservationsystem.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TrainRepository trainRepository;
    private final BookingMapper bookingMapper;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            TrainRepository trainRepository,
            BookingMapper bookingMapper) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.trainRepository = trainRepository;
        this.bookingMapper = bookingMapper;
    }

    @Override
    public BookingResponse createBooking(
            int userId,
            BookingRequest request) {

        // Find user
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Find train
        TrainEntity train = trainRepository.findById(request.getTrainId())
                .orElseThrow(() ->
                        new RuntimeException("Train not found"));

        // Check available seats
        if (train.getAvailableSeats() <= 0) {
            throw new RuntimeException("No seats available");
        }

        // Create passenger
        Passenger passenger =
                bookingMapper.passengerRequestToEntity(
                        request.getPassenger()
                );

        // Create booking
        Booking booking = new Booking();

        booking.setUser(user);
        booking.setTrain(train);
        booking.setPassenger(passenger);

        // Generate PNR
        booking.setPnrNumber(generatePnr());

        // Booking date
        booking.setBookingDate(LocalDate.now());

        // Travel date
        booking.setTravelDate(request.getTravelDate());

        // Status
        booking.setBookingStatus("CONFIRMED");

        // Fare
        booking.setTotalFare(train.getPrice());

        // Reduce available seats
        train.setAvailableSeats(
                train.getAvailableSeats() - 1
        );

        trainRepository.save(train);

        // Save booking
        Booking savedBooking =
                bookingRepository.save(booking);

        return bookingMapper.bookingToResponse(savedBooking);
    }

    @Override
    public BookingResponse findBookingById(int id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        return bookingMapper.bookingToResponse(booking);
    }

    @Override
    public BookingResponse findBookingByPnr(String pnrNumber) {

        Booking booking =
                bookingRepository.findByPnrNumber(pnrNumber)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found"));

        return bookingMapper.bookingToResponse(booking);
    }

    @Override
    public List<BookingResponse> findMyBookings(int userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return bookingRepository.findByUser(user)
                .stream()
                .map(bookingMapper::bookingToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public String cancelBooking(int id, int userId) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        // Make sure the booking belongs to this user
        if (booking.getUser().getId() != userId) {
            throw new RuntimeException(
                    "You are not allowed to cancel this booking"
            );
        }

        // Check if already cancelled
        if ("CANCELLED".equalsIgnoreCase(
                booking.getBookingStatus())) {

            throw new RuntimeException(
                    "Booking is already cancelled"
            );
        }

        // Change booking status
        booking.setBookingStatus("CANCELLED");

        // Increase available seats
        TrainEntity train = booking.getTrain();

        train.setAvailableSeats(
                train.getAvailableSeats() + 1
        );

        trainRepository.save(train);
        bookingRepository.save(booking);

        return "Booking cancelled successfully";
    }

    private String generatePnr() {

        String date =
                LocalDate.now()
                        .format(
                                DateTimeFormatter.ofPattern("yyyyMMdd")
                        );

        String random =
                UUID.randomUUID()
                        .toString()
                        .replace("-", "")
                        .substring(0, 6)
                        .toUpperCase();

        return "ATR" + date + random;
    }
}