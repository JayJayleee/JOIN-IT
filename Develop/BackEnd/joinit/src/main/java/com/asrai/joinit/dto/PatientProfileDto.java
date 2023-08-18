package com.asrai.joinit.dto;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PatientProfileDto {

    private String userId;
    private String name;
    private String loginId;
    private String phone;
    private String email;
    private Integer height;
    private Integer weight;
    private Timestamp birth;
    private String gender;
    private String nickname;
    private String etc;
    private String pastAccidentDetails;
    private String significant;
    private List<String> patientDiseaseList = new ArrayList<>();

    public PatientProfileDto() {
    }

    public PatientProfileDto(String userId, String name, String loginId, String phone, String email,
        Integer height, Integer weight, Timestamp birth, String gender, String nickname, String etc,
        String pastAccidentDetails, String significant) {
        this.userId = userId;
        this.name = name;
        this.loginId = loginId;
        this.phone = phone;
        this.email = email;
        this.height = height;
        this.weight = weight;
        this.birth = birth;
        this.gender = gender;
        this.nickname = nickname;
        this.etc = etc;
        this.pastAccidentDetails = pastAccidentDetails;
        this.significant = significant;
    }
}
