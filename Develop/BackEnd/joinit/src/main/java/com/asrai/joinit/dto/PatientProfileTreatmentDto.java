package com.asrai.joinit.dto;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientProfileTreatmentDto {

    private String name;
    private String phone;
    private Integer height;
    private Integer weight;
    private Timestamp birth;
    private String gender;
    private String etc;
    private String pastAccidentDetails;
    private String significant;
    private List<PatientDiseaseDto> patientDiseaseList = new ArrayList<>();
    private List<PatientTreatmentDto> treatmentList = new ArrayList<>();

    public PatientProfileTreatmentDto (String name, String phone,
        Integer height, Integer weight, Timestamp birth, String gender, String etc,
        String pastAccidentDetails, String significant) {

        this.name = name;
        this.phone = phone;
        this.height = height;
        this.weight = weight;
        this.birth = birth;
        this.gender = gender;
        this.etc = etc;
        this.pastAccidentDetails = pastAccidentDetails;
        this.significant = significant;
    }

    @Override
    public String toString() {
        return "PatientProfileTreatmentDto{" +
            "name='" + name + '\'' +
            ", phone='" + phone + '\'' +
            ", height=" + height +
            ", weight=" + weight +
            ", birth=" + birth +
            ", gender='" + gender + '\'' +
            ", etc='" + etc + '\'' +
            ", pastAccidentDetails='" + pastAccidentDetails + '\'' +
            ", significant='" + significant + '\'' +
            ", patientDiseaseList=" + patientDiseaseList +
            ", treatmentList=" + treatmentList +
            '}';
    }
}
