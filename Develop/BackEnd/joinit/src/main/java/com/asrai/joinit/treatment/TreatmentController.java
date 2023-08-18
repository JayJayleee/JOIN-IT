package com.asrai.joinit.treatment;

import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.TreatmentCodeDto;
import com.asrai.joinit.dto.TreatmentInputDto;
import com.asrai.joinit.dto.TreatmentOutputDto;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/treatment")
@RequiredArgsConstructor
public class TreatmentController {

	private final TreatmentService treatmentService;

	//치료 등록
	@PostMapping
	public SingleMessageSentResponse createTreatment(@RequestBody TreatmentInputDto form) {
		return treatmentService.saveTreatment(form);

	}

	//치료사 기준 전체 치료 리스트 조회
	@GetMapping("/therapist/{therapistId}")
	public List<Map<String, Object>> getTherapistTreatmentList(@PathVariable(name = "therapistId") String therapistId) {
//		System.out.println("treatmentController");
		return treatmentService.findTreatmentListForTherapist(therapistId);
	}

	//치료사 기준 진행 치료 리스트 조회
	@GetMapping("/therapist/uncomplete/{therapistId}")
	public List<Map<String, Object>> getTherapistTreatmentProgressList(@PathVariable String therapistId) {
		return treatmentService.selectTreatmentListForTherapistInProgress(therapistId);
	}

	//치료사 기준 완료 치료 리스트 조회
	@GetMapping("/therapist/complete/{therapistId}")
	public List<Map<String, Object>> getTherapistTreatmentCompletedList(@PathVariable String therapistId) {
		return treatmentService.findTreatmentListForTherapistCompleted(therapistId);
	}

	//환자 기준 진행 중 치료 리스트 조회
	@GetMapping("/patient/uncomplete/{patientId}")
	public List<Map<String, Object>> getPatientTreatmentInProgressList(@PathVariable String patientId) {
		return treatmentService.findTreatmentListForPatientInProgress(patientId);
	}

	//환자 기준 완료 치료 리스트 조회
	@GetMapping("/patient/complete/{patientId}")
	public List<Map<String, Object>> getPatientTreatmentCompletedList(@PathVariable String patientId) {
		return treatmentService.findTreatmentListForPatientCompleted(patientId);
	}

	//치료사가 해당 환자에게 할당했던 치료 리스트 조회
	@GetMapping("/{therapistId}/{patientId}")
	public List<TreatmentOutputDto> getTherapistPatientTreatmentList(@PathVariable String therapistId, @PathVariable String patientId) {
//		System.out.println("controller");
		return treatmentService.findTreatmentListAssignedToPatient(therapistId, patientId);
	}

	//수정용 치료 상세 조회
	@GetMapping("/update/{treatmentId}")
	public Map<String, Object> selectTreatmentDetail(@PathVariable int treatmentId) {
		return treatmentService.findTreatmentDetail(treatmentId);
	}

	//치료별 환자 정보 조회
	@GetMapping("/profile/{treatmentId}")
	public Map<String, Object> findTreatmentPatientProfile(@PathVariable int treatmentId) {
		return treatmentService.findTreatmentPatientProfile(treatmentId);
	}

	//치료 수정 (치료 api 8번)
	@PutMapping("/{treatmentId}")
	public void updateTreatment(@PathVariable int treatmentId, @RequestBody TreatmentInputDto form) {
		treatmentService.updateTreatment(treatmentId, form);
	}

	//환자 이름, 전화번호로 환자 id, 치료 코드 리스트 반환
	@GetMapping("/code")
	public TreatmentCodeDto findTreatmentCodeList(@RequestParam String patientName, @RequestParam String patientPhone) {
		return treatmentService.selectTreatmentCodeList(patientName, patientPhone);
	}

	//환자가 치료 코드 등록 (치료 api 9번)
	@PutMapping("/patient")
	public ResponseEntity<String> updateTreatmentCode(@RequestParam String patientId, @RequestParam String treatmentCode) {
//		System.out.println("컨트롤러 들어옴");
		return treatmentService.updateTreatmentCode(patientId, treatmentCode);
		//patientId 부분 오류 발생 가능, 이름이 다를 수 있음 userId인지 확인하기
	}

	//치료 종료 (치료 api 10번)
	@PutMapping("/end/{treatmentId}")
	public void updateTreatmentStatus(@PathVariable int treatmentId) {
		treatmentService.updateTreatmentStatus(treatmentId);
	}

	//처음이신가요?
	@GetMapping("/isFirst/{patientId}")
	public boolean isFist(@PathVariable String patientId) {
		return treatmentService.isFirstPatient(patientId);
	}


}
