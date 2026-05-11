package com.physiotherapyappointmentsystem.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private Long slotId;
    private Long physiotherapistId;
}
