package com.vinoth.trainreservationsystem.dto.request;

import java.math.BigDecimal;
import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class TrainRequest {

    @NotBlank(message = "Enter train number")
    private String trainNumber;

    @NotBlank(message = "Enter train name")
    private String trainName;

    @NotBlank(message = "Enter source")
    private String source;

    @NotBlank(message = "Enter destination")
    private String destination;

    @NotNull(message = "Departure time is required")
    private LocalTime departureTime;

    @NotNull(message = "Arrival time is required")
    private LocalTime arrivalTime;

    @Positive(message = "Total seats must be greater than 0")
    private int totalSeats;

    @PositiveOrZero(message = "Available seats cannot be negative")
    private int availableSeats;

    @Positive(message = "Price must be greater than 0")
    private BigDecimal price;
}