package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.sql.Clob;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "THERAPIST")
@Getter @Setter
public class Therapist {

    // private User user;

    @Id
    @Column(name = "therapist_id", length = 20)
    private String therapistId;

    @Column(name = "birth")
    private Timestamp birth;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "hospital_name", length = 30)
    private String hospitalName;

    @Column(name = "hospital_number", length = 30)
    private String hospitalNumber;

    @Column(name = "introduce")
    private String introduce;

}
