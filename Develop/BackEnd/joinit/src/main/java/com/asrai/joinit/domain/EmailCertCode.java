package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "EMAIL_CERT_CODE")
@SequenceGenerator(name = "email_cert_code_seq", sequenceName = "email_cert_code_seq", allocationSize = 5)
@Getter @Setter
public class EmailCertCode {

    public EmailCertCode() {
    }

    public EmailCertCode(String email, String emailCertCode) {
        this.email = email;
        this.emailCertCode = emailCertCode;
    }

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "cert_id")
    private Integer certId;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "email_cert_code", length = 10)
    private String emailCertCode;

}
