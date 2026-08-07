package com.vinoth.trainreservationsystem.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.vinoth.trainreservationsystem.dto.request.TrainRequest;
import com.vinoth.trainreservationsystem.dto.response.TrainResponse;
import com.vinoth.trainreservationsystem.entity.TrainEntity;
import com.vinoth.trainreservationsystem.mapper.TrainMapper;
import com.vinoth.trainreservationsystem.repository.TrainRepository;
import com.vinoth.trainreservationsystem.service.TrainService;

@Service
public class TrainServiceImpl implements TrainService {

    private final TrainRepository trainRepository;
    private final TrainMapper trainMapper;

    public TrainServiceImpl(TrainRepository trainRepository, TrainMapper trainMapper) {
        this.trainRepository = trainRepository;
        this.trainMapper = trainMapper;
    }

    @Override
    public TrainResponse saveTrain(TrainRequest request) {

        TrainEntity train = trainMapper.requestToTrain(request);

        TrainEntity savedTrain = trainRepository.save(train);

        return trainMapper.trainToResponse(savedTrain);
    }

    @Override
    public TrainResponse findTrainById(int id) {

        TrainEntity train = trainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Train not found"));

        return trainMapper.trainToResponse(train);
    }

    @Override
    public List<TrainResponse> findAllTrains() {

        return trainRepository.findAll()
                .stream()
                .map(trainMapper::trainToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<TrainResponse> searchTrains(String source, String destination) {

        String sourceFilter = source == null ? "" : source.trim();
        String destinationFilter = destination == null ? "" : destination.trim();

        return trainRepository
                .findBySourceContainingIgnoreCaseAndDestinationContainingIgnoreCase(
                        sourceFilter, destinationFilter)
                .stream()
                .map(trainMapper::trainToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TrainResponse updateTrain(int id, TrainRequest request) {

        TrainEntity train = trainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Train not found"));

        train.setTrainNumber(request.getTrainNumber());
        train.setTrainName(request.getTrainName());
        train.setSource(request.getSource());
        train.setDestination(request.getDestination());
        train.setDepartureTime(request.getDepartureTime());
        train.setArrivalTime(request.getArrivalTime());
        train.setTotalSeats(request.getTotalSeats());
        train.setAvailableSeats(request.getAvailableSeats());
        train.setPrice(request.getPrice());

        TrainEntity updatedTrain = trainRepository.save(train);

        return trainMapper.trainToResponse(updatedTrain);
    }

    @Override
    public String deleteTrain(int id) {

        TrainEntity train = trainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Train not found"));

        trainRepository.delete(train);

        return "Train deleted successfully";
    }
}