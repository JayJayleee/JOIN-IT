package com.asrai.joinit.survey;

import com.asrai.joinit.domain.AfterSurvey;
import com.asrai.joinit.domain.BeforeSurvey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SurveyService {

	//생성자 주입
	private final SurveyRepository surveyRepository;



	//전 설문 입력
	public void createBeforeSurvey(BeforeSurvey beforeSurvey){

		surveyRepository.createBeforeSurvey(beforeSurvey);
	}

	//전 설문 조회
	public BeforeSurvey findBeforeSurvey(int prescriptionId){
		return surveyRepository.findBeforeSurvey(prescriptionId);

	}


	//전 설문 통계 데이터 조회


	//후 설문 입력
	public void createAfterSurvey(AfterSurvey afterSurvey){

		surveyRepository.createAfterSurvey(afterSurvey);
	}

	//후 설문 조회
	public AfterSurvey findAfterSurvey(int prescriptionId){
		return surveyRepository.findAfterSurvey(prescriptionId);

	}


	//후 설문 통계 데이터 조회
}
