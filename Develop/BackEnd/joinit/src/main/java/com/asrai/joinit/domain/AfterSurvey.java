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

public class AfterSurvey {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    @JsonIgnore
    private Prescription prescription;

    @Column(name = "pain_degree", nullable = false)
    private int painDegree;

    @Column(name = "difficulty", nullable = false)
    private int difficulty;

    @Column(name = "satisfaction", nullable = false)
    private int satisfaction;

    @Column(name = "pain_relief", nullable = false)
    private int painRelief;

    @Column(name = "etc", nullable = false)
    private String etc;

    @Getter
    @Setter
    public static class AfterSurveyDto extends AfterSurvey{
        int prescriptionId;
    }

    public AfterSurveyDto makeDto(){
        AfterSurveyDto afterSurveyDto = new AfterSurveyDto();
        afterSurveyDto.setPrescriptionId(this.getPrescription().getPrescriptionId());
        afterSurveyDto.setDifficulty(this.getDifficulty());
        afterSurveyDto.setEtc(this.getEtc());
        afterSurveyDto.setPainDegree(this.getPainDegree());
        afterSurveyDto.setPainRelief(this.getPainRelief());
        afterSurveyDto.setSatisfaction(this.getSatisfaction());
        return afterSurveyDto;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AfterSurvey that = (AfterSurvey) o;
        return painDegree == that.painDegree && difficulty == that.difficulty
            && satisfaction == that.satisfaction && painRelief == that.painRelief
            && Objects.equals(prescription, that.prescription) && Objects.equals(
            etc, that.etc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(prescription, painDegree, difficulty, satisfaction, painRelief, etc);
    }


}
