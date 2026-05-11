package com.physiotherapyappointmentsystem.controller;

import com.physiotherapyappointmentsystem.dto.*;
import com.physiotherapyappointmentsystem.service.PhysioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/physio")
public class PhysioController {

    private final PhysioService physioService;

    public PhysioController(PhysioService physioService) {
        this.physioService = physioService;
    }

    @PostMapping("/slots")
    public ResponseEntity<List<SlotDTO>> createSlots(
            Authentication authentication,
            @RequestBody SlotRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(physioService.createSlots(email, request));
    }

    @GetMapping("/appointments/today")
    public ResponseEntity<List<AppointmentDTO>> getTodayAppointments(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(physioService.getTodayAppointments(email));
    }

    @PutMapping("/slots/{id}")
    public ResponseEntity<SlotDTO> updateSlot(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody SlotDTO slotDTO) {
        String email = authentication.getName();
        return ResponseEntity.ok(physioService.updateSlot(email, id, slotDTO));
    }

    @PutMapping("/profile/fees")
    public ResponseEntity<?> updateFees(
            Authentication authentication,
            @RequestBody FeesUpdateRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(Map.of("message", physioService.updateFees(email, request)));
    }
}
