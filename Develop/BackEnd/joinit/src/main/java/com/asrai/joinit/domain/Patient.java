package com.asrai.joinit.domain;

import com.asrai.joinit.user.Role;
import com.asrai.joinit.user.SocialType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import net.minidev.json.annotate.JsonIgnore;

@Entity @Table(name = "PATIENT")
@DiscriminatorValue("P")
@Getter @Setter
@SuperBuilder
public class Patient extends User {

    public Patient() {
    }

    public Patient(String userId, String name, String loginId, String password, String phone,
        String email, String userTypeCode, Role role, SocialType socialTypeCode, String socialId, String smsAgree,
        String emailAgree) {
        super(userId, name, loginId, password, phone, email, userTypeCode, role, socialTypeCode, socialId, smsAgree, emailAgree);
    }

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "birth", length = 30)
    private Timestamp birth;

    @Column(name = "nickname", length = 30)
    private String nickname;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PatientDisease> patientDiseaseList = new ArrayList<>();

    @Lob
    @Column(name = "etc")
    private String etc;

    @Lob
    @Column(name = "past_accident_details")
    private String pastAccidentDetails;

    @Lob
    @Column(name = "significant")
    private String significant;

    /**
     * C 색상 코드
     * 01: #A86254
     * 02: #A854A8
     * 03: #6754A8
     * 04: #D1B480
     * 05: #D4992C
     * 06: #591F14
     * 07: #591459
     * 08: #231459
     * 09: #24D4C5
     * 10: #A8927E
     * 11: #A7A07D
     * 12: #D64552
     * 13: #D4858D
     * 14: #93A37C
     * 15: #5C422A
     * 16: #5C542A
     * 17: #475C2A
     * 18: #7045D6
     * 19: #9D85D4
     * 20: #24D4C5
     */
    @Column(name = "profile_color_code", length = 3)
    private String profileColorCode;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Patient patient = (Patient) o;
        return Objects.equals(height, patient.height) && Objects.equals(weight,
            patient.weight) && Objects.equals(gender, patient.gender)
            && Objects.equals(birth, patient.birth) && Objects.equals(nickname,
            patient.nickname) && Objects.equals(patientDiseaseList,
            patient.patientDiseaseList) && Objects.equals(etc, patient.etc)
            && Objects.equals(pastAccidentDetails, patient.pastAccidentDetails)
            && Objects.equals(significant, patient.significant) && Objects.equals(
            profileColorCode, patient.profileColorCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(height, weight, gender, birth, nickname, patientDiseaseList, etc,
            pastAccidentDetails, significant, profileColorCode);
    }


    @Override
    public String toString() {
        return "Patient{" +
            super.toString() +
            ", height=" + height +
            ", weight=" + weight +
            ", gender='" + gender + '\'' +
            ", birth=" + birth +
            ", nickname='" + nickname + '\'' +
            ", etc='" + etc + '\'' +
            ", pastAccidentDetails='" + pastAccidentDetails + '\'' +
            ", significant='" + significant + '\'' +
            ", profileColorCode='" + profileColorCode + '\'' +
            '}';
    }
}
