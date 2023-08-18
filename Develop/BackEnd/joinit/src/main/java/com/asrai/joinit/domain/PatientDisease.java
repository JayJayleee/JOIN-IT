package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Table(name = "PATIENT_DISEASE")
@SequenceGenerator(name = "patient_disease_seq", sequenceName = "patient_disease_seq", allocationSize = 5)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDisease {

    public PatientDisease(Patient patient, String diseaseCode) {
        this.patient = patient;
        this.diseaseCode = diseaseCode;
    }

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "disease_id")
    private Long diseaseId;

    @ManyToOne(fetch = FetchType.LAZY) @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private Patient patient;

    /**
     * D 질환 코드
     * 01: 고혈압
     * 02: 간경화증
     * 03: 뇌졸중
     * 04: 당뇨
     * 05: 백혈병
     * 06: 심근경색
     * 07: 심장판막증
     * 08: 암
     * 09: 에이즈
     * 10: 협심증
     */
    @Column(name = "disease_code", length = 3)
    private String diseaseCode;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PatientDisease that = (PatientDisease) o;
        return Objects.equals(diseaseId, that.diseaseId) && Objects.equals(
            patient, that.patient) && Objects.equals(diseaseCode, that.diseaseCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(diseaseId, patient, diseaseCode);
    }
}
