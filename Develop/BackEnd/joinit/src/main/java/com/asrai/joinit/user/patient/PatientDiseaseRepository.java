package com.asrai.joinit.user.patient;

import com.asrai.joinit.domain.PatientDisease;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientDiseaseRepository extends JpaRepository<PatientDisease, Long>, PatientDiseaseRepositoryCustom {

}
