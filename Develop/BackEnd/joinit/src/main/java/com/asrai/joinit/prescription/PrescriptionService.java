package com.asrai.joinit.prescription;

import com.asrai.joinit.Training.TrainingRepository;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.JointTrainingTypeMappingDto;
import com.asrai.joinit.dto.PrescriptionDetailDto;
import com.asrai.joinit.dto.PrescriptionInputDto;
import com.asrai.joinit.dto.PrescriptionProcessDto;
import com.asrai.joinit.dto.TrainingOutputDto;
import com.asrai.joinit.img.ImageService;
import com.asrai.joinit.survey.SurveyRepository;
import com.asrai.joinit.treatment.TreatmentRepository;
import com.asrai.joinit.user.patient.PatientRepository;
import com.asrai.joinit.exception.NotYetAllocateException;
import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PrescriptionService {

	private final PrescriptionRepository prescriptionRepository;
	private final TrainingRepository trainingRepository;
	private final PatientRepository patientRepository;
	private final TreatmentRepository treatmentRepository;
	private final SurveyRepository surveyRepository;
	private final ImageService imageService;

	@Transactional
	public void saveTrainingPrescription(PrescriptionInputDto form) {
		Prescription prescription = new Prescription();
		prescription.setTreatment(prescriptionRepository.findTreatmentById(form.getTreatmentId()));
		prescription.setPrescriptionCode("운동");
		System.out.println(prescriptionRepository.findTrainingById(form.getTrainingId()));
		prescription.setTraining(prescriptionRepository.findTrainingById(form.getTrainingId()));
		prescription.setSetCount(form.getSetCount());

		prescription.setPrescriptionTime(LocalDate.now());
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime processTime = LocalDateTime.parse(form.getPrescriptionProcessTime() + " 00:00:00", formatter);
		prescription.setPrescriptionProcessTime(processTime);

		prescription.setTargetAngle(form.getTargetAngle());
		prescription.setPrescriptionComment(form.getPrescriptionComment());

		prescription.setIsCompleted("N"); //이거 원래 이렇게 하면 안돼..
		prescription.setTimeOver("N"); //나중에 수정하자..

		prescriptionRepository.insertPrescription(prescription);
	}
	//운동 처방 등록

	@Transactional
	public void saveCoachingPrescription(PrescriptionInputDto form) {
		Prescription prescription = new Prescription();
		prescription.setTreatment(prescriptionRepository.findTreatmentById(form.getTreatmentId()));
		prescription.setPrescriptionCode("코칭");
		prescription.setTraining(prescriptionRepository.findTrainingById(form.getTrainingId()));
		prescription.setPrescriptionTime(LocalDate.now()); //처방일은 현재 날짜로 지정
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime processTime = LocalDateTime.parse(form.getPrescriptionProcessTime(), formatter);
		prescription.setPrescriptionProcessTime(processTime);
		prescription.setTargetAngle(form.getTargetAngle());
		prescription.setPrescriptionComment(form.getPrescriptionComment());

		prescription.setIsCompleted("N"); //이거 원래 이렇게 하면 안돼..
		prescription.setTimeOver("N"); //나중에 수정하자..

		prescriptionRepository.insertPrescription(prescription);
	}
	//코칭 처방 등록

	@Transactional
	public void saveMeetingPrescription(PrescriptionInputDto form) {
		Prescription prescription = new Prescription();
		prescription.setTreatment(prescriptionRepository.findTreatmentById(form.getTreatmentId()));
		prescription.setPrescriptionCode("대면");
		prescription.setPrescriptionTime(LocalDate.now());
		prescription.setPrescriptionComment(form.getPrescriptionComment());
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime processTime = LocalDateTime.parse(form.getPrescriptionProcessTime(), formatter);
		prescription.setPrescriptionProcessTime(processTime);

		prescription.setIsCompleted("N"); //이거 원래 이렇게 하면 안돼..
		prescription.setTimeOver("N"); //나중에 수정하자..

		prescriptionRepository.insertPrescription(prescription);
	}
	//대면 처방 등록

	public List<Map<String, Object>> findPrescriptionByTreatmentId(int treatmentId) {
		List<Map<String, Object>> prescriptionData = new ArrayList<>();
		List<Prescription> prescriptionList = prescriptionRepository.selectPrescriptionListByTreatmentId(treatmentId);
		for (Prescription p : prescriptionList) {
			Map<String, Object> map = new HashMap<>();

			map.put("prescriptionId", p.getPrescriptionId());
			map.put("treatmentId", p.getTreatment().getTreatmentId());

			map.put("prescriptionCode", p.getPrescriptionCode());
			if(p.getPrescriptionCode().equals("코칭") || p.getPrescriptionCode().equals("대면")) {
				map.put("therapistName", p.getTreatment().getTherapist().getName());
			}

			map.put("isCompleted", p.getIsCompleted());
			map.put("timeOver", p.getTimeOver());
			map.put("prescriptionProcessTime", p.getPrescriptionProcessTime());

			if(p.getTraining() != null) { //운동이 null이 아닐 때만 (대면 제외)
				map.put("trainingName", p.getTraining().getTrainingName());
				List<JointTrainingTypeMappingDto> list = trainingRepository.findTrainingJointTrainingType(p.getTraining().getTrainingId());
				map.put("jointTrainingTypeMappingDtoList", list);
			}
			prescriptionData.add(map);
		}
		return prescriptionData;
	}
	//치료별 처방 리스트 조회

	public List<Map<String, Object>> findPrescriptionByTherapistId(String therapistId) {
		List<Map<String, Object>> prescriptionData = new ArrayList<>();
		List<Prescription> prescriptionList = prescriptionRepository.selectPrescriptionListByTherapistId(therapistId);
		for(Prescription p : prescriptionList) {
			Map<String, Object> map = new HashMap<>();
			map.put("prescriptionCode", p.getPrescriptionCode());

			LocalDateTime dateTime = p.getPrescriptionProcessTime(); //날짜+시간 데이터 받아와서
			LocalDate date = dateTime.toLocalDate(); //날짜 데이터로 변환
			map.put("prescriptionProcessTime", date);

			prescriptionData.add(map);
		}
		return prescriptionData;
	}
	//치료사별 처방 리스트 조회

	public List<Map<String, Object>> findDailyPrescriptionByTherapistId(String therapistId, String date) {
		List<Map<String, Object>> prescriptionData = new ArrayList<>();
		List<Prescription> prescriptionList = prescriptionRepository.selectDailyPrescriptionByTherapistId(therapistId, date);
		for(Prescription p : prescriptionList) {
			Map<String, Object> map = new HashMap<>();
			map.put("prescriptionId", p.getPrescriptionId());
			map.put("patientName", p.getTreatment().getPatientName());
			map.put("prescriptionCode", p.getPrescriptionCode());
			map.put("prescriptionProcessTime", p.getPrescriptionProcessTime());
			map.put("isCompleted", p.getIsCompleted());
			map.put("timeOver", p.getTimeOver());

			prescriptionData.add(map);
		}
		return prescriptionData;
	}
	//치료사별 일별 처방 리스트 조회 (코칭, 대면만)

	public List<Map<String, Object>> findDailyPrescriptionByPatientId(int treatmentId, String date) {
		List<Map<String, Object>> prescriptionData = new ArrayList<>();
		List<Prescription> prescriptionList = prescriptionRepository.selectDailyPrescriptionByPatientId(treatmentId, date);

		for(Prescription p : prescriptionList) {
			Map<String, Object> map = new HashMap<>();
			map.put("prescriptionId", p.getPrescriptionId());
			map.put("prescriptionCode", p.getPrescriptionCode());
			map.put("prescriptionProcessTime", p.getPrescriptionProcessTime());
			map.put("isCompleted", p.getIsCompleted());
			map.put("therapistName", p.getTreatment().getTherapist().getName());

			if(p.getTraining() != null) { //운동이 null이 아닐 때만 (대면 제외)
				map.put("trainingName", p.getTraining().getTrainingName());
				List<JointTrainingTypeMappingDto> list = trainingRepository.findTrainingJointTrainingType(p.getTraining().getTrainingId());
				map.put("jointTrainingTypeMappingDtoList", list);
			}
			prescriptionData.add(map);
		}
		return prescriptionData;
	}
	//치료별 일별 처방 리스트 조회 (운동, 코칭, 대면 모두)

	public List<Map<String, Object>> findDailyCoachingByPatientId(String therapistId) {
		List<Map<String, Object>> prescriptionData = new ArrayList<>();
		List<Prescription> prescriptionList = prescriptionRepository.selectCoachingListByTherapistId(therapistId);

		for(Prescription p : prescriptionList) {
			Map<String, Object> map = new HashMap<>();
			map.put("prescriptionId", p.getPrescriptionId());
			map.put("patientName", p.getTreatment().getPatientName());
			map.put("jointName", p.getTreatment().getJointName());
			map.put("prescriptionProcessTime", p.getPrescriptionProcessTime());

			prescriptionData.add(map);
		}
		return prescriptionData;
	}
	//치료사 금일 코칭 조회

	public List<Map<String, Object>> findPrescriptionListByTreatmentId(String treatmentId) {
		List<Map<String, Object>> prescriptionData = new ArrayList<>();
		List<Prescription > prescriptionList = prescriptionRepository.selectPrescriptionListForPatient(treatmentId);
		for(Prescription p : prescriptionList) {
			Map<String, Object> map = new HashMap<>();
			map.put("prescriptionCode", p.getPrescriptionCode());

			LocalDateTime dateTime = p.getPrescriptionProcessTime(); //날짜+시간 데이터 받아와서
			LocalDate date = dateTime.toLocalDate(); //날짜 데이터로 변환
			map.put("prescriptionProcessTime", date);

			prescriptionData.add(map);
		}
		return prescriptionData;
	}
	//치료별 전체 처방 리스트 (환자 달력용)

	public Map<String, Object> findDailyPrescriptionListForPatient(String patientId, String date) {
		Map<String, Object> prescriptionData = new HashMap<>();
		prescriptionData.put("patientName", patientRepository.findById(patientId).get().getName()); //환자 명

		List<Treatment> treatmentList = treatmentRepository.selectTreatmentListForPatient(patientId); //환자 id로 치료 리스트 찾기
		Long allCount = 0L;
		Long completedCount = 0L;
		
		for(Treatment t: treatmentList) {
			allCount += prescriptionRepository.countDailyPrescription(t.getTreatmentId(), date);
			completedCount += prescriptionRepository.countDailyCompletedPrescription(t.getTreatmentId(), date);
		}

		prescriptionData.put("allCount", allCount); //전체 처방 갯수
		prescriptionData.put("completedCount", completedCount);

		List<Prescription> findPrescriptionList = prescriptionRepository.selectPrescriptionListDailyForPatient(patientId, date); //환자 id로 일별 처방리스트
		List<Map<String, Object>> prescriptionList = new ArrayList<>(); //처방 데이터를 담을 map 리스트 생성
		for(Prescription p: findPrescriptionList) {
			System.out.println("완료되지 않은 처방");
			Map<String, Object> map = new HashMap<>();
			map.put("prescriptionId", p.getPrescriptionId());
			map.put("prescriptionCode", p.getPrescriptionCode());
			map.put("therapistName", p.getTreatment().getTherapist().getName());
			map.put("prescriptionProcessTime", p.getPrescriptionProcessTime());
			map.put("isCompleted", p.getIsCompleted());

			if(p.getTraining() != null) {
				map.put("trainingName", p.getTraining().getTrainingName());
				List<JointTrainingTypeMappingDto> list = trainingRepository.findTrainingJointTrainingType(p.getTraining().getTrainingId());
				map.put("jointTrainingTypeMappingDtoList", list);
			}
			prescriptionList.add(map);
		}
		prescriptionData.put("prescriptionList", prescriptionList);

		return prescriptionData;
	}
	//환자별 일별 전체 처방 리스트

	public PrescriptionDetailDto findPrescriptionDetailByPrescriptionId(int prescriptionId) {
		PrescriptionDetailDto dto = new PrescriptionDetailDto();
		Prescription prescription = prescriptionRepository.selectPrescriptionDetail(prescriptionId);

		if(prescription.getTraining() != null) {
			TrainingOutputDto trainingOutputDto = new TrainingOutputDto(); //운동 출력용 - dto
			trainingOutputDto.setTrainingID(prescription.getTraining().getTrainingId());
			trainingOutputDto.setTrainingName(prescription.getTraining().getTrainingName());
			trainingOutputDto.setTrainingURL(prescription.getTraining().getTrainingURL());
			List<JointTrainingTypeMappingDto> list = trainingRepository.findTrainingJointTrainingType(prescription.getTraining().getTrainingId());
			trainingOutputDto.setJointTrainingTypeMappingDtoList(list);
			dto.setTraining(trainingOutputDto);
		}

		dto.setPrescriptionCode(prescription.getPrescriptionCode());
		dto.setPrescriptionComment(prescription.getPrescriptionComment());
		dto.setOnlineCoachingUrl(prescription.getOnlineCoachingUrl());
		dto.setTargetAngle(prescription.getTargetAngle());
		dto.setSetCount(prescription.getSetCount());
		dto.setPrescriptionProcessTime(prescription.getPrescriptionProcessTime());

		return dto;
	}
	//수정용 처방 상세 조회

	public PrescriptionProcessDto findTrainingByPrescriptionId(int prescriptionId){

		Prescription prescription = prescriptionRepository.selectPrescriptionDetail(prescriptionId);

		if(prescription == null){
			throw new NotYetAllocateException("등록된 처방이 없습니다.");
		}

//		if(!prescription.getPrescriptionCode().equals("운동")){
//			throw new NotYetAllocateException("운동 처방에 사용되는 api 입니다.");
//		}

		Training training = prescription.getTraining();

		PrescriptionProcessDto prescriptionProcessDto = new PrescriptionProcessDto();

		TrainingOutputDto trainingOutputDto = new TrainingOutputDto();

		trainingOutputDto.setTrainingID(training.getTrainingId());
		trainingOutputDto.setTrainingURL(training.getTrainingURL());
		trainingOutputDto.setTrainingName(training.getTrainingName());
		trainingOutputDto.setEndPoint(training.getEndPoint());
		trainingOutputDto.setMiddlePoint(training.getMiddlePoint());
		trainingOutputDto.setStartPoint(training.getStartPoint());
		trainingOutputDto.setFilterImgRoute(training.getFilterImgRoute());
		trainingOutputDto.setImageImgRoute(training.getImageImgRoute());
		trainingOutputDto.setDescription(training.getDescription());
		trainingOutputDto.setDifficulty(training.getDifficulty());
		trainingOutputDto.setRom(training.getRom());
		trainingOutputDto.setThumbnailImgRoute(training.getThumbnailImgRoute());

		prescriptionProcessDto.setTraining(trainingOutputDto);

		PrescriptionDetailDto prescriptionDetailDto = new PrescriptionDetailDto();

		prescriptionDetailDto.setPrescriptionComment(prescription.getPrescriptionComment());
		prescriptionDetailDto.setSetCount(prescription.getSetCount());
		prescriptionDetailDto.setTargetAngle(prescription.getTargetAngle());

		prescriptionProcessDto.setPrescription(prescriptionDetailDto);

		return prescriptionProcessDto;

	}

	@Transactional
	public void updateTrainingPrescription(int prescriptionId, PrescriptionInputDto form) {
		Prescription findPrescription = prescriptionRepository.selectPrescriptionDetail(prescriptionId);

		findPrescription.setTraining(prescriptionRepository.findTrainingById(form.getTrainingId()));
		findPrescription.setSetCount(form.getSetCount());

		if (form.getPrescriptionProcessTime() != null) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime prescriptionTime = LocalDateTime.parse(form.getPrescriptionProcessTime() + " 00:00:00", formatter);
			System.out.println(prescriptionTime);
			findPrescription.setPrescriptionProcessTime(prescriptionTime);
		}

		findPrescription.setTargetAngle(form.getTargetAngle());
		findPrescription.setPrescriptionComment(form.getPrescriptionComment());

		prescriptionRepository.insertPrescription(findPrescription);
	}
	//운동 처방 수정

	@Transactional
	public void updateCoachingPrescription(int prescriptionId, PrescriptionInputDto form) {
		Prescription findPrescription = prescriptionRepository.selectPrescriptionDetail(prescriptionId);

		findPrescription.setTraining(prescriptionRepository.findTrainingById(form.getTrainingId()));
		findPrescription.setPrescriptionTime(LocalDate.now()); //처방일은 현재 날짜로 지정
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime processTime = LocalDateTime.parse(form.getPrescriptionProcessTime(), formatter);
		findPrescription.setPrescriptionProcessTime(processTime);
		findPrescription.setTargetAngle(form.getTargetAngle());
		findPrescription.setPrescriptionComment(form.getPrescriptionComment());

		prescriptionRepository.insertPrescription(findPrescription);
	}
	//코칭 처방 수정

	@Transactional
	public void updateMeetingPrescription(int prescriptionId, PrescriptionInputDto form) {
		Prescription findPrescription = prescriptionRepository.selectPrescriptionDetail(prescriptionId);

		findPrescription.setPrescriptionComment(form.getPrescriptionComment());
		findPrescription.setPrescriptionTime(LocalDate.now()); //처방일은 현재 날짜로 지정
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime processTime = LocalDateTime.parse(form.getPrescriptionProcessTime(), formatter);
		findPrescription.setPrescriptionProcessTime(processTime);
	}
	//대면 처방 수정

	@Transactional
	public ResponseEntity<String> deletePrescription(int prescriptionId) {
//		surveyRepository.deleteBeforeSurvey(prescriptionId);
//		surveyRepository.deleteAfterSurvey(prescriptionId);
		System.out.println("처방 삭제 서비스 들어옴");
		if(prescriptionRepository.selectPrescriptionDetail(prescriptionId).getIsCompleted().equals("Y")) { //이미 완료된 처방이라면
			ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 종료된 처방은 삭제할 수 없습니다.");
//			System.out.println(prescriptionRepository.selectPrescriptionDetail(prescriptionId).getIsCompleted());
			System.out.println("완료 처방");
		}
		else {
			prescriptionRepository.deletePrescription(prescriptionId);
			ResponseEntity.status(HttpStatus.OK).body("success");
			System.out.println("미완료 처방");
		}
		return null;
	}
	//처방 삭제

	@Transactional
	public void endPrescription(int prescriptionId) {
		Prescription findPrescription = prescriptionRepository.selectPrescriptionDetail(prescriptionId);

		findPrescription.setIsCompleted("Y");
		LocalDate updateDate = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime updateTime = LocalDateTime.parse(updateDate + " " + "00:00:00", formatter);
		findPrescription.setUpdateTime(updateTime);

		prescriptionRepository.insertPrescription(findPrescription);
	}
	//처방 종료


}
