package com.vinoth.trainreservationsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.vinoth.trainreservationsystem.dto.request.TrainRequest;
import com.vinoth.trainreservationsystem.dto.response.TrainResponse;
import com.vinoth.trainreservationsystem.service.TrainService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/trains")
public class TrainController {

	private final TrainService trainService;

	public TrainController(TrainService trainService) {
		this.trainService = trainService;
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public TrainResponse saveTrain(@Valid @RequestBody TrainRequest request) {
		return trainService.saveTrain(request);
	}

	@GetMapping("/{id}")
	public TrainResponse findTrainById(@PathVariable int id) {
		return trainService.findTrainById(id);
	}

	@GetMapping
	public List<TrainResponse> findAllTrains() {
		return trainService.findAllTrains();
	}

	@GetMapping("/search")
	public List<TrainResponse> searchTrains(
			@RequestParam(required = false) String source,
			@RequestParam(required = false) String destination) {
		return trainService.searchTrains(source, destination);
	}

	@PutMapping("/{id}")
	public TrainResponse updateTrain(@PathVariable int id, @Valid @RequestBody TrainRequest request) {
		return trainService.updateTrain(id, request);
	}

	@DeleteMapping("/{id}")
	public String deleteTrain(@PathVariable int id) {
		return trainService.deleteTrain(id);
	}
}