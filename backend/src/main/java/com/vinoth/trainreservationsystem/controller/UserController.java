package com.vinoth.trainreservationsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.vinoth.trainreservationsystem.dto.request.LoginRequest;
import com.vinoth.trainreservationsystem.dto.request.UserRequest;
import com.vinoth.trainreservationsystem.dto.response.UserResponse;
import com.vinoth.trainreservationsystem.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse saveUser(@Valid @RequestBody UserRequest request) {
        return userService.saveUser(request);
    }

    @GetMapping("/{id}")
    public UserResponse findUserById(@PathVariable int id) {
        return userService.findUserById(id);
    }

    @GetMapping
    public List<UserResponse> findAllUsers() {
        return userService.findAllUsers();
    }

    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable int id,
                                   @Valid @RequestBody UserRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }
    
    @PostMapping("/login")
    public UserResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }
}