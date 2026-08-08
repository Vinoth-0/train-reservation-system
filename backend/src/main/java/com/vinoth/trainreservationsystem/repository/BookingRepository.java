package com.vinoth.trainreservationsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vinoth.trainreservationsystem.entity.Booking;
import com.vinoth.trainreservationsystem.entity.UserEntity;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    Optional<Booking> findByPnrNumber(String pnrNumber);

    List<Booking> findByUser(UserEntity user);
}