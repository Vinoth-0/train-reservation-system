package com.vinoth.trainreservationsystem.service;

import java.util.List;

import com.vinoth.trainreservationsystem.dto.request.TrainRequest;
import com.vinoth.trainreservationsystem.dto.response.TrainResponse;

public interface TrainService {

    TrainResponse saveTrain(TrainRequest request);

    TrainResponse findTrainById(int id);

    List<TrainResponse> findAllTrains();

    List<TrainResponse> searchTrains(String source, String destination);

    TrainResponse updateTrain(int id, TrainRequest request);

    String deleteTrain(int id);

}