package com.asrai.joinit.Training;


import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class TrainingRepository {

	@PersistenceContext
	private EntityManager em;

	//환부_운동종류 리스트 조회

	// saveTraining
	public void saveTraining(Training training) {
		em.persist(training);
	}
	//운동 등록 (api 운동 _번)

	public void saveTrainingTypeTraining(TrainingTypeTraining trainingTypeTraining) {
		em.persist(trainingTypeTraining);
	}
	//운동 등록 (api 운동 _번) - 운동종류와 운동 매핑 테이블에 등록

	public JointTrainingType findJointTrainingType(int mappingId) {
		return em.find(JointTrainingType.class, mappingId);
	}
	//운동 등록 (api 운동 _번) - 매핑id로 환부와 운동종류 매핑 테이블 찾기

	public List<Training> findTrainingList() {
	return em.createQuery("select t from Training t", Training.class)
		.getResultList();
	}
	//운동 리스트 조회 (api 운동 1번)



}
