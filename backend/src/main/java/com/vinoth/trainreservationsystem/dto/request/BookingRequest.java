package com.vinoth.trainreservationsystem.dto.request;

import java.time.LocalDate;

import jakarta.validation.Valid;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingRequest {

	@NotNull(message = "Train is required")
	private Integer trainId;

	@NotNull(message = "Travel date is required")
	@FutureOrPresent(message = "Travel date cannot be in the past")
	private LocalDate travelDate;

	@Valid
	@NotNull(message = "Passenger details are required")
	private PassengerRequest passenger;

}
