package com.vinoth.trainreservationsystem.dto.response;

import lombok.Data;

@Data
public class PassengerResponse {

    private int id;
    private String name;
    private Integer age;
    private String gender;
    private String mobile;
    private String email;
    private String berthPreference;
}