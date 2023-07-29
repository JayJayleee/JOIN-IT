package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PATIENT_DISEASE")
@Getter @Setter
public class PatientDisease {

    @Id
    @Column(name = "patient_id", length = 20)
    private String patientId;

    @Column(name = "disease_code", length = 3)
    private String diseaseCode;

}
