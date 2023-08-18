package com.asrai.joinit.domain;

import com.asrai.joinit.user.Role;
import com.asrai.joinit.user.SocialType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "THERAPIST")
@DiscriminatorValue("T")
@Getter @Setter
public class Therapist extends User {

    public Therapist() {
    }

    public Therapist(String userId, String name, String loginId, String password, String phone,
        String email, String userTypeCode, Role role, SocialType socialTypeCode, String socialId, String smsAgree,
        String emailAgree) {
        super(userId, name, loginId, password, phone, email, userTypeCode, role, socialTypeCode, socialId, smsAgree,
            emailAgree);
    }

    @Column(name = "birth", length = 30)
    private Timestamp birth;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "hospital_name", length = 30)
    private String hospitalName;

    @Column(name = "hospital_number", length = 30)
    private String hospitalNumber;

    @Lob
    @Column(name = "introduce")
    private String introduce;

    @Column(name = "license_img_route", nullable = true)
    private String licenseImgRoute;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Therapist therapist = (Therapist) o;
        return Objects.equals(birth, therapist.birth) && Objects.equals(gender,
            therapist.gender) && Objects.equals(hospitalName, therapist.hospitalName)
            && Objects.equals(hospitalNumber, therapist.hospitalNumber)
            && Objects.equals(introduce, therapist.introduce) && Objects.equals(
            licenseImgRoute, therapist.licenseImgRoute);
    }

    @Override
    public int hashCode() {
        return Objects.hash(birth, gender, hospitalName, hospitalNumber, introduce,
            licenseImgRoute);
    }

    @Override
    public String toString() {
        return "Therapist{" +
            "birth='" + birth + '\'' +
            ", gender='" + gender + '\'' +
            ", hospitalName='" + hospitalName + '\'' +
            ", hospitalNumber='" + hospitalNumber + '\'' +
            ", introduce='" + introduce + '\'' +
            ", licenseImgRoute='" + licenseImgRoute + '\'' +
            '}';
    }
}
