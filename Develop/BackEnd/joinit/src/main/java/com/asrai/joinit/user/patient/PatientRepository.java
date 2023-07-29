package com.asrai.joinit.user.patient;

import com.asrai.joinit.domain.Patient;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
//@Slf4j
//@RequiredArgsConstructor
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
