package com.asrai.joinit.Training;

import com.asrai.joinit.dto.JointTrainingMappingDto;
import com.asrai.joinit.dto.TrainingInputDto;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.dto.TrainingOutputDto;
import com.asrai.joinit.img.ImageService;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/training")
@RequiredArgsConstructor
public class TrainingController {

	private final TrainingService trainingService;

	//이미지 포함 운동 등록
	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public void createTraining(
		@RequestPart("trainingInputDto") TrainingInputDto form,
		@RequestPart(name = "imageImgRoute", required = false) MultipartFile imageImgRoute,
		@RequestPart(name = "filterImgRoute", required = false) MultipartFile filterImgRoute,
		@RequestPart(name = "thumbnailImgRoute", required = false) MultipartFile thumbnailImgRoute
		) throws IOException {

		trainingService.saveTraining(form, imageImgRoute, filterImgRoute, thumbnailImgRoute);
	}


	@PutMapping("/{trainingId}")
	public ResponseEntity<String> modifyTraining(
		@PathVariable("trainingId") int trainingId,
		@RequestPart("trainingInputDto") TrainingInputDto form,
		@RequestPart(value = "imageImgRoute", required = false) MultipartFile imageImgRoute,
		@RequestPart(value = "filterImgRoute", required = false) MultipartFile filterImgRoute,
		@RequestPart(value = "thumbnailImgRoute", required = false) MultipartFile thumbnailImgRoute
	) {
		try {
			trainingService.updateTraining(trainingId, form, imageImgRoute, filterImgRoute, thumbnailImgRoute);
			return ResponseEntity.status(200).build();
		} catch (IOException e){
			return ResponseEntity.status(600).body("파일 처리 중 문제가 발생했습니다.");
		}
	}
	//이미지 포함 운동 수정


	@DeleteMapping("/{trainingId}")
	public void removeTrainingWithImage(@PathVariable("trainingId") int trainingId) {
		trainingService.deleteTrainingImage(trainingId);
	}
	//이미지 포함 운동 삭제

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


}
