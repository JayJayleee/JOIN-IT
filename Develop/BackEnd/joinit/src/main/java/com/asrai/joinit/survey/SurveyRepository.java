package com.asrai.joinit.survey;


import com.asrai.joinit.Training.JointTrainingMapping;
import com.asrai.joinit.domain.AfterSurvey;
import com.asrai.joinit.domain.BeforeSurvey;
import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class SurveyRepository {

	@PersistenceContext
	private EntityManager em;



	//전 설문 입력
	public void createBeforeSurvey(BeforeSurvey beforeSurvey){
		em.persist(beforeSurvey);

	}

	//전 설문 조회
	public BeforeSurvey findBeforeSurvey(int prescriptionId){

		return em.find(BeforeSurvey.class, prescriptionId);
	}

	//전 설문 통계 데이터 조회


	//후 설문 입력
	public void createAfterSurvey(AfterSurvey afterSurvey){
		em.persist(afterSurvey);

	}

	//후 설문 조회
	public AfterSurvey findAfterSurvey(int prescriptionId){

		return em.find(AfterSurvey.class, prescriptionId);
	}


	//후 설문 통계 데이터 조회
}
