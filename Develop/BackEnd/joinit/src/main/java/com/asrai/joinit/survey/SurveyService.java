package com.asrai.joinit.survey;

import com.asrai.joinit.domain.AfterSurvey;
import com.asrai.joinit.domain.BeforeSurvey;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.dto.AfterSurveyInputDto;
import com.asrai.joinit.dto.BeforeSurveyDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SurveyService {

	//생성자 주입
	private final SurveyRepository surveyRepository;



	//전 설문 입력
	@Transactional
	public void createBeforeSurvey(BeforeSurveyDto beforeSurveyDto){

		Prescription prescription = new Prescription();
		prescription.setPrescriptionId(beforeSurveyDto.getPrescriptionId());

		BeforeSurvey beforeSurvey = new BeforeSurvey();
		beforeSurvey.setPrescription(prescription);
		beforeSurvey.setAngle(beforeSurveyDto.getAngle());

		surveyRepository.createBeforeSurvey(beforeSurvey);
	}

	//전 설문 조회
	public BeforeSurvey findBeforeSurvey(int prescriptionId){
		return surveyRepository.findBeforeSurvey(prescriptionId);

	}


	//전 설문 통계 데이터 조회


	//후 설문 입력
	@Transactional
	public void createAfterSurvey(AfterSurveyInputDto afterSurveyDto){

		Prescription prescription = new Prescription();
		prescription.setPrescriptionId(afterSurveyDto.getPrescriptionId());

		AfterSurvey afterSurvey = new AfterSurvey();
		afterSurvey.setPrescription(prescription);
		afterSurvey.setDifficulty(afterSurveyDto.getDifficulty());
		afterSurvey.setPainRelief(afterSurveyDto.getPainRelief());
		afterSurvey.setSatisfaction(afterSurveyDto.getSatisfaction());
		afterSurvey.setPainDegree(afterSurveyDto.getPainDegree());
		afterSurvey.setEtc(afterSurveyDto.getEtc());

		surveyRepository.createAfterSurvey(afterSurvey);
	}

	//후 설문 조회
	public AfterSurvey findAfterSurvey(int prescriptionId){
		return surveyRepository.findAfterSurvey(prescriptionId);

	}


	//후 설문 통계 데이터 조회
}
