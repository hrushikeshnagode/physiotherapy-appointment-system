package com.physiotherapyappointmentsystem.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhysiotherapistDTO {
    private Long userId;
    private String name;
    private String email;
    private String qualification;
    private String specialization;
    private String clinicAddress;
    private Double fees;
    private String contactNumber;
    private boolean availableToday;
}
