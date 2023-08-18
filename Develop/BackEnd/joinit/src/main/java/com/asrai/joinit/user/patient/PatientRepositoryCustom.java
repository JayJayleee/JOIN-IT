package com.asrai.joinit.user.patient;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.PatientTreatmentDto;
import java.util.List;

public interface PatientRepositoryCustom {

    List<Patient> findPatientList();

    List<Treatment> patientTreatmentList(String therapistId, String patientId);

    Integer countCompletedPrescriptionByTreatmentId(Integer treatmentId);

    Integer countUncompletedPrescriptionByTreatmentId(Integer treatmentId);
}
