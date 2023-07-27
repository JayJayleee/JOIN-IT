package com.asrai.joinit.Training;

import com.asrai.joinit.domain.Training;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/training")
public class TrainingController {

	private final TrainingService trainingService;
	
	//환부_운동종류 리스트 조회


	//운동 등록
//	@PostMapping(/)

	//운동 리스트 조회

	//dnsehd
	@GetMapping("/list/{mappingId}")
	public List<Training> getTrainingList(@PathVariable("mappingId") int mappingId){


		return trainingService.findTrainingList(mappingId);
	}
}
