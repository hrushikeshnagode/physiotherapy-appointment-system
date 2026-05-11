package com.physiotherapyappointmentsystem.controller;

import com.physiotherapyappointmentsystem.dto.*;
import com.physiotherapyappointmentsystem.service.PatientService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/physiotherapists")
    public ResponseEntity<List<PhysiotherapistDTO>> getAllPhysiotherapists() {
        return ResponseEntity.ok(patientService.getAllPhysiotherapists());
    }

    @GetMapping("/physiotherapists/{id}/slots")
    public ResponseEntity<List<SlotDTO>> getSlots(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(patientService.getAvailableSlots(id, date));
    }

    @PostMapping("/appointments/book")
    public ResponseEntity<AppointmentDTO> bookAppointment(
            Authentication authentication,
            @RequestBody BookingRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(patientService.bookAppointment(email, request));
    }

    @GetMapping("/patient/appointments")
    public ResponseEntity<List<AppointmentDTO>> getMyAppointments(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(patientService.getPatientAppointments(email));
    }
}
