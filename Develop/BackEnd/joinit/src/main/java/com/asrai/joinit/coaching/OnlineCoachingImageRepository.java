package com.asrai.joinit.coaching;

import com.asrai.joinit.domain.OnlineCoachingImage;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.dto.ChildId;
import com.asrai.joinit.dto.ChildId2;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnlineCoachingImageRepository extends JpaRepository<OnlineCoachingImage, ChildId2> {
    List<OnlineCoachingImage> findByPrescriptionId(Prescription prescription);
}
