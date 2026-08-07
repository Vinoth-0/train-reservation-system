package com.vinoth.trainreservationsystem.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.vinoth.trainreservationsystem.dto.request.LoginRequest;
import com.vinoth.trainreservationsystem.dto.request.UserRequest;
import com.vinoth.trainreservationsystem.dto.response.UserResponse;
import com.vinoth.trainreservationsystem.entity.UserEntity;
import com.vinoth.trainreservationsystem.mapper.UserMapper;
import com.vinoth.trainreservationsystem.repository.UserRepository;
import com.vinoth.trainreservationsystem.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponse saveUser(UserRequest request) {

        UserEntity user = userMapper.requestToUser(request);

        user.setRole("USER");
        
        UserEntity savedUser = userRepository.save(user);

        return userMapper.userToResponse(savedUser);
    }

    @Override
    public UserResponse findUserById(int id) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.userToResponse(user);
    }

    @Override
    public List<UserResponse> findAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::userToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUser(int id, UserRequest request) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        UserEntity updatedUser = userRepository.save(user);

        return userMapper.userToResponse(updatedUser);
    }

    @Override
    public String deleteUser(int id) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);

        return "User deleted successfully";
    }

    @Override
    public UserResponse login(LoginRequest request) {

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }

        return userMapper.userToResponse(user);
    }
}