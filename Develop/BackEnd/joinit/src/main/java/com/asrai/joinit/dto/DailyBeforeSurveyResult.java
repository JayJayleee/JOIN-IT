package com.asrai.joinit.dto;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class DailyBeforeSurveyResult {

    private LocalDate surveyDate;
    private double angle;
    private double targetAngle;
}
