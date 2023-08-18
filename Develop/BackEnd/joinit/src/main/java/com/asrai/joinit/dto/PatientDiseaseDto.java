package com.asrai.joinit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientDiseaseDto {

    private Long diseaseId;
    private String userId;
    private String diseaseCode;

}
