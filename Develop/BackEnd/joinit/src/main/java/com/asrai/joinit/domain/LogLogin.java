package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.sql.Timestamp;
import java.util.Objects;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "LOG_LOGIN")
@SequenceGenerator(name = "log_login_seq", sequenceName = "log_login_seq", allocationSize = 5)
@Getter @Setter
public class LogLogin {

    public LogLogin() {
    }

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "log_id")
    private Long logId;

    @Id @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", updatable = false, insertable = false)
    private User userId;

    @Column(name = "user_type", length = 1)
    private String userType;

    @Column(name = "login_ip", length = 30, updatable = false)
    private String loginIp;

    @Column(name = "login_browser", length = 255, updatable = false)
    private String loginBrowser;

    @Column(name = "login_time", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp loginTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LogLogin logLogin = (LogLogin) o;
        return Objects.equals(logId, logLogin.logId) && Objects.equals(userId,
            logLogin.userId) && Objects.equals(userType, logLogin.userType)
            && Objects.equals(loginIp, logLogin.loginIp) && Objects.equals(
            loginBrowser, logLogin.loginBrowser) && Objects.equals(loginTime,
            logLogin.loginTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(logId, userId, userType, loginIp, loginBrowser, loginTime);
    }
}
