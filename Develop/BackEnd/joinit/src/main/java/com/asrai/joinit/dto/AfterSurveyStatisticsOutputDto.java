package com.asrai.joinit.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AfterSurveyStatisticsOutputDto {


    private String surveyType;

    private List<DailyAfterSurveyValue> date;
}
