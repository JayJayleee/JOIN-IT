package com.asrai.joinit.user.therapist;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.Therapist;
import com.asrai.joinit.domain.Treatment;
import com.querydsl.core.Tuple;
import java.util.List;

public interface TherapistRepositoryCustom {

    List<Therapist> getTherapistList();

    List<Tuple> findPatientListByTherapistId(String therapistId);

    Patient findPatientByTherapist(String patientId);

    List<Treatment> findByTherapistIdAndPatientId(String therapistId, String patientId);
}
