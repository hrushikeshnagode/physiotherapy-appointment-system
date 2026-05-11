package com.physiotherapyappointmentsystem.repository;

import com.physiotherapyappointmentsystem.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientIdOrderByAppointmentDateDesc(Long patientId);
    List<Appointment> findByPhysiotherapistIdAndAppointmentDate(Long physiotherapistId, LocalDate date);
    java.util.Optional<Appointment> findByPatientIdAndPhysiotherapistIdAndAppointmentDate(Long patientId, Long physiotherapistId, LocalDate date);
    java.util.Optional<Appointment> findByPatientIdAndAppointmentDate(Long patientId, LocalDate date);
}
