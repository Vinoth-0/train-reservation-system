package com.vinoth.trainreservationsystem.entity;

import java.math.BigDecimal;
import java.time.LocalTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Entity
@Data
@Table(name = "trains")
public class TrainEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank(message = "Enter train number")
	@Column(nullable = false, unique = true)
	@Pattern(regexp = "^\\d{5}$", message = "Train number must contain 5 digits")
	private String trainNumber;

	@NotBlank(message = "Enter train name")
	@Column(nullable = false)
	private String trainName;

	@NotBlank(message = "Enter the source")
	@Column(nullable = false)
	private String source;

	@NotBlank(message = "Enter your destination")
	@Column(nullable = false)
	private String destination;

	@NotNull(message = "Departure time is required")
	@Column(nullable = false)
	private LocalTime departureTime;

	@NotNull(message = "Arrival time is required")
	@Column(nullable = false)
	private LocalTime arrivalTime;

	@Column(nullable = false)
	@Positive
	private int totalSeats;

	@Column(nullable = false)
	@PositiveOrZero
	private int availableSeats;

	@Column(nullable = false)
	@Positive
	private BigDecimal price;
}
