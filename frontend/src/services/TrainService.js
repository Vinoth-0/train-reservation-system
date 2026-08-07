import axios from "axios";

const API_URL = "http://localhost:8080/trains";

const TrainService = {

  // Add Train
  saveTrain(train) {
    return axios.post(API_URL, train);
  },

  // Get All Trains
  getAllTrains() {
    return axios.get(API_URL);
  },

  // Search trains by source/destination
  searchTrains(params) {
    return axios.get(`${API_URL}/search`, { params });
  },

  // Get Train By Id
  getTrainById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  // Update Train
  updateTrain(id, train) {
    return axios.put(`${API_URL}/${id}`, train);
  },

  // Delete Train
  deleteTrain(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

};

export default TrainService;