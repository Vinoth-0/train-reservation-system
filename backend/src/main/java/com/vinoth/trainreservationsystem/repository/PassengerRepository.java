package com.vinoth.trainreservationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vinoth.trainreservationsystem.entity.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Integer> {

}