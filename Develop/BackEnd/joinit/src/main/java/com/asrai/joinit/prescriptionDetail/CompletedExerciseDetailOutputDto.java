package com.asrai.joinit.prescriptionDetail;

import com.asrai.joinit.domain.AfterSurvey.AfterSurveyDto;
import com.asrai.joinit.domain.BeforeSurvey.BeforeSurveyDto;
import com.asrai.joinit.dto.TrainingOutputDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompletedExerciseDetailOutputDto {

    private BeforeSurveyDto beforeSurvey;
    private TrainingOutputDto training;
    private String prescriptionComment;
//    private String coachingVideo;
//    private List<OnlineCoachingImageOutputDto> coachingImageList;
//    private String whatIdThis;
//    private List<OnlineCoachingCommentOutputDto> onlineCoachingCommentList;
    private AfterSurveyDto afterSurvey;
}
