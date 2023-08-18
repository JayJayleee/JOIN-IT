package com.asrai.joinit.domain;

import com.asrai.joinit.dto.ChildId;
import com.asrai.joinit.dto.ChildId2;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "online_coaching_image")
@Getter
@Setter
@IdClass(ChildId2.class)
@NoArgsConstructor
public class OnlineCoachingImage {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", referencedColumnName = "prescription_id")
    private Prescription prescriptionId;

    @Id
    @Column(name = "sequence", nullable = false)
    private int sequence;

    @Column(name = "img_route", nullable = false)
    private String imgRoute;

    @Getter
    @Setter
    public static class OnlineCoachingImageOutputDto{
        private int prescriptionId;
        private int sequence;
        private String imgRoute;

    }

//    public OnlineCoachingImageOutputDto toDto(){
//        OnlineCoachingImageOutputDto onlineCoachingImageOutputDto = new OnlineCoachingImageOutputDto();
//        onlineCoachingImageOutputDto.setPrescriptionId(this.getPrescriptionId().getPrescriptionId());
//        onlineCoachingImageOutputDto.setImgRoute(this.getImgRoute());
//        onlineCoachingImageOutputDto.setSequence(this.getSequence());
//        return onlineCoachingImageOutputDto;
//
//    }
}
