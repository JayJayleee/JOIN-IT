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
@Table(name = "PHONE_CERT_CODE")
@SequenceGenerator(name = "phone_cert_code_seq", sequenceName = "phone_cert_code_seq", allocationSize = 5)
@Getter @Setter
public class PhoneCertCode {

    public PhoneCertCode() {
    }

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "cert_id")
    private Integer certId;

    @Column(name = "phone", length = 30)
    private String phone;

    @Column(name = "phone_cert_code", length = 10)
    private String phoneCertCode;

    @Override
    public String toString() {
        return "phone: " + this.phone + ", phoneCertCode: " + this.phoneCertCode;
    }
}
