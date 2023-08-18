package com.asrai.joinit.dto;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

//native query 반환 mapping
@SqlResultSetMapping(
    name = "AfterSurveyStatisticsSourceMapping",
    classes = @ConstructorResult(
        targetClass = AfterSurveyStatisticsSourceDto.class,
        columns = {
            @ColumnResult(name="prescriptionId", type = Integer.class),
            @ColumnResult(name="painDegree", type = Integer.class),
            @ColumnResult(name="difficulty", type = Integer.class),
            @ColumnResult(name="satisfaction", type = Integer.class),
            @ColumnResult(name="painRelief", type = Integer.class),
            @ColumnResult(name="prescriptionProcessTime", type = Timestamp.class),
        })
)
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
public class AfterSurveyStatisticsSourceDto {

    @Id
    private int prescriptionId;

    private int painDegree;

    private int difficulty;

    private int satisfaction;

    private int painRelief;

    private Timestamp prescriptionProcessTime;
}
