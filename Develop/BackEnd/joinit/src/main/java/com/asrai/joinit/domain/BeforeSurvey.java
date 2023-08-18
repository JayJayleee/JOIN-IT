package com.asrai.joinit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.util.Objects;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BeforeSurvey {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    @JsonIgnore
    private Prescription prescription;

    @Column(name = "angle", nullable = false)
    private double angle;

    @Column(name = "before_img_route", nullable = false)
    private String beforeImgRoute;

    @Getter
    @Setter
    public static class BeforeSurveyDto extends BeforeSurvey{
        int prescriptionId;
        double angle;
        String beforeImgRoute;

    }

    public BeforeSurveyDto toDto(){
        BeforeSurveyDto beforeSurveyOutputDto = new BeforeSurveyDto();
        beforeSurveyOutputDto.setBeforeImgRoute(this.getBeforeImgRoute());
        beforeSurveyOutputDto.setAngle(this.getAngle());
        beforeSurveyOutputDto.setPrescriptionId(this.getPrescription().getPrescriptionId());
        return beforeSurveyOutputDto;

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BeforeSurvey that = (BeforeSurvey) o;
        return Double.compare(that.angle, angle) == 0 && Objects.equals(
            prescription, that.prescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(prescription, angle);
    }

}
