package com.asrai.joinit.Training;

import com.asrai.joinit.dto.JointTrainingMapping;
import com.asrai.joinit.dto.TrainingDto;
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

	public int saveTraining(TrainingDto form) {

		Training training = new Training();
		training.setTrainingName(form.getTrainingName());
		training.setTrainingURL(form.getTrainingURL());
		training.setStartPoint(form.getStartPoint());
		training.setMiddlePoint(form.getMiddlePoint());
		training.setEndPoint(form.getEndPoint());
		training.setDifficulty(form.getDifficulty());
		training.setDescription(form.getDescription());
		training.setRom(form.getRom());

		trainingRepository.saveTraining(training); //운동 객체 등록

		int[] mappingIds = form.getMappingIds();
		for(int id: mappingIds) {
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


	@Transactional(readOnly = true)
	public List<Training> findTrainingList(int mappingId){
		return trainingRepository.findTrainingList(mappingId);

	}
	//환부_운동종류 선택 후 운동 조회

	@Transactional(readOnly = true)
	public List<JointTrainingMapping> findJointTrainingTypeList(){
		return trainingRepository.findJointTrainingTypeList();
	}
	//환부_운동 종류_매핑 리스트 조회

	@Transactional(readOnly = true)
	public Training findTrainingDetail(int trainingId) {

		return trainingRepository.findTrainingDetail(trainingId);
	}
	//운동 상세 조회

	public void updateTraining(int trainingId, TrainingDto form) {
		Training findTraining = trainingRepository.findTrainingDetail(trainingId);
		findTraining.setTrainingName(form.getTrainingName());
		findTraining.setTrainingURL(form.getTrainingURL());
		findTraining.setStartPoint(form.getStartPoint());
		findTraining.setMiddlePoint(form.getMiddlePoint());
		findTraining.setEndPoint(form.getEndPoint());
		findTraining.setDifficulty(form.getDifficulty());
		findTraining.setDescription(form.getDescription());

		findTraining.getTrainingTypeTrainings().clear();
		int[] mappingIds = form.getMappingIds();
		for(int id: mappingIds) {
			//찾아서 수정해주는 로직
			JointTrainingType jointTrainingType = trainingRepository.findJointTrainingType(id);
			TrainingTypeTraining trainingTypeTraining = new TrainingTypeTraining();
			trainingTypeTraining.setTraining(findTraining);
			trainingTypeTraining.setJointTrainingType(jointTrainingType);
			trainingRepository.saveTrainingTypeTraining(trainingTypeTraining);
		}
	}
	//운동 수정

	//운동 삭제

}
