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
@Getter @Setter
@Table(name = "USER_SEQUENCE")
public class UserSequence {

    public UserSequence() {
    }

    public UserSequence(Integer pkSeq) {
        this.pkSeq = pkSeq;
    }

    @Id
    @Column(name = "pk_seq")
    Integer pkSeq;

    @Column(name = "patient_seq")
    String patientSeq;

    @Column(name = "therapist_seq")
    String therapistSeq;
}
