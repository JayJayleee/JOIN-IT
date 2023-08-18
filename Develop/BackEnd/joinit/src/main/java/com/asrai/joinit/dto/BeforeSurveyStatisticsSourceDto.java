package com.asrai.joinit.dto;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.SqlResultSetMapping;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

//native query 반환 mapping
@SqlResultSetMapping(
    name = "BeforeSurveyStatisticsSourceMapping",
    classes = @ConstructorResult(
    targetClass = BeforeSurveyStatisticsSourceDto.class,
    columns = {
        @ColumnResult(name="trainingId", type = Integer.class),
        @ColumnResult(name="trainingName", type = String.class),
        @ColumnResult(name="rom", type = Double.class),
        @ColumnResult(name="surveyDate", type = LocalDate.class),
        @ColumnResult(name="angle", type = Double.class),
        @ColumnResult(name="targetAngle", type = Double.class),
    })
)
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
public class BeforeSurveyStatisticsSourceDto {

    @Id
    private int trainingId;

    private String trainingName;

    private double rom;

    private LocalDate surveyDate;

    private double angle;

    private double targetAngle;

}
