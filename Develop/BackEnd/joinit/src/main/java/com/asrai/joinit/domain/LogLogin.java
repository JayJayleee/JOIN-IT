package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "LOG_LOGIN")
@Getter @Setter
public class LogLogin {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Integer logId;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "user_type", length = 1)
    private String userType;

    @Column(name = "login_ip", length = 30)
    private String loginIp;

    @Column(name = "login_browser", length = 255)
    private String loginBrowser;

    @Column(name = "login_time")
    private Timestamp loginTime;
}
