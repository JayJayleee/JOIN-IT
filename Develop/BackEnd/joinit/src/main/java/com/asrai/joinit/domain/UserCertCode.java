package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USER_CERT_CODE")
@Getter @Setter
public class UserCertCode {

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "cert_id")
    private Integer certId;

    @Column(name = "phone")
    private String phone;

    @Column(name = "phone_cert_code")
    private String phoneCertCode;

    @Column(name = "email")
    private String email;

    @Column(name = "email_cert_code")
    private String emailCertCode;


}
