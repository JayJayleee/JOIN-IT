package com.asrai.joinit.user.therapist;

import static com.asrai.joinit.domain.QPatient.patient;
import static com.asrai.joinit.domain.QTherapist.therapist;
import static com.asrai.joinit.domain.QTreatment.treatment;
import static com.asrai.joinit.domain.QUser.user;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.Therapist;
import com.asrai.joinit.domain.Treatment;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;

public class TherapistRepositoryImpl implements TherapistRepositoryCustom {

    EntityManager em;
    JPAQueryFactory queryFactory;

    public TherapistRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Therapist> getTherapistList() {
        return queryFactory
            .selectFrom(therapist)
            .fetch();
    }

    @Override
    public List<Tuple> findPatientListByTherapistId(String therapistId) {
        return queryFactory
            .select(treatment.patient.userId, treatment.patient.name
                , treatment.patient.phone, treatment.isCompleted, treatment.endTime)
            .distinct()
            .from(treatment)
            .where(treatment.therapist.userId.eq(therapistId))
            .orderBy(treatment.isCompleted.asc(), treatment.patientName.asc(), treatment.endTime.desc())
            .fetch();
    }

    @Override
    public Patient findPatientByTherapist(String patientId) {
        return queryFactory
            .select(patient)
            .from(patient)
            .where(patient.userId.eq(patientId))
            .fetchOne();
    }

    @Override
    public List<Treatment> findByTherapistIdAndPatientId(String therapistId, String patientId) {
        List<Treatment> fetch = queryFactory
            .select(treatment)
            .from(treatment)
            .where(treatment.therapist.userId.eq(therapistId),
                treatment.patient.userId.eq(patientId))
            .orderBy(treatment.isCompleted.asc(), treatment.patientName.asc())
            .fetch();
        return fetch;
    }
}
