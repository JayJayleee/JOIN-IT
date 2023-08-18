package com.asrai.joinit.dto;

import com.asrai.joinit.user.Role;
import com.asrai.joinit.user.SocialType;
import java.sql.Timestamp;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class UserDto {

    private String userId;
    private String name;
    private String loginId;
    private String password;
    private String phone;
    private String email;
    private String userTypeCode;
    private Role role;
    private SocialType socialTypeCode;
    private String socialId;
    private String refreshToken;
    private String smsAgree;
    private String emailAgree;
    private Timestamp createTime;
    private Timestamp updateTime;
    private Timestamp endTime;

    public UserDto(String userId, String name, String loginId, String phone, String email,
        String userTypeCode, Role role, SocialType socialTypeCode, String socialId, String smsAgree,
        String emailAgree, Timestamp createTime, Timestamp updateTime, Timestamp endTime) {
        this.userId = userId;
        this.name = name;
        this.loginId = loginId;
        this.phone = phone;
        this.email = email;
        this.userTypeCode = userTypeCode;
        this.role = role;
        this.socialTypeCode = socialTypeCode;
        this.socialId = socialId;
        this.smsAgree = smsAgree;
        this.emailAgree = emailAgree;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.endTime = endTime;
    }

    public UserDto(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }
}
