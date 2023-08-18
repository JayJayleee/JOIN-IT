package com.asrai.joinit.dto;

import jakarta.persistence.SqlResultSetMapping;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class BeforeSurveyStatisticsOutputDto {

    private LocalDate date;

    private double rom;


    private double angle;
    private double targetAngle;
}
