package com.physiotherapyappointmentsystem.repository;

import com.physiotherapyappointmentsystem.entity.PhysiotherapistProfile;
import com.physiotherapyappointmentsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PhysiotherapistProfileRepository extends JpaRepository<PhysiotherapistProfile, Long> {
    Optional<PhysiotherapistProfile> findByUser(User user);
    Optional<PhysiotherapistProfile> findByUserId(Long userId);
}
