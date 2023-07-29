package com.asrai.joinit.Training;

import com.asrai.joinit.dto.JointTrainingMapping;
import com.asrai.joinit.dto.TrainingDto;
import com.asrai.joinit.domain.Training;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/training")
@RequiredArgsConstructor

public class TrainingController {

	private final TrainingService trainingService;
	
	//환부_운동종류 리스트 조회

	//운동 등록
	@PostMapping
	public void createTraining(@RequestBody TrainingDto form) {
		trainingService.saveTraining(form);
	}

	//운동 전체 리스트 조회
	@GetMapping("/list")
	public List<Training> getTrainingList() {
		return trainingService.findTrainingList();
	}

	//운동 상세 조회
	@GetMapping("/{trainingId}")
	public Training getTrainingDetail(@PathVariable("trainingId") int trainingId) {
		return trainingService.findTrainingDetail(trainingId);
	}

	//환부_운동종류 선택 후 운동 조회
	@GetMapping("/list/{mappingId}")
	public List<Training> getTrainingList(@PathVariable("mappingId") int mappingId){
		System.out.println(mappingId);
		List<Training> list = trainingService.findTrainingList(mappingId);
		for (Training training: list
		) {
			System.out.println("cont"+training.toString());
		}
		return list;
	}

	//환부_운동 종류_매핑 리스트 조회
	@GetMapping("/jointMapping")
	public List<JointTrainingMapping> getJointTrainingTypeList(){

		List<JointTrainingMapping> list = trainingService.findJointTrainingTypeList();
		return list;
	}

	@PutMapping("/{trainingId}")
	public void modifyTraining(@PathVariable("trainingId") int trainingId, @RequestBody TrainingDto form) {
		trainingService.updateTraining(trainingId, form);
	}
	//운동 수정

	@DeleteMapping("/{trainingId}")
	public void removeTraining(@PathVariable("trainingId") int trainingId) {

	}
	//운동 삭제

}
