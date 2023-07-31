package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "THERAPIST_IMAGE")
@Getter @Setter
public class TherapistImage {

    @Id
    @Column(name = "therapist_id", length = 20)
    private String therapistId;

    @Column(name = "img_route", length = 255)
    private String imgRoute;

    @Column(name = "saved_name", length = 255)
    private String savedName;

    @Column(name = "origin_name", length = 255)
    private String originName;
}
