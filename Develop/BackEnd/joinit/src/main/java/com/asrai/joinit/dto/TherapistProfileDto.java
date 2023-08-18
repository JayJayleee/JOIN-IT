package com.asrai.joinit.dto;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
public class TherapistProfileDto {

    private String userId;
    private String name;
    private String loginId;
    private String phone;
    private String email;
    private Timestamp birth;
    private String gender;
    private String hospitalName;
    private String hospitalNumber;
    private String introduce;
    private String licenseImgRoute;

    public TherapistProfileDto() {
    }

    public TherapistProfileDto(String userId, String name, String loginId, String phone,
        String email,
        Timestamp birth, String gender, String hospitalName, String hospitalNumber,
        String introduce,
        String licenseImgRoute) {
        this.userId = userId;
        this.name = name;
        this.loginId = loginId;
        this.phone = phone;
        this.email = email;
        this.birth = birth;
        this.gender = gender;
        this.hospitalName = hospitalName;
        this.hospitalNumber = hospitalNumber;
        this.introduce = introduce;
        this.licenseImgRoute = licenseImgRoute;
    }

    @Override
    public String toString() {
        return "TherapistProfileDto{" +
            "userId='" + userId + '\'' +
            ", name='" + name + '\'' +
            ", loginId='" + loginId + '\'' +
            ", phone='" + phone + '\'' +
            ", email='" + email + '\'' +
            ", birth=" + birth +
            ", gender='" + gender + '\'' +
            ", hospitalName='" + hospitalName + '\'' +
            ", hospitalNumber='" + hospitalNumber + '\'' +
            ", introduce='" + introduce + '\'' +
            ", licenseImgRoute='" + licenseImgRoute + '\'' +
            '}';
    }
}
