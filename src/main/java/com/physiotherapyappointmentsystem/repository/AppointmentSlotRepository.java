package com.physiotherapyappointmentsystem.repository;

import com.physiotherapyappointmentsystem.entity.AppointmentSlot;
import com.physiotherapyappointmentsystem.entity.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, Long> {
    List<AppointmentSlot> findByPhysiotherapistIdAndDate(Long physiotherapistId, LocalDate date);
    List<AppointmentSlot> findByPhysiotherapistIdAndDateAndStatus(Long physiotherapistId, LocalDate date, SlotStatus status);

    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT s.physiotherapist.id FROM AppointmentSlot s WHERE s.date = :date AND s.status = :status")
    List<Long> findPhysiotherapistIdsByDateAndStatus(java.time.LocalDate date, com.physiotherapyappointmentsystem.entity.SlotStatus status);
}
