package com.asrai.joinit.dto;

import com.asrai.joinit.user.Role;
import com.asrai.joinit.user.SocialType;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class TherapistDto extends UserDto {

    private Timestamp birth;
    private String gender;
    private String hospitalName;
    private String hospitalNumber;
    private String introduce;
    private String licenseImgRoute;


    //therapist 정보만
    public TherapistDto(Timestamp birth, String gender, String hospitalName, String hospitalNumber,
        String introduce) {
        this.birth = birth;
        this.gender = gender;
        this.hospitalName = hospitalName;
        this.hospitalNumber = hospitalNumber;
        this.introduce = introduce;
    }

    // 비밀번호, refresh 토큰 제외
    public TherapistDto(String userId, String name, String loginId, String phone,
        String email, String userTypeCode, Role role, SocialType socialTypeCode, String socialId, String smsAgree,
        String emailAgree,
        Timestamp createTime, Timestamp updateTime, Timestamp endTime, Timestamp birth, String gender,
        String hospitalName,
        String hospitalNumber, String introduce, String licenseImgRoute) {
        super(userId, name, loginId, phone, email, userTypeCode, role, socialTypeCode, socialId, smsAgree,
            emailAgree, createTime, updateTime, endTime);
        this.birth = birth;
        this.gender = gender;
        this.hospitalName = hospitalName;
        this.hospitalNumber = hospitalNumber;
        this.introduce = introduce;
        this.licenseImgRoute = licenseImgRoute;
    }
}
