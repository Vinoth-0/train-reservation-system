package com.vinoth.trainreservationsystem.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "bookings")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true, nullable = false)
	private String pnrNumber;
	@Column(nullable = false)
	private LocalDate bookingDate;
	
	@Column(nullable = false)
	private LocalDate travelDate;

	@Column(nullable = false)
	private String bookingStatus;

	@Column(nullable = false)
	private BigDecimal totalFare;

	
	@ManyToOne
	@JoinColumn(nullable = false)
	private UserEntity user;

	@ManyToOne
	@JoinColumn(nullable = false)
	private TrainEntity train;

	@OneToOne
	@JoinColumn(nullable = false)
	private Passenger passenger;
}
