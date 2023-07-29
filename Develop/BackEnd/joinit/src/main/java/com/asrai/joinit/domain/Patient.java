package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PATIENT")
@Getter @Setter
public class Patient {

    // private User user;

    @Id
    @Column(name = "patient_id", length = 20)
    private String patientId;

    @Column(name = "nickname", length = 30)
    private String nickname;

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "birth")
    private Timestamp birth;

    @Column(name = "etc")
    private String etc;

    @Column(name = "past_accident_details")
    private String pastAccidentDetails;

    @Column(name = "significant")
    private String significant;

    @Column(name = "profile_color_code", length = 3)
    private String profileColorCode;

    // private PatientDisease patientDisease;

}
