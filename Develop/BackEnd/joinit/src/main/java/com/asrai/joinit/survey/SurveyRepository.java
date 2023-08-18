package com.asrai.joinit.survey;


import com.asrai.joinit.domain.AfterSurvey;
import com.asrai.joinit.domain.BeforeSurvey;
import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;
import com.asrai.joinit.dto.AfterSurveyStatisticsSourceDto;
import com.asrai.joinit.dto.BeforeSurveyStatisticsSourceDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class SurveyRepository {

    @PersistenceContext
    private EntityManager em;


    //전 설문 입력
    public void createBeforeSurvey(BeforeSurvey beforeSurvey) {
        em.persist(beforeSurvey);

    }

    //전 설문 조회
    public BeforeSurvey findBeforeSurvey(int prescriptionId) {

        return em.find(BeforeSurvey.class, prescriptionId);
    }

    //전 설문 통계 데이터 조회
    public List<BeforeSurveyStatisticsSourceDto> findBeforeSurveyStatistics(int treatmentId) {
        Query nativeQuery = em.createNativeQuery(
            "select \n"
                + "     \tbfs.angle as angle, temp.prescription_process_time as surveyDate, temp.training_id as trainingId, temp.training_name as trainingName, temp.rom as rom, temp.target_angle as targetAngle\n"
                + " from \n"
                + "     \tbefore_survey bfs, \n"
                + "    (select \n"
                + "         \t\tp.prescription_id, p.prescription_process_time, p.training_id, t.training_name, t.rom, p.target_angle \n"
                + "     \tfrom \n"
                + "         \t\tprescription p, training t \n"
                + "     \twhere \n"
                + "         \t\tp.treatment_id = " + treatmentId
                + "         and p.training_id = t.training_id) as temp\n"
                + "where \n"
                + "     \tbfs.prescription_id = temp.prescription_id\n"
                + "order by temp.prescription_process_time asc ;",
            "BeforeSurveyStatisticsSourceMapping");

        return nativeQuery.getResultList();

    }


    //후 설문 입력
    public void createAfterSurvey(AfterSurvey afterSurvey) {
        em.persist(afterSurvey);

    }

    //후 설문 조회
    public AfterSurvey findAfterSurvey(int prescriptionId) {

        return em.find(AfterSurvey.class, prescriptionId);
    }

    //후 설문 통계 데이터 조회
    public List<AfterSurveyStatisticsSourceDto> findAfterSurveyStatistics(int treatmentId) {
        Query nativeQuery = em.createNativeQuery(
            "select \n"
                + "\t  afs.prescription_id as prescriptionId, \n"
                + "    afs.pain_degree as painDegree, \n"
                + "    afs.difficulty, \n"
                + "    afs.satisfaction, \n"
                + "    afs.pain_relief as painRelief, \n"
                + "    p.prescription_process_time as prescriptionProcessTime\n"
                + "from \n"
                + "\tafter_survey afs, \n"
                + "    prescription p\n"
                + "where \n"
                + "\tafs.prescription_id = p.prescription_id and p.treatment_id = " + treatmentId+"\n"
                + "order by p.prescription_process_time;", "AfterSurveyStatisticsSourceMapping");

        return nativeQuery.getResultList();

    }

    //전설문 데이터 삭제
    public void deleteBeforeSurvey(int prescriptionId) {
		em.remove(em.find(BeforeSurvey.class, prescriptionId));
    }

    //후설문 데이터 삭제
    public void deleteAfterSurvey(int prescriptionId) {
		em.remove(em.find(AfterSurvey.class, prescriptionId));
    }

}
