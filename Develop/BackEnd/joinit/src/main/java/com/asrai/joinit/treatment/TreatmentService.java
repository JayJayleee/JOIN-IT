package com.asrai.joinit.treatment;

import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.TreatmentCodeDto;
import com.asrai.joinit.dto.TreatmentInputDto;
import com.asrai.joinit.dto.TreatmentOutputDto;
import com.asrai.joinit.prescription.PrescriptionRepository;
import com.asrai.joinit.user.patient.PatientRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TreatmentService {

//	DefaultMessageService messageService;

	//	@Value("${SMS_API_KEY}")
	private String SMS_API_KEY = "NCSGV4NSGSOCOA2Z";

	//	@Value("${SMS_API_SECRET_KEY}")
	private String SMS_API_SECRET_KEY = "KWGEWJZKSTAOSHABXWWO8BV9CSIDULHO";

	//	@Value("${SMS_DOMAIN}")
	private String SMS_DOMAIN = "https://api.coolsms.co.kr";

	//	@Value("${CALLING_NUMBER}")
	private String CALLING_NUMBER = "01066662309";

//	@Override
//	public void afterPropertiesSet() throws Exception {
//		this.messageService = NurigoApp.INSTANCE.initialize(SMS_API_KEY, SMS_API_SECRET_KEY, SMS_DOMAIN);
//	}

	DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(SMS_API_KEY,
		SMS_API_SECRET_KEY, SMS_DOMAIN);

	private final TreatmentRepository treatmentRepository;
	private final PatientRepository patientRepository;
	private final PrescriptionRepository prescriptionRepository;

	@Transactional
	public SingleMessageSentResponse saveTreatment(TreatmentInputDto form) {
		Treatment treatment = new Treatment();

		treatment.setTherapist(treatmentRepository.findTherapist(form.getTherapistId()));
		treatment.setJoint(treatmentRepository.findJoint(form.getJointName()));
		treatment.setJointName(form.getJointName());
		treatment.setPatientName(form.getPatientName());
		treatment.setPatientPhone(form.getPatientPhone());
		treatment.setAccidentDetail(form.getAccidentDetail());
		treatment.setTreatmentSignificant(form.getTreatmentSignificant());
		treatment.setSummary(form.getSummary());
		treatment.setIsCompleted("N");

//		System.out.println(form.getStartTime());
//		Timestamp timestamp = Timestamp.valueOf(form.getStartTime());
//		System.out.println(timestamp);
//		treatment.setStartTime(timestamp);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startTime = LocalDate.parse(form.getStartTime(), formatter);
		treatment.setStartTime(startTime);

		String certCode = getRandomStr(6);
		treatment.setTreatmentCode(certCode); //난수 생성해서 넣기

		treatmentRepository.saveTreatment(treatment);

//		//치료코드 문자 메세지로 전송v
		String phone = form.getPatientPhone();
		Message message = new Message();
		message.setFrom(CALLING_NUMBER);
		message.setTo(phone);
		message.setText(
			"[JOIN-IT 치료코드]\n" + form.getPatientName() + "환자님의 치료코드는 [" + certCode + "] 입니다.");

		SingleMessageSentResponse response = this.messageService.sendOne(
			new SingleMessageSendingRequest(message));

		return response;
	}

	public static String getRandomStr(int size) {
		char[] tmp = new char[size];
		for (int i = 0; i < tmp.length; i++) {
			int div = (int) Math.floor(Math.random() * 2);

			if (div == 0) { // 0이면 숫자로
				tmp[i] = (char) (Math.random() * 10 + '0');
			} else { //1이면 알파벳
				tmp[i] = (char) (Math.random() * 26 + 'A');
			}
		}
		return new String(tmp);
	}
	//치료 코드용 난수 생성 메서드

	public List<Map<String, Object>> findTreatmentListForTherapist(String id) {
		List<Map<String, Object>> treatmentData = new ArrayList<>();
//		List<Treatment> treatmentList = treatmentRepository.selectTreatmentListForTherapist(id);
		List<Treatment> treamentProgressList = treatmentRepository.selectTreatmentListForTherapistInProgress(
			id); //진행 중 리스트
		for (Treatment t : treamentProgressList) {
			Map<String, Object> map = new HashMap<>();
			map.put("treatmentId", t.getTreatmentId());
			map.put("patientName", t.getPatientName());
			map.put("jointName", t.getJointName());
			map.put("summary", t.getSummary());
			map.put("startTime", t.getStartTime());
			map.put("isCompleted", t.getIsCompleted());

			Long progressPrescription = treatmentRepository.selectAllPrescription(
				t.getTreatmentId());
			map.put("progressPrescription", progressPrescription);
			Long completedPrescription = treatmentRepository.selectCompletedPrescription(
				t.getTreatmentId());
			map.put("completedPrescription", completedPrescription);

			treatmentData.add(map);
		}

		List<Treatment> treatmentCompletedList = treatmentRepository.selectTreatmentListForTherapistCompleted(
			id); //완료 리스트
		for (Treatment t : treatmentCompletedList) {
			Map<String, Object> map = new HashMap<>();
			map.put("treatmentId", t.getTreatmentId());
			map.put("patientName", t.getPatientName());
			map.put("jointName", t.getJointName());
			map.put("summary", t.getSummary());
			map.put("startTime", t.getStartTime());
			map.put("endTime", t.getEndTime());
			map.put("isCompleted", t.getIsCompleted());

			Long progressPrescription = treatmentRepository.selectAllPrescription(
				t.getTreatmentId());
			map.put("progressPrescription", progressPrescription);
			Long completedPrescription = treatmentRepository.selectCompletedPrescription(
				t.getTreatmentId());
			map.put("completedPrescription", completedPrescription);

			treatmentData.add(map);
		}
		return treatmentData;
	}
	//치료사 기준 전체 치료 리스트

	public List<Map<String, Object>> selectTreatmentListForTherapistInProgress(String id) {
		List<Map<String, Object>> treatmentData = new ArrayList<>();
		List<Treatment> treatmentList = treatmentRepository.selectTreatmentListForTherapistInProgress(
			id);
		for (Treatment t : treatmentList) {
			Map<String, Object> map = new HashMap<>();
			map.put("treatmentId", t.getTreatmentId());
			map.put("patientName", t.getPatientName());
			map.put("jointName", t.getJointName());
			map.put("summary", t.getSummary());
			map.put("startTime", t.getStartTime());
			map.put("isCompleted", t.getIsCompleted());

			Long progressPrescription = treatmentRepository.selectAllPrescription(
				t.getTreatmentId());
			map.put("progressPrescription", progressPrescription);
			Long completedPrescription = treatmentRepository.selectCompletedPrescription(
				t.getTreatmentId());
			map.put("completedPrescription", completedPrescription);

			treatmentData.add(map);
		}
		return treatmentData;
	}
	//치료사 기준 진행 치료 리스트

	public List<Map<String, Object>> findTreatmentListForTherapistCompleted(String id) {
		List<Map<String, Object>> treatmentData = new ArrayList<>();
		List<Treatment> treatmentList = treatmentRepository.selectTreatmentListForTherapistCompleted(
			id);
		for (Treatment t : treatmentList) {
			Map<String, Object> map = new HashMap<>();
			map.put("treatmentId", t.getTreatmentId());
			map.put("patientName", t.getPatientName());
			map.put("jointName", t.getJointName());
			map.put("summary", t.getSummary());
			map.put("startTime", t.getStartTime());
			map.put("endTime", t.getEndTime());
			map.put("isCompleted", t.getIsCompleted());

			Long progressPrescription = treatmentRepository.selectAllPrescription(
				t.getTreatmentId());
			map.put("progressPrescription", progressPrescription);
			Long completedPrescription = treatmentRepository.selectCompletedPrescription(
				t.getTreatmentId());
			map.put("completedPrescription", completedPrescription);

			treatmentData.add(map);
		}
		return treatmentData;
	}
	//치료사 기준 완료 치료 리스트

	public List<Map<String, Object>> findTreatmentListForPatientInProgress(String id) {
		List<Map<String, Object>> treatmentData = new ArrayList<>();
		List<Treatment> treatmentList = treatmentRepository.selectTreatmentListForPatientInProgress(
			id);
		for (Treatment t : treatmentList) {
			HashMap<String, Object> map = new HashMap<>();
			map.put("treatmentId", t.getTreatmentId());
			map.put("therapistName", t.getTherapist().getName());
			map.put("jointName", t.getJointName());
			map.put("startTime", t.getStartTime());
			map.put("isCompleted", t.getIsCompleted());

			treatmentData.add(map);
		}
		return treatmentData;
	}
	//환자 기준 진행 중 치료 리스트 조회

	public List<Map<String, Object>> findTreatmentListForPatientCompleted(String id) {
		List<Map<String, Object>> treatmentData = new ArrayList<>();
		List<Treatment> treatmentList = treatmentRepository.selectTreatmentListForPatientCompleted(
			id);
		for (Treatment t : treatmentList) {
			HashMap<String, Object> map = new HashMap<>();
			map.put("treatmentId", t.getTreatmentId());
			map.put("therapistName", t.getTherapist().getName());
			map.put("jointName", t.getJointName());
			map.put("startTime", t.getStartTime());
			map.put("endTime", t.getEndTime());
			map.put("isCompleted", t.getIsCompleted());

			treatmentData.add(map);
		}
		return treatmentData;
	}
	//환자 기준 완료 치료 리스트 조회

	public List<TreatmentOutputDto> findTreatmentListAssignedToPatient(String therapistId,
		String patientId) {
//		System.out.println("service");
		List<TreatmentOutputDto> treatmentOutputDto = new ArrayList<>();
		List<Treatment> treatmentList = treatmentRepository.selectTreatmentListForTherapistAssignedToPatient(
			therapistId, patientId);
		for (Treatment t : treatmentList) {
			TreatmentOutputDto dto = new TreatmentOutputDto();
			dto.setTreatmentId(t.getTreatmentId());
			dto.setPatientName(t.getPatientName());
			dto.setJointName(t.getJointName());
			dto.setSummary(t.getSummary());
			dto.setStartTime(t.getStartTime());

			treatmentOutputDto.add(dto);
		}
		return treatmentOutputDto;
	}
	//치료사가 해당 환자에게 할당했던 치료 리스트 조회

	public Map<String, Object> findTreatmentDetail(int treatmentId) {
		Treatment treatment = treatmentRepository.selectTreatmentDetail(treatmentId);
		Map<String, Object> map = new HashMap<>();
		map.put("treatmentId", treatment.getTreatmentId());
		map.put("patientName", treatment.getPatientName());
		map.put("patientPhone", treatment.getPatientPhone());
		map.put("jointName", treatment.getJointName());
		map.put("treatmentSignificant", treatment.getTreatmentSignificant());
		map.put("accidentDetail", treatment.getAccidentDetail());
		map.put("summary", treatment.getSummary());
		map.put("startTime", treatment.getStartTime());
		if(treatment.getEndTime() != null) {
			map.put("endTime", treatment.getEndTime());
		}
		return map;
	}
	//수정용 치료 상세 조회

	public Map<String, Object> findTreatmentPatientProfile(int treatmentId) {
		Treatment findTreatment = treatmentRepository.selectPatientProfile(treatmentId);
		Map<String, Object> map = new HashMap<>();
		map.put("treatmentId", findTreatment.getTreatmentId());
		map.put("startTime", findTreatment.getStartTime());
		map.put("endTime", findTreatment.getEndTime());
		map.put("treatmentSignificant", findTreatment.getTreatmentSignificant());
		map.put("accidentDetail", findTreatment.getAccidentDetail());

		return map;
	}
	//치료별 환자 정보 조회

	@Transactional
	public void updateTreatment(int treatmentId, TreatmentInputDto form) {
		Treatment findTreatment = treatmentRepository.selectTreatmentDetail(treatmentId);
		findTreatment.setJointName(form.getJointName());
		findTreatment.setPatientName(form.getPatientName());
		findTreatment.setPatientPhone(form.getPatientPhone());
		findTreatment.setAccidentDetail(form.getAccidentDetail());
		findTreatment.setTreatmentSignificant(form.getTreatmentSignificant());
		findTreatment.setSummary(form.getSummary());

		treatmentRepository.saveTreatment(findTreatment);
	}
	//치료 수정

	@Transactional
	public void updateTreatmentStatus(int treatmentId) {

		List<Prescription> prescriptionList = prescriptionRepository.selectUncompletedPrescriptionList(treatmentId);
		for(Prescription p: prescriptionList) {
			prescriptionRepository.deletePrescription(p.getPrescriptionId());
		}
		//해당 치료의 완료되지 않은 처방 삭제

		Treatment findTreatment = treatmentRepository.selectTreatmentDetail(treatmentId);
		findTreatment.setIsCompleted("Y");
		findTreatment.setEndTime(LocalDate.now());

		treatmentRepository.saveTreatment(findTreatment); //치료 종료 처리
	}
	//치료 종료 (완료 여부에 Y, 치료 종료일에 현재 날짜 입력)


	public TreatmentCodeDto selectTreatmentCodeList(String patientName, String patientPhone) {
		TreatmentCodeDto treatmentCodeDto = new TreatmentCodeDto();
		treatmentCodeDto.setPatientId(
			treatmentRepository.selectTreatmentPatientId(patientName, patientPhone));

		List<Treatment> treatmentList = treatmentRepository.selectTreatmentCodeList(patientName,
			patientPhone);
		List<String> treatmentCodeList = new ArrayList<>();
		for (Treatment t : treatmentList) {
			treatmentCodeList.add(t.getTreatmentCode());
		}
		treatmentCodeDto.setTreatmentCodeList(treatmentCodeList);
		return treatmentCodeDto;
	}
	//환자 id, 치료 코드 리스트 반환

	@Transactional
	public ResponseEntity<String> updateTreatmentCode(String patientId, String treatmentCode) {
		int treatmentId = treatmentRepository.selectTreatmentCode(treatmentCode);
		System.out.println(treatmentId);
		if (treatmentId == 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
		} //치료 코드가 존재하지 않는 경우
		else {
			Treatment findTreatment = treatmentRepository.selectTreatmentDetail(treatmentId);
			findTreatment.setPatient(patientRepository.findById(patientId).get()); //환자 상세조회
			findTreatment.setTreatmentCode(null);
			treatmentRepository.saveTreatment(findTreatment);
			return ResponseEntity.ok("success");
		}
	}
	//환자가 치료 코드 입력 (치료 코드 확인 후 환자 id 넣고, 치료 코드 null로)

	public boolean isFirstPatient(String patientId) {
		return treatmentRepository.isFirstTreatment(patientId);
	}
	//처음이신가요?

}
