package com.asrai.joinit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class JointTrainingTypeMappingDto {

    int mappingId;
    String jointName;
    String TrainingName;
}
