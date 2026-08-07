package com.vinoth.trainreservationsystem.dto.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserResponse {

    private int id;
    private String name;
    private String email;
    private String phoneNumber;
    private String role;
    private LocalDateTime createdAt;
}