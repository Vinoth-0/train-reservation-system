package com.vinoth.trainreservationsystem.mapper;

import org.springframework.stereotype.Component;

import com.vinoth.trainreservationsystem.dto.request.UserRequest;
import com.vinoth.trainreservationsystem.dto.response.UserResponse;
import com.vinoth.trainreservationsystem.entity.UserEntity;

@Component
public class UserMapper {

    public UserEntity requestToUser(UserRequest request) {
        UserEntity user = new UserEntity();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        return user;
    }

    public UserResponse userToResponse(UserEntity user) {
        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setRole(user.getRole());
        response.setCreatedAt(user.getCreatedAt());

        return response;
    }
}