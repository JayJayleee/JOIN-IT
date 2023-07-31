package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USER")
@Getter @Setter
public class User {

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

    @Column(name = "user_type_code", length = 3)
    private String userTypeCode;

    @Column(name = "social_type_code", length = 3)
    private String socialTypeCode;

    @Column(name = "refresh_token", length = 255)
    private String refreshToken;

//    @Column(name = "refresh_token_expiry_time")
//    private String refreshTokenExpiryTime;

    @Column(name = "sms_agree", length = 1)
    private String smsAgree;

    @Column(name = "email_agree", length = 1)
    private String emailAgree;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", insertable = false, updatable = false, nullable = false)
    private Timestamp createTime;

    @Column(name = "update_time")
    private Timestamp updateTime;

    @Column(name = "end_time")
    private Timestamp endTime;

}
