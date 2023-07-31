package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AfterSurvey {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    @Column(name = "pain_degree")
    private int painDegree;

    @Column(name = "difficulty")
    private int difficulty;

    @Column(name = "satisfaction")
    private int satisfaction;

    @Column(name = "pain_relief")
    private int painRelief;

    @Column(name = "etc")
    private String etc;


}
