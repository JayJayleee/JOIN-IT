package com.asrai.joinit.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class AfterSurveyInputDto {

    private int prescriptionId;

    private int painDegree;

    private int difficulty;

    private int satisfaction;

    private int painRelief;

    private String etc;
}
