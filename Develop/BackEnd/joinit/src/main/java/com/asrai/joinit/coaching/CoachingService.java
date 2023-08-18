package com.asrai.joinit.coaching;


import com.asrai.joinit.Training.TrainingRepository;
import com.asrai.joinit.domain.OnlineCoachingComment;
import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentInputDto;
import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentOutputDto;
import com.asrai.joinit.domain.OnlineCoachingImage;
import com.asrai.joinit.domain.OnlineCoachingImage.OnlineCoachingImageOutputDto;
import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.PatientDisease;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.CoachingPatientDto;
import com.asrai.joinit.dto.CoachingPatientDto.Survey;
import com.asrai.joinit.dto.CoachingPatientDto.SurveyInterface;
import com.asrai.joinit.dto.PatientDiseaseDto;
import com.asrai.joinit.dto.PrescriptionDetailDto;
import com.asrai.joinit.dto.TrainingOutputDto;
import com.asrai.joinit.dto.TreatmentOutputDto;
import com.asrai.joinit.exception.NotYetAllocateException;
import com.asrai.joinit.exception.PrescriptionTypeException;
import com.asrai.joinit.img.ImageService;
import com.asrai.joinit.user.patient.PatientDiseaseRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
class CoachingService {

    private final CoachingRepository coachingRepository;
    private final ImageService imageService;
    private final OnlineCoachingImageRepository onlineCoachingImageRepository;
    private final OnlineCoachingCommentRepository onlineCoachingCommentRepository;
    private final TrainingRepository trainingRepository;

    private final PatientDiseaseRepository patientDiseaseRepository;



    //온라인 코칭에 필요한 치료사를 위한 정보 조회
    public CoachingPatientDto getCoachingDataForTherapist(int prescriptionId) {

        Prescription prescription = findCoaching(prescriptionId);

        prescription.setStarted("Y");

        CoachingPatientDto coachingPatientDto = new CoachingPatientDto();

        Treatment treatment = prescription.getTreatment();

        System.out.println(treatment.getPatient());

        if(treatment.getPatient() == null){
            throw new NotYetAllocateException("아직 환자에게 할당되지 않은 치료입니다.");
        }

        Patient patient = treatment.getPatient();

        //inner class PatientProfile 받아오기
        CoachingPatientDto.PatientProfile patientProfile = new CoachingPatientDto.PatientProfile();
        patientProfile.setName(patient.getName());
        patientProfile.setHeight(patient.getHeight());
        patientProfile.setWeight(patient.getWeight());
        patientProfile.setBirth(patient.getBirth().toLocalDateTime());
        patientProfile.setGender(patient.getGender());
        List<PatientDisease> patientDiseaseCodeList = patient.getPatientDiseaseList();
        List<String> patientDiseaseList = new ArrayList<>();

        //질병 코드 등록
        List<PatientDiseaseDto> patientDiseaseDTOList = patientDiseaseRepository
            .patientDiseaseDTOListByPatientId(patient);
        List<String> patientProfileDiseaseList = patientDiseaseDTOList.stream()
            .map(list -> list.getDiseaseCode()).collect(Collectors.toList());
        patientProfile.setDiseaseCodeList(patientProfileDiseaseList);




        patientProfile.setPastAccidentDetails(patient.getPastAccidentDetails());
        patientProfile.setSignificant(patient.getSignificant());

        coachingPatientDto.setPatientProfile(patientProfile);

        TreatmentOutputDto treatmentOutputDto = new TreatmentOutputDto();
        treatmentOutputDto.setStartTime(treatment.getStartTime());
        treatmentOutputDto.setAccidentDetail(treatment.getAccidentDetail());
        treatmentOutputDto.setTreatmentSignificant(treatment.getTreatmentSignificant());

        //treatment 연결
        coachingPatientDto.setTreatment(treatmentOutputDto);

        //운동 내용 할당
        Training training = trainingRepository.findTrainingDetail(prescription.getTraining().getTrainingId());

        TrainingOutputDto trainingOutputDto = new TrainingOutputDto();
        trainingOutputDto.setTrainingID(training.getTrainingId());
        trainingOutputDto.setImageImgRoute(training.getImageImgRoute());
        trainingOutputDto.setFilterImgRoute(training.getFilterImgRoute());
        trainingOutputDto.setStartPoint(training.getStartPoint());
        trainingOutputDto.setMiddlePoint(training.getMiddlePoint());
        trainingOutputDto.setEndPoint(training.getEndPoint());
//        trainingOutputDto.

        coachingPatientDto.setTraining(trainingOutputDto);


        //이 사람의 최근 1개의 처방 데이터 조회
        Survey survey = new Survey();

        SurveyInterface surveyInterface = coachingRepository.findLastSurvey(treatment.getPatient().getUserId());

        if(surveyInterface != null){
            survey.setEtc(surveyInterface.getEtc());
            survey.setSatisfaction(surveyInterface.getSatisfaction());
            survey.setDifficulty(surveyInterface.getDifficulty());
            survey.setAngle(surveyInterface.getAngle());
            survey.setPainRelief(surveyInterface.getPainRelief());
            survey.setPainDegree(surveyInterface.getPainDegree());
            survey.setImgRoute(surveyInterface.getImgRoute());
            survey.setTrainingName(surveyInterface.getTrainingName());
            coachingPatientDto.setSurvey(survey);
        }

        PrescriptionDetailDto prescriptionDetailDto = new PrescriptionDetailDto();

        prescriptionDetailDto.setPrescriptionComment(prescription.getPrescriptionComment());
        prescriptionDetailDto.setSetCount(prescription.getSetCount());
        prescriptionDetailDto.setTargetAngle(prescription.getTargetAngle());

        coachingPatientDto.setPrescriptionDetailDto(prescriptionDetailDto);


        return coachingPatientDto;

    }

    public TrainingOutputDto  getCoachingDataForPatient(int prescriptionId) {

        Prescription prescription = findCoaching(prescriptionId);

        if(prescription.getStarted() == null || !prescription.getStarted().equals("Y")){
            throw new NotYetAllocateException("치료사가 아직 준비되지 않았습니다.");
        }

        Treatment treatment = prescription.getTreatment();

        if(treatment.getPatient() == null){
            throw new NotYetAllocateException("아직 환자에게 할당되지 않은 치료입니다.");
        }


        //운동 내용 할당
        Training training = prescription.getTraining();

        TrainingOutputDto trainingOutputDto = new TrainingOutputDto();
        trainingOutputDto.setTrainingID(training.getTrainingId());
        trainingOutputDto.setImageImgRoute(training.getImageImgRoute());
        trainingOutputDto.setFilterImgRoute(training.getFilterImgRoute());
        trainingOutputDto.setStartPoint(training.getStartPoint());
        trainingOutputDto.setMiddlePoint(training.getMiddlePoint());
        trainingOutputDto.setEndPoint(training.getEndPoint());

        return trainingOutputDto;

    }

    //코칭 시 이미지 저장
    public void saveCoachingImage(List<MultipartFile> files, int prescriptionId)
        throws IOException {


        Prescription prescription = findCoaching(prescriptionId);


        for (int i = 0; i < files.size(); i++) {

            String imgRouteOriginalName =
                UUID.randomUUID() + "-" + files.get(i).getOriginalFilename();

            String imgRoute = imageService.upload(files.get(i), imgRouteOriginalName);

            OnlineCoachingImage onlineCoachingImage = new OnlineCoachingImage();


            onlineCoachingImage.setPrescriptionId(prescription);
            onlineCoachingImage.setImgRoute(imgRoute);
            onlineCoachingImage.setSequence(i + 1);

            onlineCoachingImageRepository.save(onlineCoachingImage);
        }

    }

    //코칭에 사용된 이미지 조회
    public List<OnlineCoachingImageOutputDto> findCoachingimages(int prescriptionId) {

        List<OnlineCoachingImageOutputDto> onlineCoachingImageOutputDtoList = new ArrayList<>();


        Prescription prescription = findCoaching(prescriptionId);


        List<OnlineCoachingImage> onlineCoachingImageList = onlineCoachingImageRepository.findByPrescriptionId(
            prescription);
        for (OnlineCoachingImage onlineCoachingImage : onlineCoachingImageList
        ) {
            OnlineCoachingImageOutputDto onlineCoachingImageOutputDto = new OnlineCoachingImageOutputDto();
            onlineCoachingImageOutputDto.setPrescriptionId(
                onlineCoachingImage.getPrescriptionId().getPrescriptionId());
            onlineCoachingImageOutputDto.setSequence(onlineCoachingImage.getSequence());
            onlineCoachingImageOutputDto.setImgRoute(onlineCoachingImage.getImgRoute());
            onlineCoachingImageOutputDtoList.add(onlineCoachingImageOutputDto);
        }

        return onlineCoachingImageOutputDtoList;
    }

    //온라인 코칭 코멘트 저장
    public void saveOnlineCoachingComment(
        List<OnlineCoachingCommentInputDto> onlineCoachingCommentInputDtoList, int prescriptionId) {


        Prescription prescription = findCoaching(prescriptionId);

        for (int i = 0; i < onlineCoachingCommentInputDtoList.size(); i++) {

            OnlineCoachingComment onlineCoachingComment = new OnlineCoachingComment();

            onlineCoachingComment.setPrescriptionId(prescription);
            onlineCoachingComment.setSequence(i + 1);
            onlineCoachingComment.setWriter(onlineCoachingCommentInputDtoList.get(i).getWriter());
            onlineCoachingComment.setComment(onlineCoachingCommentInputDtoList.get(i).getComment());

            onlineCoachingCommentRepository.save(onlineCoachingComment);
        }

    }

    //코칭에 사용된 채팅 조회
    public List<OnlineCoachingCommentOutputDto> findOnlineCoachingComment(int prescriptionId) {

        List<OnlineCoachingCommentOutputDto> onlineCoachingCommentOutputDtoList = new ArrayList<>();


        Prescription prescription = findCoaching(prescriptionId);

        List<OnlineCoachingComment> onlineCoachingCommentList = onlineCoachingCommentRepository.findByPrescriptionId(
            prescription);
        for (OnlineCoachingComment onlineCoachingComment : onlineCoachingCommentList
        ) {
            OnlineCoachingCommentOutputDto onlineCoachingCommentOutputDto = new OnlineCoachingCommentOutputDto();
            onlineCoachingCommentOutputDto.setPrescriptionId(
                onlineCoachingComment.getPrescriptionId().getPrescriptionId());
            onlineCoachingCommentOutputDto.setSequence(onlineCoachingComment.getSequence());
            onlineCoachingCommentOutputDto.setComment(onlineCoachingComment.getComment());
            onlineCoachingCommentOutputDto.setWriter(onlineCoachingComment.getWriter());
            onlineCoachingCommentOutputDtoList.add(onlineCoachingCommentOutputDto);
        }

        return onlineCoachingCommentOutputDtoList;
    }

    //코칭 비디오 저장
    public void setOnlineCoachingVideo(MultipartFile file, int prescriptionId) throws IOException {

        Prescription prescription = findCoaching(prescriptionId);

        String videoRouteOriginalName = UUID.randomUUID() + "-" + file.getOriginalFilename();

        String videoRoute = imageService.upload(file, videoRouteOriginalName);

        prescription.setVideoRoute(videoRoute);

    }

    public boolean getCoachingIsStart(int prescriptionId){
        Prescription prescription = findCoaching(prescriptionId);
        if(prescription.getStarted() == null || prescription.getStarted().equals("N")){
            return false;
        }else {

            return true;
        }

    }

    public Prescription findCoaching(int prescriptionId){
        Optional<Prescription> prescriptionOptional = coachingRepository.findById(prescriptionId);

        log.info(String.valueOf(prescriptionOptional.isEmpty()));
        if(prescriptionOptional.isEmpty()){
            throw new NotYetAllocateException("존재하지 않는 처방입니다.");
        }

        Prescription prescription = prescriptionOptional.get();

        if (!prescription.getPrescriptionCode().equals("코칭")) {
            throw new PrescriptionTypeException("처방 타입을 확인해주세요 코칭에만 할당이 가능합니다.");
        }

        return prescription;

    }


}
