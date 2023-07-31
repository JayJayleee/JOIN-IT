package com.asrai.joinit.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

public class BeforeSurveyStatisticsOutputDto {


    private int trainingId;

    private String trainingName;

    private double rom;

    private List<DailyTrainingResult> dailyTrainingResultList;

    @Getter
    @Setter
    private class DailyTrainingResult {
        private String date;
        private double angle;
        private double targetAngle;

    }
}
