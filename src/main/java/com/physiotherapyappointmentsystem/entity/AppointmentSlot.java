package com.physiotherapyappointmentsystem.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.Builder.Default;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointment_slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "physiotherapist_id", nullable = false)
    private User physiotherapist;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Default
    private SlotStatus status = SlotStatus.AVAILABLE;
}
