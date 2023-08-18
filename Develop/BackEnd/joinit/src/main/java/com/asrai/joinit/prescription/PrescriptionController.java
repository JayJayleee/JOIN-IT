package com.asrai.joinit.prescription;

import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.dto.PrescriptionDetailDto;
import com.asrai.joinit.dto.PrescriptionInputDto;
import com.asrai.joinit.dto.PrescriptionOutputDto;
import com.asrai.joinit.exception.NotYetAllocateException;
import com.asrai.joinit.exception.PrescriptionTypeException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

	private final PrescriptionService prescriptionService;

	@PostMapping("/training")
	public void saveTrainingPrescription(@RequestBody PrescriptionInputDto form) {
		prescriptionService.saveTrainingPrescription(form);
	}
	//운동 처방 등록

	@PostMapping("/coaching")
	public void saveCoachingPrescription(@RequestBody PrescriptionInputDto form) {
		prescriptionService.saveCoachingPrescription(form);
	}
	//코칭 처방 등록

	@PostMapping("/meeting")
	public void saveYogaPrescription(@RequestBody PrescriptionInputDto form) {
		prescriptionService.saveMeetingPrescription(form);
	}
	//대면 처방 등록

	@GetMapping("/{treatmentId}")
	public List<Map<String, Object>> findPrescriptionByTreatmentId(@PathVariable int treatmentId) {
		return prescriptionService.findPrescriptionByTreatmentId(treatmentId);
	}
	//치료별 전체 처방 리스트 조회

	@GetMapping("/therapist/{therapistId}")
	public List<Map<String, Object>> findPrescriptionByTherapistId(@PathVariable String therapistId) {
		return prescriptionService.findPrescriptionByTherapistId(therapistId);
	}
	//치료사별 전체 처방 리스트 조회

	@GetMapping("/daily/therapist")
	public List<Map<String, Object>> findPrescriptionByTherapistId(@RequestParam String therapistId, @RequestParam String date) {
		return prescriptionService.findDailyPrescriptionByTherapistId(therapistId, date);
	}
	//치료사 일별 처방 리스트 조회

	@GetMapping("/daily/treatment")
	public List<Map<String, Object>> findPrescriptionByPatientId(@RequestParam int treatmentId, @RequestParam String date) {
		return prescriptionService.findDailyPrescriptionByPatientId(treatmentId, date);
	}
	//치료별 일별 처방 리스트 조회

	@GetMapping("/daily/coaching/{therapistId}")
	public List<Map<String, Object>> findCoachingPrescriptionByTherapistId(@PathVariable String therapistId) {
		return prescriptionService.findDailyCoachingByPatientId(therapistId);
	}
	//치료사 금일 코칭 리스트 조회

	@GetMapping("/patient/{treatmentId}")
	public List<Map<String, Object>> findPrescriptionListByTreatmentId(@PathVariable String treatmentId) {
		return prescriptionService.findPrescriptionListByTreatmentId(treatmentId);
	}
	//치료별 전체 처방 리스트 (환자 달력용)

	@GetMapping("/daily/patient")
	public Map<String, Object> findPrescriptionListByPatientId(@RequestParam String patientId, @RequestParam String date) {
		return prescriptionService.findDailyPrescriptionListForPatient(patientId, date);
	}
	//환자 일별 처방 리스트 (처방 26번)

	@GetMapping("/update/{prescriptionId}")
	public PrescriptionDetailDto findPrescriptionById(@PathVariable int prescriptionId) {
		return prescriptionService.findPrescriptionDetailByPrescriptionId(prescriptionId);
	}
	//수정용 처방 상세 조회 (운동, 코칭, 대면 모두)

	@GetMapping("/training/{prescriptionId}")
	public ResponseEntity<Object> findPrescriptionById1(@PathVariable int prescriptionId) {
		Map<String, Object> result = new HashMap<>();
		try {

			result.put("result", prescriptionService.findTrainingByPrescriptionId(prescriptionId));
			return new ResponseEntity<>(result, HttpStatus.OK) ;
		} catch (NotYetAllocateException e ){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
		}
	}
	//처방에 할당된 운동 정보 조회

	@PutMapping("/training/{prescriptionId}")
	public void updateTrainingPrescription(@PathVariable int prescriptionId, @RequestBody PrescriptionInputDto form) {
		prescriptionService.updateTrainingPrescription(prescriptionId, form);
	}
	//운동 처방 수정

	@PutMapping("/coaching/{prescriptionId}")
	public void updateCoachingPrescription(@PathVariable int prescriptionId, @RequestBody PrescriptionInputDto form) {
		prescriptionService.updateCoachingPrescription(prescriptionId, form);
	}
	//코칭 처방 수정

	@PutMapping("/meeting/{prescriptionId}")
	public void updateMeetingPrescription(@PathVariable int prescriptionId, @RequestBody PrescriptionInputDto form) {
		prescriptionService.updateMeetingPrescription(prescriptionId, form);
	}
	//대면 처방 수정

	@PutMapping("/end/{prescriptionId}")
	public void endPrescription(@PathVariable int prescriptionId) {
		prescriptionService.endPrescription(prescriptionId);
	}
	//처방 종료

	@DeleteMapping("/{prescriptionId}")
	public ResponseEntity<String> removePrescription(@PathVariable int prescriptionId) {
//		System.out.println("처방 삭제 컨트롤러 들어옴");
		return prescriptionService.deletePrescription(prescriptionId);
	}
	//처방 삭제
	
}
