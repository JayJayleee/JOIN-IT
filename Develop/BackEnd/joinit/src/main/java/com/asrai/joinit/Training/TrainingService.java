package com.asrai.joinit.Training;

import com.asrai.joinit.admin.AdminRepository;
import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainingService {

	//생성자 주입
	private final TrainingRepository trainingRepository;

	public int saveTraining(Training training, int[] mappingId) {
		trainingRepository.saveTraining(training); //운동 객체 등록

		for(int id: mappingId) {
			JointTrainingType jointTrainingType = trainingRepository.findJointTrainingType(id); //매핑id로 JointTrainingType(환부_운동종류) 조회
			TrainingTypeTraining trainingTypeTraining = new TrainingTypeTraining(); //TrainingTypeTraining(운동종류_운동) 객체 생성
			trainingTypeTraining.setTraining(training);
			trainingTypeTraining.setJointTrainingType(jointTrainingType);
			trainingRepository.saveTrainingTypeTraining(trainingTypeTraining); //TrainingTypeTraining 객체 등록
		}

		return training.getTrainingId();
	}
	//운동 등록

	@Transactional(readOnly = true)
	public List<Training> findTrainingList() {
		return trainingRepository.findTrainingList();
	}
	//운동 리스트 조회


}
