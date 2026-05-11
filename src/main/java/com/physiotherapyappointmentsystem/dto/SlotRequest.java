package com.physiotherapyappointmentsystem.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SlotRequest {
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer intervalMinutes; // default 30
}
