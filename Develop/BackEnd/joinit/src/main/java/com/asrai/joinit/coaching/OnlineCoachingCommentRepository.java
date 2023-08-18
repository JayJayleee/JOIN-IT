package com.asrai.joinit.coaching;

import com.asrai.joinit.domain.OnlineCoachingComment;
import com.asrai.joinit.domain.OnlineCoachingImage;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.dto.ChildId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnlineCoachingCommentRepository extends JpaRepository<OnlineCoachingComment, ChildId> {
    List<OnlineCoachingComment> findByPrescriptionId(Prescription prescription);
}
