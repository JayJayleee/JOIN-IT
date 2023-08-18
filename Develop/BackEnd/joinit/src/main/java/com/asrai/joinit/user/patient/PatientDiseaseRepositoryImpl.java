package com.asrai.joinit.user.patient;

import static com.asrai.joinit.domain.QPatientDisease.patientDisease;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.dto.PatientDiseaseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class PatientDiseaseRepositoryImpl implements PatientDiseaseRepositoryCustom {

    private JPAQueryFactory queryFactory;

    public PatientDiseaseRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<PatientDiseaseDto> patientDiseaseDTOListByPatientId(Patient patient) {
        return queryFactory
            .select(Projections.fields(PatientDiseaseDto.class
                , patientDisease.diseaseId, patientDisease.patient.userId, patientDisease.diseaseCode))
            .from(patientDisease)
            .where(patientDisease.patient.eq(patient))
            .fetch();
    }

    @Override
    public void deleteByPatientId(String patientId) {
        queryFactory
            .delete(patientDisease)
            .where(patientDisease.patient.userId.eq(patientId))
            .execute();
    }

//    @Override
//    public void insertPatientDisease(Patient patient, String diseaseCode) {
//        queryFactory
//            .insert(patientDisease)
//            .set(patientDisease.patient, patient)
//            .set(patientDisease.diseaseCode, diseaseCode)
//            .execute();
//    }

}
