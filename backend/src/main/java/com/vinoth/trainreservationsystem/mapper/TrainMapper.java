package com.vinoth.trainreservationsystem.mapper;

import org.springframework.stereotype.Component;

import com.vinoth.trainreservationsystem.dto.request.TrainRequest;
import com.vinoth.trainreservationsystem.dto.response.TrainResponse;
import com.vinoth.trainreservationsystem.entity.TrainEntity;

@Component
public class TrainMapper {

    public TrainEntity requestToTrain(TrainRequest request) {

        TrainEntity train = new TrainEntity();

        train.setTrainNumber(request.getTrainNumber());
        train.setTrainName(request.getTrainName());
        train.setSource(request.getSource());
        train.setDestination(request.getDestination());
        train.setDepartureTime(request.getDepartureTime());
        train.setArrivalTime(request.getArrivalTime());
        train.setTotalSeats(request.getTotalSeats());
        train.setAvailableSeats(request.getAvailableSeats());
        train.setPrice(request.getPrice());

        return train;
    }

    public TrainResponse trainToResponse(TrainEntity train) {

        TrainResponse response = new TrainResponse();

        response.setId(train.getId());
        response.setTrainNumber(train.getTrainNumber());
        response.setTrainName(train.getTrainName());
        response.setSource(train.getSource());
        response.setDestination(train.getDestination());
        response.setDepartureTime(train.getDepartureTime());
        response.setArrivalTime(train.getArrivalTime());
        response.setTotalSeats(train.getTotalSeats());
        response.setAvailableSeats(train.getAvailableSeats());
        response.setPrice(train.getPrice());

        return response;
    }
}