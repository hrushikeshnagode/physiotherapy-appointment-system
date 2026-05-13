package com.physiotherapyappointmentsystem.service;

import com.physiotherapyappointmentsystem.dto.*;
import com.physiotherapyappointmentsystem.entity.*;
import com.physiotherapyappointmentsystem.exception.*;
import com.physiotherapyappointmentsystem.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final UserRepository userRepository;
    private final PhysiotherapistProfileRepository physioProfileRepository;
    private final AppointmentSlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    public PatientService(UserRepository userRepository,
                          PhysiotherapistProfileRepository physioProfileRepository,
                          AppointmentSlotRepository slotRepository,
                          AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.physioProfileRepository = physioProfileRepository;
        this.slotRepository = slotRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<PhysiotherapistDTO> getAllPhysiotherapists() {
        List<PhysiotherapistProfile> profiles = physioProfileRepository.findAll();
        return profiles.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private PhysiotherapistDTO mapToDTO(PhysiotherapistProfile p) {
        boolean available = !slotRepository.findByPhysiotherapistIdAndDateAndStatus(
                p.getUser().getId(), java.time.LocalDate.now(), SlotStatus.AVAILABLE
        ).isEmpty();

        return PhysiotherapistDTO.builder()
                .userId(p.getUser().getId())
                .name(p.getUser().getName())
                .email(p.getUser().getEmail())
                .qualification(p.getQualification())
                .specialization(p.getSpecialization())
                .clinicAddress(p.getClinicAddress())
                .fees(p.getFees())
                .contactNumber(p.getContactNumber())
                .availableToday(available)
                .build();
    }

    public List<SlotDTO> getAvailableSlots(Long physioId, LocalDate date) {
        List<AppointmentSlot> slots = slotRepository
                .findByPhysiotherapistIdAndDateAndStatus(physioId, date, SlotStatus.AVAILABLE);
        return slots.stream().map(s -> SlotDTO.builder()
                .id(s.getId())
                .date(s.getDate())
                .startTime(s.getStartTime())
                .endTime(s.getEndTime())
                .status(s.getStatus().name())
                .build()
        ).collect(Collectors.toList());
    }

    @Transactional
    public AppointmentDTO bookAppointment(String patientEmail, BookingRequest request) {
        User patient = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        User physio = userRepository.findById(request.getPhysiotherapistId())
                .orElseThrow(() -> new ResourceNotFoundException("Physiotherapist not found"));

        AppointmentSlot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        if (slot.getStatus() == SlotStatus.BOOKED) {
            throw new BadRequestException("Slot is already booked");
        }

        // AUTO-RESCHEDULE LOGIC:
        // Check if patient already has ANY appointment on this day
        appointmentRepository.findByPatientIdAndAppointmentDate(
                patient.getId(), slot.getDate()
        ).ifPresent(oldAppointment -> {
            // 1. Release the old slot
            AppointmentSlot oldSlot = oldAppointment.getSlot();
            oldSlot.setStatus(SlotStatus.AVAILABLE);
            slotRepository.save(oldSlot);

            // 2. Delete the old appointment record
            appointmentRepository.delete(oldAppointment);
        });

        // Mark NEW slot as booked
        slot.setStatus(SlotStatus.BOOKED);
        slotRepository.save(slot);

        // Create appointment with mock payment success
        Appointment appointment = Appointment.builder()
                .patient(patient)
                .physiotherapist(physio)
                .slot(slot)
                .appointmentDate(slot.getDate())
                .status(AppointmentStatus.CONFIRMED)
                .paymentStatus(PaymentStatus.SUCCESS)
                .build();

        appointmentRepository.save(appointment);

        return mapToAppointmentDTO(appointment);
    }

    public List<AppointmentDTO> getPatientAppointments(String patientEmail) {
        User patient = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        return appointmentRepository.findByPatientIdOrderByAppointmentDateDesc(patient.getId())
                .stream().map(this::mapToAppointmentDTO).collect(Collectors.toList());
    }

    private AppointmentDTO mapToAppointmentDTO(Appointment a) {
        PhysiotherapistProfile profile = physioProfileRepository.findByUserId(a.getPhysiotherapist().getId())
                .orElse(new PhysiotherapistProfile());

        return AppointmentDTO.builder()
                .id(a.getId())
                .patientName(a.getPatient().getName())
                .physiotherapistName(a.getPhysiotherapist().getName())
                .appointmentDate(a.getAppointmentDate())
                .startTime(a.getSlot().getStartTime())
                .endTime(a.getSlot().getEndTime())
                .status(a.getStatus().name())
                .paymentStatus(a.getPaymentStatus().name())
                .qualification(profile.getQualification())
                .specialization(profile.getSpecialization())
                .clinicAddress(profile.getClinicAddress())
                .contactNumber(profile.getContactNumber())
                .fees(profile.getFees())
                .build();
    }
}
