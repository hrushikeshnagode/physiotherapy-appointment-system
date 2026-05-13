package com.physiotherapyappointmentsystem.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private Long id;
    private String patientName;
    private String physiotherapistName;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private String paymentStatus;

    // Extra details for 'Details' view
    private String qualification;
    private String specialization;
    private String clinicAddress;
    private String contactNumber;
    private Double fees;
}
