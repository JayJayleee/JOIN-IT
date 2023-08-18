package com.asrai.joinit.domain;


import com.asrai.joinit.dto.PrescriptionOutputDto;
import com.asrai.joinit.dto.TrainingInputDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.OneToOne;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Setter
@DynamicInsert
public class Prescription {

    //설문 crud 과정에 필요해서 primary key 만 가지고 임시로 작성 추후에 수정 必

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prescription_id")
    private int prescriptionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treatment_id")
    private Treatment treatment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_id")
    private Training training;

    @Column(name = "prescription_code", nullable = false)
    private String prescriptionCode;

    @Column(name = "online_coaching_url")
    private String onlineCoachingUrl;

    @Column(name = "target_angle")
    private double targetAngle;

    @Column(name = "set_count")
    private int setCount;

    @Column(name = "is_completed", nullable = false, columnDefinition = "varchar(1) default 'N'")
    private String isCompleted;

    @Column(name = "time_over", nullable = false, columnDefinition = "varchar(1) default 'N'")
    private String timeOver;

    @Column(name = "prescription_time", nullable = false)
    private LocalDate prescriptionTime;

    @Column(name = "update_time")
    private LocalDateTime updateTime;

    @Column(name = "prescription_process_time")
    private LocalDateTime prescriptionProcessTime;

    @Column(name = "prescription_comment")
    private String prescriptionComment;

    @Column(name = "started")
    private String started;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "prescription")
    @JoinColumn(name = "prescription_id")
    private BeforeSurvey beforeSurvey;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "prescription")
    @JoinColumn(name = "prescription_id")
    private AfterSurvey afterSurvey;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "prescriptionId")
    private List<OnlineCoachingImage> onlineCoachingImageList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "prescriptionId")
    private List<OnlineCoachingComment> onlineCoachingImageComment;

    @Column(name = "video_route")
    private String videoRoute;

    public PrescriptionOutputDto toDto(){
        PrescriptionOutputDto p = new PrescriptionOutputDto();
        p.setPrescriptionId(this.getPrescriptionId());
        p.setPrescriptionCode(this.prescriptionCode);
        p.setPrescriptionTime(this.prescriptionTime);
        p.setIsCompleted(this.isCompleted);
        p.setTreatmentId(this.treatment.getTreatmentId());

        return p;

    }

}
