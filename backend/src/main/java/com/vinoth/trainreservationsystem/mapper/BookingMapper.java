package com.vinoth.trainreservationsystem.mapper;

import org.springframework.stereotype.Component;

import com.vinoth.trainreservationsystem.dto.request.BookingRequest;
import com.vinoth.trainreservationsystem.dto.request.PassengerRequest;
import com.vinoth.trainreservationsystem.dto.response.BookingResponse;
import com.vinoth.trainreservationsystem.dto.response.PassengerResponse;
import com.vinoth.trainreservationsystem.entity.Booking;
import com.vinoth.trainreservationsystem.entity.Passenger;

@Component
public class BookingMapper {

    public Passenger passengerRequestToEntity(PassengerRequest request) {

        Passenger passenger = new Passenger();

        passenger.setName(request.getName());
        passenger.setAge(request.getAge());
        passenger.setGender(request.getGender());
        passenger.setMobile(request.getMobile());
        passenger.setEmail(request.getEmail());
        passenger.setBerthPreference(request.getBerthPreference());

        return passenger;
    }

    public PassengerResponse passengerToResponse(Passenger passenger) {

        PassengerResponse response = new PassengerResponse();

        response.setId(passenger.getId());
        response.setName(passenger.getName());
        response.setAge(passenger.getAge());
        response.setGender(passenger.getGender());
        response.setMobile(passenger.getMobile());
        response.setEmail(passenger.getEmail());
        response.setBerthPreference(passenger.getBerthPreference());

        return response;
    }

    public BookingResponse bookingToResponse(Booking booking) {

        BookingResponse response = new BookingResponse();

        response.setId(booking.getId());
        response.setPnrNumber(booking.getPnrNumber());
        response.setBookingDate(booking.getBookingDate());
        response.setTravelDate(booking.getTravelDate());
        response.setBookingStatus(booking.getBookingStatus());
        response.setTotalFare(booking.getTotalFare());

        // Train details
        response.setTrainId(booking.getTrain().getId());
        response.setTrainNumber(booking.getTrain().getTrainNumber());
        response.setTrainName(booking.getTrain().getTrainName());
        response.setSource(booking.getTrain().getSource());
        response.setDestination(booking.getTrain().getDestination());

        // Passenger details
        response.setPassenger(
                passengerToResponse(booking.getPassenger())
        );

        return response;
    }
}