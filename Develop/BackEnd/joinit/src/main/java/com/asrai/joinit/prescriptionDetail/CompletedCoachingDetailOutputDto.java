package com.asrai.joinit.prescriptionDetail;

import com.asrai.joinit.domain.AfterSurvey.AfterSurveyDto;
import com.asrai.joinit.domain.BeforeSurvey.BeforeSurveyDto;
import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentOutputDto;
import com.asrai.joinit.domain.OnlineCoachingImage.OnlineCoachingImageOutputDto;
import com.asrai.joinit.dto.PrescriptionOutputDto;
import com.asrai.joinit.dto.TrainingOutputDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompletedCoachingDetailOutputDto {

    private BeforeSurveyDto beforeSurvey;
    private String coachingVideo;
    private List<OnlineCoachingImageOutputDto> coachingImageList;
    private String trainingDescription;
    private String trainingUrl;
    private List<OnlineCoachingCommentOutputDto> onlineCoachingCommentList;
//    private PrescriptionOutputDto prescription;
    private AfterSurveyDto afterSurvey;
}
