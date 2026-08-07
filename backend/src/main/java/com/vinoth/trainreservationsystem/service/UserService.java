package com.vinoth.trainreservationsystem.service;

import java.util.List;

import com.vinoth.trainreservationsystem.dto.request.LoginRequest;
import com.vinoth.trainreservationsystem.dto.request.UserRequest;
import com.vinoth.trainreservationsystem.dto.response.UserResponse;

public interface UserService {

    UserResponse saveUser(UserRequest request);
    
    UserResponse login(LoginRequest request);

    UserResponse findUserById(int id);

    List<UserResponse> findAllUsers();

    UserResponse updateUser(int id, UserRequest request);

    String deleteUser(int id);
    

}