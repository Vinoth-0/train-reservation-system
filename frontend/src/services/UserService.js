import axios from "axios";

const API_URL = "http://localhost:8080/users";

const UserService = {

  register(user) {
    return axios.post(API_URL, user);
  },

  getAllUsers() {
    return axios.get(API_URL);
  },

  getUserById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  updateUser(id, user) {
    return axios.put(`${API_URL}/${id}`, user);
  },

  deleteUser(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
  login(credentials) {
    return axios.post(`${API_URL}/login`, credentials);
  },
  updateUser(id, user) {
    return axios.put(`${API_URL}/${id}`, user);
  }
};

export default UserService;