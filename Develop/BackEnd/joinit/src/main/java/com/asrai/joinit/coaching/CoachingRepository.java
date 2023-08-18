package com.asrai.joinit.coaching;

import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.dto.CoachingPatientDto.Survey;
import com.asrai.joinit.dto.CoachingPatientDto.SurveyInterface;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

//@Repository
public interface CoachingRepository extends JpaRepository<Prescription, Integer> {

    List<Prescription> findTop1ByIsCompletedOrderByPrescriptionProcessTimeDesc(String isCompleted);

    @Query(value = "select \n"
        + "\tb.angle, \n"
        + "    b.before_img_route as imgRoute, \n"
        + "    temp.training_name as trainingName, \n"
        + "    a.pain_degree as painDegree, \n"
        + "    a.difficulty, \n"
        + "    a.satisfaction, \n"
        + "    a.pain_relief as painRelief, \n"
        + "    a.etc\n"
        + "from \n"
        + "\tbefore_survey b,\n"
        + "\tafter_survey a,\n"
        + "    (select \n"
        + "\t\tp.prescription_id, \n"
        + "        p.training_name\n"
        + "\tfrom \n"
        + "\t\t(\n"
        + "\t\t\tselect \n"
        + "\t\t\t\tt.training_name, \n"
        + "                p.prescription_process_time, \n"
        + "                p.treatment_id, \n"
        + "                p.prescription_id\n"
        + "\t\t\tfrom \n"
        + "\t\t\t\ttraining t,\n"
        + "\t\t\t\tprescription p\n"
        + "\t\t\twhere \n"
        + "\t\t\t\tt.training_id = p.training_id) as p ,\n"
        + "\t\ttreatment t \n"
        + "\twhere \n"
        + "\t\tp.treatment_id = t.treatment_id and \n"
        + "\t\tt.patient_id = :patientId \n"
        + "\torder by p.prescription_process_time desc limit 1) as temp\n"
        + "where \n"
        + "\tb.prescription_id = a.prescription_id and\n"
        + "    a.prescription_id = temp.prescription_id;", nativeQuery = true)
    SurveyInterface findLastSurvey(@Param("patientId") String patientId);
}
