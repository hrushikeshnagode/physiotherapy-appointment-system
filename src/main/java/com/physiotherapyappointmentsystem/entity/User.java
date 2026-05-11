package com.physiotherapyappointmentsystem.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.Builder.Default;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    @Default
    private Boolean verified = true; // Auto-verified (mock)

    private Integer age;

    private String gender;

    @Column(name = "contact_number")
    private String contactNumber;
}
