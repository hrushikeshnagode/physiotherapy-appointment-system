package com.physiotherapyappointmentsystem.service;

import com.physiotherapyappointmentsystem.dto.*;
import com.physiotherapyappointmentsystem.entity.*;
import com.physiotherapyappointmentsystem.exception.BadRequestException;
import com.physiotherapyappointmentsystem.repository.*;
import com.physiotherapyappointmentsystem.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PhysiotherapistProfileRepository physioProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PhysiotherapistProfileRepository physioProfileRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.physioProfileRepository = physioProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public String signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        Role role = Role.valueOf(request.getRole().toUpperCase());

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .verified(true) // Auto-verified (mock)
                .age(request.getAge())
                .gender(request.getGender())
                .contactNumber(request.getContactNumber())
                .build();

        userRepository.save(user);

        // If physiotherapist, create profile
        if (role == Role.PHYSIOTHERAPIST) {
            PhysiotherapistProfile profile = PhysiotherapistProfile.builder()
                    .user(user)
                    .qualification(request.getQualification())
                    .specialization(request.getSpecialization())
                    .clinicAddress(request.getClinicAddress())
                    .fees(request.getFees())
                    .contactNumber(request.getContactNumber())
                    .build();
            physioProfileRepository.save(profile);
        }

        return "Registration successful! (Auto-verified)";
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .name(user.getName())
                .userId(user.getId())
                .build();
    }
}
