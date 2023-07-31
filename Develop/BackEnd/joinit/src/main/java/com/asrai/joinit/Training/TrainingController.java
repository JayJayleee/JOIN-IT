package com.asrai.joinit.Training;

import com.asrai.joinit.dto.JointTrainingMappingDto;
import com.asrai.joinit.dto.TrainingInputDto;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.dto.TrainingOutputDto;
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
	public void createTraining(@RequestBody TrainingInputDto form) {
		trainingService.saveTraining(form);
	}

	//운동 전체 리스트 조회
	@GetMapping("/list")
	public List<Training> getTrainingList() {
		return trainingService.findTrainingList();
	}

	//운동 상세 조회
	// 운동 정보 + 운동이 영향을 미치는 환부/운동 종류 리스트 반환
	@GetMapping("/{trainingId}")
	public TrainingOutputDto getTrainingDetail(@PathVariable("trainingId") int trainingId) {
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
	public List<JointTrainingMappingDto> getJointTrainingTypeList(){

		List<JointTrainingMappingDto> list = trainingService.findJointTrainingTypeList();
		return list;
	}

	@PutMapping("/{trainingId}")
	public void modifyTraining(@PathVariable("trainingId") int trainingId, @RequestBody TrainingInputDto form) {
		trainingService.updateTraining(trainingId, form);
	}
	//운동 수정

	@DeleteMapping("/{trainingId}")
	public void removeTraining(@PathVariable("trainingId") int trainingId) {
		trainingService.deleteTraining(trainingId);
	}
	//운동 삭제
}
