package com.asrai.joinit.survey;

import com.asrai.joinit.domain.AfterSurvey;
import com.asrai.joinit.domain.BeforeSurvey;
import com.asrai.joinit.domain.Prescription;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/survey")
@RequiredArgsConstructor

public class SurveyController {

	//RequeiredArgsConstructor로 생성자 주입
	private final SurveyService surveyService;




	//전 설문 등록
	@PostMapping("/before")
	public void createBeforeSurvey(@RequestBody BeforeSurvey beforeSurvey) {

		surveyService.createBeforeSurvey(beforeSurvey);
	}

	//전 설문 조회
	//처방 데이터가 없으므로 더미 데이터 반환
	@GetMapping("/before/{prescriptionId}")
	public BeforeSurvey findBeforeSurvey(@PathVariable("prescriptionId") int prescriptionId){
//		return surveyService.findAfterSurvey(prescriptionId);
		BeforeSurvey temp = new BeforeSurvey();
		temp.setPrescription(new Prescription());
		temp.setAngle(61.123);

		return temp;
	}

//	//전 설문 통계 데이터 조회
//	@GetMapping("/before/statistics/{}")
//	public


	//후 설문 등록
	@PostMapping("/after")
	public void createAfterSurvey(@RequestBody AfterSurvey afterSurvey) {

		surveyService.createAfterSurvey(afterSurvey);
	}

	//

	//후 설문 조회
	//처방 데이터가 없으므로 더미 데이터 반환
	@GetMapping("/after/{prescriptionId}")
	public AfterSurvey findAfterSurvey(@PathVariable("prescriptionId") int prescriptionId){
//		return surveyService.findAfterSurvey(prescriptionId);
		AfterSurvey temp = new AfterSurvey();
		temp.setPrescription(new Prescription());
		temp.setPainDegree(3);
		temp.setSatisfaction(3);
		temp.setDifficulty(2);
		temp.setPainRelief(2);
		temp.setEtc("qwe");
		return temp;
	}

	//후 설문 통계 조회


}
