package com.vinoth.trainreservationsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vinoth.trainreservationsystem.entity.TrainEntity;

public interface TrainRepository extends JpaRepository<TrainEntity, Integer>{

    List<TrainEntity> findBySourceContainingIgnoreCaseAndDestinationContainingIgnoreCase(
            String source, String destination);

}