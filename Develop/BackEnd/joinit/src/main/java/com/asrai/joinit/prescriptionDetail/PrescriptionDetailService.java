package com.asrai.joinit.prescriptionDetail;

//import com.asrai.joinit.domain.OnlineCoachingComment;
//import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentInputDto;
//import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentOutputDto;

import com.asrai.joinit.Training.TrainingRepository;
import com.asrai.joinit.coaching.CoachingRepository;
import com.asrai.joinit.coaching.OnlineCoachingCommentRepository;
import com.asrai.joinit.domain.AfterSurvey;
import com.asrai.joinit.domain.AfterSurvey.AfterSurveyDto;
import com.asrai.joinit.domain.BeforeSurvey;
import com.asrai.joinit.domain.OnlineCoachingComment;
import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentOutputDto;
import com.asrai.joinit.domain.OnlineCoachingImage;
import com.asrai.joinit.domain.OnlineCoachingImage.OnlineCoachingImageOutputDto;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.dto.TrainingOutputDto;
import com.asrai.joinit.exception.PrescriptionTypeException;
import com.asrai.joinit.survey.SurveyRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
class PrescriptionDetailService {

    private final SurveyRepository surveyRepository;
    private final OnlineCoachingCommentRepository onlineCoachingCommentRepository;
    private final CoachingRepository coachingRepository;
    private final TrainingRepository trainingRepository;

    public CompletedCoachingDetailOutputDto getCompletedCoachingDetail(int prescriptionId) {
        CompletedCoachingDetailOutputDto completedCoachingDetailOutputDto = new CompletedCoachingDetailOutputDto();

        Prescription prescription = coachingRepository.findById(prescriptionId).get();

        if(!prescription.getPrescriptionCode().equals("코칭")){
            throw new PrescriptionTypeException("코칭에서만 조회가 가능합니다.");
        }

        //전설문 관련 데이터 담기
        BeforeSurvey beforeSurvey = prescription.getBeforeSurvey();
        if (beforeSurvey != null) {
            completedCoachingDetailOutputDto.setBeforeSurvey(beforeSurvey.toDto());
        }

        //비디오 아직 미구현으로 저장 예정
        completedCoachingDetailOutputDto.setCoachingVideo(prescription.getVideoRoute());

        //온라인 코칭 사진 데이터 담기
        List<OnlineCoachingImage> onlineCoachingImageList = prescription.getOnlineCoachingImageList();

        if (onlineCoachingImageList != null) {
            List<OnlineCoachingImageOutputDto> coachingImageList = new ArrayList<>();
            for (OnlineCoachingImage onlineCoachingImage : onlineCoachingImageList
            ) {
//                coachingImageList.add(onlineCoachingImage.toDto());
                OnlineCoachingImageOutputDto onlineCoachingImageOutputDto = new OnlineCoachingImageOutputDto();
                onlineCoachingImageOutputDto.setPrescriptionId(onlineCoachingImage.getPrescriptionId().getPrescriptionId());
                onlineCoachingImageOutputDto.setSequence(onlineCoachingImage.getSequence());
                onlineCoachingImageOutputDto.setImgRoute(onlineCoachingImage.getImgRoute());
                coachingImageList.add(onlineCoachingImageOutputDto);
            }

            completedCoachingDetailOutputDto.setCoachingImageList(coachingImageList);
        }

        //운동 관련 데이터 담기
        Training training = trainingRepository.findTrainingDetail(prescription.getTraining().getTrainingId());
        if (training != null){
            completedCoachingDetailOutputDto.setTrainingDescription(training.getDescription());
            completedCoachingDetailOutputDto.setTrainingUrl(training.getTrainingURL());
        }



        //실시간 코멘트 데이터 담기
        List<OnlineCoachingComment> onlineCoachingCommentList = onlineCoachingCommentRepository.findByPrescriptionId(
            prescription);

        if (onlineCoachingCommentList != null) {
            List<OnlineCoachingCommentOutputDto> onlineCoachingCommentOutputDtoList = new ArrayList<>();

            for (OnlineCoachingComment online : onlineCoachingCommentList
            ) {
                OnlineCoachingCommentOutputDto onlineCoachingCommentOutputDto = new OnlineCoachingCommentOutputDto();
                onlineCoachingCommentOutputDto.setPrescriptionId(
                    online.getPrescriptionId().getPrescriptionId());
                onlineCoachingCommentOutputDto.setSequence(online.getSequence());
                onlineCoachingCommentOutputDto.setComment(online.getComment());
                onlineCoachingCommentOutputDto.setWriter(online.getWriter());
                onlineCoachingCommentOutputDtoList.add(onlineCoachingCommentOutputDto);
            }

            completedCoachingDetailOutputDto.setOnlineCoachingCommentList(
                onlineCoachingCommentOutputDtoList);

        }

        //후설문 데이터 담기
        AfterSurvey afterSurvey = prescription.getAfterSurvey();
        if (afterSurvey != null) {
            AfterSurveyDto afterSurveyOutputDto = afterSurvey.makeDto();

            completedCoachingDetailOutputDto.setAfterSurvey(afterSurveyOutputDto);
        }

        return completedCoachingDetailOutputDto;
    }


    public CompletedExerciseDetailOutputDto getCompletedExerciseDetail(int prescriptionId) {
        CompletedExerciseDetailOutputDto completedExerciseDetailOutputDto = new CompletedExerciseDetailOutputDto();

        Prescription prescription = coachingRepository.findById(prescriptionId).get();

        if(!prescription.getPrescriptionCode().equals("운동")){
            throw new PrescriptionTypeException("운동에서만 조회가 가능합니다.");
        }

        //전설문 관련 데이터 담기
        BeforeSurvey beforeSurvey = prescription.getBeforeSurvey();
        if (beforeSurvey != null) {
            completedExerciseDetailOutputDto.setBeforeSurvey(beforeSurvey.toDto());
        }



        //운동 관련 데이터 담기
        Training training = trainingRepository.findTrainingDetail(prescription.getTraining().getTrainingId());
        if (training != null){
            TrainingOutputDto trainingOutputDto = new TrainingOutputDto();
            trainingOutputDto.setTrainingURL(training.getTrainingURL());
            trainingOutputDto.setDescription(training.getDescription());
            completedExerciseDetailOutputDto.setTraining(trainingOutputDto);
        }

        //코칭 코멘트 데이터 담기
        if(prescription != null){
            completedExerciseDetailOutputDto.setPrescriptionComment(prescription.getPrescriptionComment());
        }

        //후설문 데이터 담기
        AfterSurvey afterSurvey = prescription.getAfterSurvey();
        if (afterSurvey != null) {
            AfterSurveyDto afterSurveyOutputDto = afterSurvey.makeDto();

            completedExerciseDetailOutputDto.setAfterSurvey(afterSurveyOutputDto);
        }

        return completedExerciseDetailOutputDto;
    }

}
