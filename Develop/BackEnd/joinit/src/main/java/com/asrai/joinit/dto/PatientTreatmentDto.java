package com.asrai.joinit.dto;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientTreatmentDto {

    private Integer treatmentId;
    private String patientName;
    private String jointName;
    private String startTime;
    private String endTime;
    private Integer completedPrescription;
    private Integer uncompletedPrescription;
    private String summary;

    public PatientTreatmentDto(Integer treatmentId,String patientName, String jointName, String startTime,
        String endTime,
        String summary) {
        this.treatmentId = treatmentId;
        this.patientName = patientName;
        this.jointName = jointName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.summary = summary;
    }
}
