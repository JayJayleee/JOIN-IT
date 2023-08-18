package com.asrai.joinit.user.patient;

import com.asrai.joinit.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, String>, PatientRepositoryCustom {

    Integer countByNickname(String nickname);
}
