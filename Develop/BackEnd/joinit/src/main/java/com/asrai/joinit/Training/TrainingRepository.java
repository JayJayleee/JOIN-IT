package com.asrai.joinit.Training;


import com.asrai.joinit.dto.JointTrainingMapping;
import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;

import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TrainingRepository {

	private final EntityManager em;

	//환부_운동종류 리스트 조회

	// saveTraining
	public void saveTraining(Training training) {
		if(training.getTrainingId() == 0) {
			em.persist(training);
		} else {
			em.merge(training);
		}
	}
	//운동 등록, 수정 (api 운동 6, 7번)

	public void saveTrainingTypeTraining(TrainingTypeTraining trainingTypeTraining) {
		em.persist(trainingTypeTraining);
	}
	//운동 등록 (api 운동 6번) - 운동종류와 운동 매핑 테이블에 등록

	public JointTrainingType findJointTrainingType(int mappingId) {
		return em.find(JointTrainingType.class, mappingId);
	}
	//운동 등록 (api 운동 6번) - 매핑id로 환부와 운동종류 매핑 테이블 찾기

	public List<Training> findTrainingList() {
		return em.createQuery("select t from Training t", Training.class)
			.getResultList();
	}
	//운동 리스트 조회 (api 운동 1번)


	public List<Training> findTrainingList(int mappingId) {
		List<Training> temp = em.createQuery(
				"select t from Training t where t.trainingId in (select tyt.training.trainingId from TrainingTypeTraining tyt where tyt.jointTrainingType.mappingId = "+mappingId+")", Training.class)
			.getResultList();
		return temp;
	}
	//환부-운동종류 선택 후 운동조회 (api 운동 2번)

	public List<JointTrainingMapping> findJointTrainingTypeList() {
		return em.createQuery(
				"select new com.asrai.joinit.Training.JointTrainingMapping(jtt.mappingId, j.jointName, tt.trainingTypeName) from JointTrainingType jtt, Joint j, TrainingType tt where jtt.joint.jointId = j.jointId and jtt.trainingType.trainingTypeId = tt.trainingTypeId", JointTrainingMapping.class)
			.getResultList();
	}
	//환부_운동 종류_매핑 리스트 조회 (api 운동 2번)

	public Training findTrainingDetail(int trainingId) {
		return em.find(Training.class, trainingId);
	}
	//운동 상세 조회 (api 운동 4번, 운동 수정할 때 get)

	public void deleteTraining(int trainingId) {
		em.remove(em.find(Training.class, trainingId));
	}
	//운동 삭제

}
