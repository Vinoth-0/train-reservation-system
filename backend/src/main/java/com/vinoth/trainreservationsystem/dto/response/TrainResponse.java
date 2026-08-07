package com.vinoth.trainreservationsystem.dto.response;

import java.math.BigDecimal;
import java.time.LocalTime;

import lombok.Data;

@Data
public class TrainResponse {

    private int id;
    private String trainNumber;
    private String trainName;
    private String source;
    private String destination;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private int totalSeats;
    private int availableSeats;
    private BigDecimal price;
}