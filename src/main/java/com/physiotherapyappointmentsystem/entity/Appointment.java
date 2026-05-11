package com.physiotherapyappointmentsystem.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.Builder.Default;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;

    @ManyToOne
    @JoinColumn(name = "physiotherapist_id", nullable = false)
    private User physiotherapist;

    @OneToOne
    @JoinColumn(name = "slot_id", nullable = false)
    private AppointmentSlot slot;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Default
    private AppointmentStatus status = AppointmentStatus.CONFIRMED;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    @Default
    private PaymentStatus paymentStatus = PaymentStatus.SUCCESS;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
