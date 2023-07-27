package com.asrai.joinit.Training;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class JointTrainingMapping {

//    @Column(name = "mapping_id")
    int mappingId;

//    @Column(name = "joint_name")
    String jointName;

//    @Column(name = "training_type_name")
    String trainingTypeName;

}
