package com.vinoth.trainreservationsystem.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingResponse {

    private int id;
    private String pnrNumber;
    private LocalDate bookingDate;
    private LocalDate travelDate;
    private String bookingStatus;
    private BigDecimal totalFare;

    private int trainId;
    private String trainNumber;
    private String trainName;
    private String source;
    private String destination;

    private PassengerResponse passenger;
}