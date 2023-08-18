package com.asrai.joinit.domain;

import com.asrai.joinit.dto.ChildId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "online_coaching_comment")
@Getter
@Setter
@IdClass(ChildId.class)
@NoArgsConstructor
public class OnlineCoachingComment {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", referencedColumnName = "prescription_id")
    private Prescription prescriptionId;

    @Id
    @Column(name = "sequence", nullable = false)
    private int sequence;

    @Column(name = "writer")
    private String writer;

    @Column(name = "comment")
    private String comment;

    @Getter
    @Setter
    public static class OnlineCoachingCommentOutputDto{
        private int prescriptionId;
        private int sequence;
        private String writer;
        private String comment;

    }


    @Getter
    @Setter
    public static class OnlineCoachingCommentInputDto{

        private String writer;
        private String comment;
    }
}
