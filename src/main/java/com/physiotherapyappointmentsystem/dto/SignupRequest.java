package com.physiotherapyappointmentsystem.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String role; // PATIENT or PHYSIOTHERAPIST
    private Integer age;
    private String gender;
    private String contactNumber;

    // Physiotherapist-specific fields
    private String qualification;
    private String specialization;
    private String clinicAddress;
    private Double fees;
}
