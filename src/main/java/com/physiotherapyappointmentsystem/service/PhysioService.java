package com.physiotherapyappointmentsystem.service;

import com.physiotherapyappointmentsystem.dto.*;
import com.physiotherapyappointmentsystem.entity.*;
import com.physiotherapyappointmentsystem.exception.*;
import com.physiotherapyappointmentsystem.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhysioService {

    private final UserRepository userRepository;
    private final PhysiotherapistProfileRepository physioProfileRepository;
    private final AppointmentSlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    public PhysioService(UserRepository userRepository,
                         PhysiotherapistProfileRepository physioProfileRepository,
                         AppointmentSlotRepository slotRepository,
                         AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.physioProfileRepository = physioProfileRepository;
        this.slotRepository = slotRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Transactional
    public List<SlotDTO> createSlots(String physioEmail, SlotRequest request) {
        User physio = userRepository.findByEmail(physioEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Physiotherapist not found"));

        int interval = request.getIntervalMinutes() != null ? request.getIntervalMinutes() : 30;
        LocalTime current = request.getStartTime();
        List<AppointmentSlot> slots = new ArrayList<>();

        while (current.plusMinutes(interval).compareTo(request.getEndTime()) <= 0) {
            AppointmentSlot slot = AppointmentSlot.builder()
                    .physiotherapist(physio)
                    .date(request.getDate())
                    .startTime(current)
                    .endTime(current.plusMinutes(interval))
                    .status(SlotStatus.AVAILABLE)
                    .build();
            slots.add(slot);
            current = current.plusMinutes(interval);
        }

        slotRepository.saveAll(slots);

        return slots.stream().map(s -> SlotDTO.builder()
                .id(s.getId())
                .date(s.getDate())
                .startTime(s.getStartTime())
                .endTime(s.getEndTime())
                .status(s.getStatus().name())
                .build()
        ).collect(Collectors.toList());
    }

    public List<AppointmentDTO> getTodayAppointments(String physioEmail) {
        User physio = userRepository.findByEmail(physioEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Physiotherapist not found"));

        return appointmentRepository.findByPhysiotherapistIdAndAppointmentDate(
                physio.getId(), LocalDate.now()
        ).stream().map(a -> AppointmentDTO.builder()
                .id(a.getId())
                .patientName(a.getPatient().getName())
                .physiotherapistName(a.getPhysiotherapist().getName())
                .appointmentDate(a.getAppointmentDate())
                .startTime(a.getSlot().getStartTime())
                .endTime(a.getSlot().getEndTime())
                .status(a.getStatus().name())
                .paymentStatus(a.getPaymentStatus().name())
                .build()
        ).collect(Collectors.toList());
    }

    @Transactional
    public SlotDTO updateSlot(String physioEmail, Long slotId, SlotDTO slotDTO) {
        User physio = userRepository.findByEmail(physioEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Physiotherapist not found"));

        AppointmentSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        if (!slot.getPhysiotherapist().getId().equals(physio.getId())) {
            throw new BadRequestException("You can only update your own slots");
        }

        if (slotDTO.getStartTime() != null) slot.setStartTime(slotDTO.getStartTime());
        if (slotDTO.getEndTime() != null) slot.setEndTime(slotDTO.getEndTime());
        if (slotDTO.getDate() != null) slot.setDate(slotDTO.getDate());

        slotRepository.save(slot);

        return SlotDTO.builder()
                .id(slot.getId())
                .date(slot.getDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .status(slot.getStatus().name())
                .build();
    }

    @Transactional
    public String updateFees(String physioEmail, FeesUpdateRequest request) {
        User physio = userRepository.findByEmail(physioEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Physiotherapist not found"));

        PhysiotherapistProfile profile = physioProfileRepository.findByUser(physio)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        profile.setFees(request.getFees());
        physioProfileRepository.save(profile);

        return "Fees updated to ₹" + request.getFees();
    }
}
