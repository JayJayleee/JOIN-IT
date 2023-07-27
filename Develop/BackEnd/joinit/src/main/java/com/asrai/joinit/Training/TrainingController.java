package com.asrai.joinit.Training;

import com.asrai.joinit.domain.Training;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	public void createTraining(@RequestBody TrainingForm form) {
		Training training = new Training();
		training.setTrainingName(form.getTrainingName());
		training.setTrainingURL(form.getTrainingURL());
		training.setStartPoint(form.getStartPoint());
		training.setMiddlePoint(form.getMiddlePoint());
		training.setEndPoint(form.getEndPoint());
		training.setDifficulty(form.getDifficulty());
		training.setDescription(form.getDescription());

//		for(int mappingId: form.getMappingIds()) {
//			training.setTrainingTypeTrainings(mappingId);
//		}

		trainingService.saveTraining(training, form.getMappingIds());
	}

	//운동 전체 리스트 조회
//	@GetMapping()
//	public

	@GetMapping("/list/{mappingId}")
	public List<Training> getTrainingList(@PathVariable("mappingId") int mappingId){
		System.out.println(mappingId);

		return trainingService.findTrainingList(mappingId);
	}
}
