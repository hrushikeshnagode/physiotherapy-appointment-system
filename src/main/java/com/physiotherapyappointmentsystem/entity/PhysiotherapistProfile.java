package com.physiotherapyappointmentsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "physiotherapist_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhysiotherapistProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String qualification;

    private String specialization;

    @Column(name = "clinic_address")
    private String clinicAddress;

    private Double fees;

    @Column(name = "contact_number")
    private String contactNumber;
}
