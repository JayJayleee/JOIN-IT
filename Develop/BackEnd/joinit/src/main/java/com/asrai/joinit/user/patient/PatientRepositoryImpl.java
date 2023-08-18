package com.asrai.joinit.user.patient;

import static com.asrai.joinit.domain.QPatient.patient;
import static com.asrai.joinit.domain.QPrescription.prescription;
import static com.asrai.joinit.domain.QTreatment.treatment;
import static com.querydsl.core.types.dsl.Wildcard.count;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.PatientTreatmentDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;

public class PatientRepositoryImpl implements PatientRepositoryCustom {

    JPAQueryFactory queryFactory;

    public PatientRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Patient> findPatientList() {;
        return queryFactory.selectFrom(patient).fetch();
    }

    @Override
    public List<Treatment> patientTreatmentList(String therapistId, String patientId) {
        return queryFactory
            .selectFrom(treatment)
            .where(treatment.patient.userId.eq(patientId)
                .and(treatment.therapist.userId.eq(therapistId)))
            .fetch();
    }

    @Override
    public Integer countCompletedPrescriptionByTreatmentId(Integer treatmentId) {
        return Math.toIntExact(queryFactory
            .select(count)
            .from(prescription)
            .where((prescription.treatment.treatmentId.eq(treatmentId)
                .and(prescription.isCompleted.eq("Y"))))
            .fetchOne());
    }

    @Override
    public Integer countUncompletedPrescriptionByTreatmentId(Integer treatmentId) {
        return Math.toIntExact(queryFactory
            .select(count)
            .from(prescription)
            .where((prescription.treatment.treatmentId.eq(treatmentId)
                .and(prescription.isCompleted.eq("N"))))
            .fetchOne());
    }
}
