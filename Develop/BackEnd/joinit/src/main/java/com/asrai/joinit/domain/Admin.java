package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Admin {

    @Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    String adminId;

    @Column(name = "password")
    String password;
}
