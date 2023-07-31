package com.asrai.joinit.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class JointTrainingMappingDto {

//    @Column(name = "mapping_id")
    int mappingId;

//    @Column(name = "joint_name")
    String jointName;

//    @Column(name = "training_type_name")
    String trainingTypeName;

}
