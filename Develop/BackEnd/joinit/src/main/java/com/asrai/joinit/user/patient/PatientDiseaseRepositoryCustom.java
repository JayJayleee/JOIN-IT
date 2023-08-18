package com.asrai.joinit.user.patient;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.dto.PatientDiseaseDto;
import java.util.List;

public interface PatientDiseaseRepositoryCustom {

    public List<PatientDiseaseDto> patientDiseaseDTOListByPatientId(Patient patient);

    void deleteByPatientId(String patientId);

}
