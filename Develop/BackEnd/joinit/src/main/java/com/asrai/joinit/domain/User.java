package com.asrai.joinit.domain;

import com.asrai.joinit.user.Role;
import com.asrai.joinit.user.SocialType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SuperBuilder @Entity
@Table(name = "USER")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter @Setter
@AllArgsConstructor
@DiscriminatorColumn(name = "user_type", length = 10)
public class User {

    public User () {}

    public User(String loginId) {
        this.loginId = loginId;
    }


    public User(String userId, String name, String loginId, String password, String phone, String email, String userTypeCode,
        Role role, SocialType socialTypeCode, String socialId, String smsAgree, String emailAgree) {
        this.userId = userId;
        this.name = name;
        this.loginId = loginId;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.userTypeCode = userTypeCode;
        this.role = role;
        this.socialTypeCode = socialTypeCode;
        this.socialId = socialId;
        this.smsAgree = smsAgree;
        this.emailAgree = emailAgree;
    }

    @Id
    @Column(name = "user_id", length = 20)
    private String userId;

    @Column(name = "name", length = 30)
    private String name;

    @Column(name = "login_id", length = 30)
    private String loginId;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "phone", length = 30)
    private String phone;

    @Column(name = "email", length = 100)
    private String email;

    /**
     * M 회원 코드
     * 01: 일반 환자
     * 02: 유예 환자
     * 03: 비활성화 환자
     * 04: 승인 치료사
     * 05: 미승인 치료사
     * 06: 유예 치료사
     * 07: 비활성화 치료사
     */
    @Column(name = "user_type_code", length = 3)
    private String userTypeCode;

    @Column(name = "role", length = 10)
    @Enumerated(EnumType.STRING)
    private Role role; // USER, ADMIN, GUEST

    /**
     * S: 소셜 코드
     * 01: 일반
     * 02: 네이버
     * 03: 카카오
     * 04: 구글
     */
    @Column(name = "social_type_code", length = 10)
    @Enumerated(EnumType.STRING)
    private SocialType socialTypeCode; // NONE, KAKAO, NAVER, GOOGLE

    @Column(name = "social_id", length = 45)
    private String socialId;

    @Column(name = "refresh_token", length = 255)
    private String refreshToken;

    @Column(name = "sms_agree", length = 1)
    private String smsAgree;

    @Column(name = "email_agree", length = 1)
    private String emailAgree;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", insertable = false, updatable = false, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp createTime;

    @Column(name = "update_time")
    private Timestamp updateTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    @Override
    public String toString() {
        return "User{" +
            "userId='" + userId + '\'' +
            ", name='" + name + '\'' +
            ", loginId='" + loginId + '\'' +
            ", password='" + password + '\'' +
            ", phone='" + phone + '\'' +
            ", email='" + email + '\'' +
            ", userTypeCode='" + userTypeCode + '\'' +
            ", role=" + role + '\'' +
            ", socialTypeCode='" + socialTypeCode + '\'' +
            ", socialId='" + socialId + '\'' +
            ", refreshToken='" + refreshToken + '\'' +
            ", smsAgree='" + smsAgree + '\'' +
            ", emailAgree='" + emailAgree + '\'' +
            ", createTime=" + createTime +
            ", updateTime=" + updateTime +
            ", endTime=" + endTime +
            '}';
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    // 사용자 권한 설정
    public void authorizeUser() {
        this.role = Role.USER;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     * 로그 기록을 조회할 때 조인을 할까?
     */
//    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
//    private List<LogLogin> logLoginList = new ArrayList<>();

}
