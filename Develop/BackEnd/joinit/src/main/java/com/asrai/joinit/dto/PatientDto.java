package com.asrai.joinit.dto;

import com.asrai.joinit.user.Role;
import com.asrai.joinit.user.SocialType;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto extends UserDto {

    private Integer height;
    private Integer weight;
    private Timestamp birth;
    private String gender;
    private String nickname;
    private String etc;
    private String pastAccidentDetails;
    private String significant;
    private String profileColorCode;
    private List<PatientDiseaseDto> patientDiseaseList = new ArrayList<>();
    private List<PatientTreatmentDto> treatmentList = new ArrayList<>();

    // 비밀번호, refresh 토큰 제외
    public PatientDto(String userId, String name, String loginId, String phone, String email,
        String userTypeCode, Role role, SocialType socialTypeCode, String socialId, String smsAgree, String emailAgree,
        Timestamp createTime, Timestamp updateTime, Timestamp endTime,
        Integer height, Integer weight, Timestamp birth, String gender, String nickname, String etc,
        String pastAccidentDetails, String significant, String profileColorCode) {
        super(userId, name, loginId, phone, email, userTypeCode, role, socialTypeCode, socialId, smsAgree,
            emailAgree,
            createTime, updateTime, endTime);
        this.height = height;
        this.weight = weight;
        this.birth = birth;
        this.gender = gender;
        this.nickname = nickname;
        this.etc = etc;
        this.pastAccidentDetails = pastAccidentDetails;
        this.significant = significant;
        this.profileColorCode = profileColorCode;
    }

    //치료사가 환자 데이터를 조회할 때는 데이터가 더 줄어든다.
    public PatientDto(String name, String phone,
        Integer height, Integer weight, Timestamp birth, String gender, String etc,
        String pastAccidentDetails, String significant) {
        super( name,  phone);
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
        return "PatientDto{" +
            super.toString() +
            "height=" + height +
            ", weight=" + weight +
            ", birth=" + birth +
            ", gender='" + gender + '\'' +
            ", nickname='" + nickname + '\'' +
            ", etc='" + etc + '\'' +
            ", pastAccidentDetails='" + pastAccidentDetails + '\'' +
            ", significant='" + significant + '\'' +
            ", profileColorCode='" + profileColorCode + '\'' +
            '}';
    }
}
