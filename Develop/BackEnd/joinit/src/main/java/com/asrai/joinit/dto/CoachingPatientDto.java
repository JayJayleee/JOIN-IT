package com.asrai.joinit.dto;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.Treatment;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoachingPatientDto {

    PatientProfile patientProfile;

    TreatmentOutputDto treatment;

    TrainingOutputDto training;

    Survey survey;

    PrescriptionDetailDto prescriptionDetailDto;

    @Getter
    @Setter
    public static class PatientProfile{
        String name;
        int height;
        int weight;
        LocalDateTime birth;
        List<String> diseaseCodeList;
        String pastAccidentDetails;
        String significant;
        String gender;

    };




    public interface SurveyInterface{
        double getAngle();
        String getImgRoute();
        String getTrainingName();
        int getPainDegree();
        int getDifficulty();
        int getSatisfaction();
        int getPainRelief();
        String getEtc();

    }

    @Getter
    @Setter
    public static class Survey implements Serializable {
//        LocalDateTime prescriptionProcessTime;
        double angle;
        String imgRoute;
        String trainingName;
        int painDegree;
        int difficulty;
        int satisfaction;
        int painRelief;
        String etc;

    };


}
