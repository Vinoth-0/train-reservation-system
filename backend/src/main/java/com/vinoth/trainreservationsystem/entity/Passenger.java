package com.vinoth.trainreservationsystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Data
@Table(name = "passenger")
public class Passenger {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank(message = "Enter your Name")
	@Column(nullable = false)
	private String name;

	@NotNull(message = "Enter your Age")
	@Column(nullable = false)
	private int age;

	@NotBlank(message = "Gender is required")	
	@Column(nullable = false)
	private String gender;

	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid mobile number")
	@Column(nullable = false, unique = true, length = 10)
	private String mobile;

	@Column(nullable = false, unique = true)
	@Email(message = "Invalid email format")
	private String email;

	@Column(nullable = false)
	private String berthPreference;
}

