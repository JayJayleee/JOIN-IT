package com.asrai.joinit.user.therapist;

import com.asrai.joinit.dto.PatientProfileTreatmentDto;
import com.asrai.joinit.dto.TherapistDto;
import com.asrai.joinit.dto.TherapistProfileDto;
import com.asrai.joinit.user.patient.PatientInfo;
import com.asrai.joinit.util.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController @Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/therapist")
public class TherapistController {

    private final TherapistService therapistService;
    @Autowired
    private JwtService jwtService;

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    @GetMapping
    public ResponseEntity<Result> getTherapistList() {
        return ResponseEntity.ok(new Result(therapistService.getTherapistList()));
    }

    //치료사 회원가입시 프로필 추가입력
    @PostMapping(value = "/profile/{therapistId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> addProfile(@PathVariable(name = "therapistId") String userId
        , @RequestPart("hospitalName") String hospitalName
        , @RequestPart("hospitalNumber") String hospitalNumber
        , @RequestPart("gender") String gender
        , @RequestPart("birth") String birth
        , @RequestPart(name = "licensePhoto", required = false) MultipartFile licensePhoto) throws IOException {

        log.info("userId : {}", userId);
        log.info("hospitalName : {}", hospitalName);
        log.info("hospitalNumber : {}", hospitalNumber);
        log.info("gender : {}", gender);
        log.info("birth : {}", birth);

        TherapistDto therapistDto = new TherapistDto(
            Timestamp.valueOf(birth + " 00:00:00"), gender, hospitalName, hospitalNumber, "안녕하세요. 저는 " + hospitalName + "의 치료사입니다."
        );

        if (licensePhoto == null) {
            return ResponseEntity.badRequest().body("면허 이미지가 없습니다.");
        }

//        // 치료사 데이터 저장
//        boolean saveResult = therapistService.addProfile(therapist, licensePhoto);
        boolean saveResult = therapistService.addProfile(userId, therapistDto, licensePhoto);

        if (saveResult) {
            return ResponseEntity.ok("치료사 회원가입 성공!");
        }
        return ResponseEntity.internalServerError().body("치료사 회원가입 실패.");

    }

    //프로필 조회
    @GetMapping("/profile/{therapistId}")
    public ResponseEntity<Object> getProfile(@PathVariable(name = "therapistId") String therapistId, HttpServletRequest request) {

        log.info("therapistId : {}", therapistId);
        if (therapistId == null || therapistId.equals("")) {
            return ResponseEntity.badRequest().body("치료사 PK 값이 전달되지 않았습니다.");
        }

        Optional<String> accessToken = jwtService.extractAccessToken(request);
        if (!accessToken.isPresent()) {
            return ResponseEntity.badRequest().body("Token이 전달되지 않았습니다.");
        }

        if (!jwtService.isUserValid(therapistId, accessToken.get())) {
            return ResponseEntity.badRequest().body("권한이 없습니다.");
        }

        TherapistProfileDto therapistProfileDto = therapistService.getProfile(therapistId);
        log.info("therapistProfileDto : {}", therapistProfileDto);

        if (therapistProfileDto == null) {
            return ResponseEntity.badRequest().body("없는 회원 정보입니다.");
        }
        return ResponseEntity.ok(therapistProfileDto);
    }

    //프로필 수정
    @PutMapping("/profile/{therapistId}")
    public ResponseEntity<Object> updateProfile(@PathVariable(name = "therapistId") String therapistId
        , @RequestBody TherapistProfileDto therapistProfileDto
        , HttpServletRequest request) {

        log.info("therapistId : {}", therapistId);
        if (therapistId == null || therapistId.equals("")) {
            return ResponseEntity.badRequest().body("치료사 PK 값이 전달되지 않았습니다.");
        }

        Optional<String> accessToken = jwtService.extractAccessToken(request);
        if (!accessToken.isPresent()) {
            return ResponseEntity.badRequest().body("Token이 전달되지 않았습니다.");
        }

        if (!jwtService.isUserValid(therapistId, accessToken.get())) {
            return ResponseEntity.badRequest().body("권한이 없습니다.");
        }

        log.info("therapistProfileDto : {}", therapistProfileDto);
        TherapistProfileDto updateTherapistDTO = therapistService.updateProfile(therapistId, therapistProfileDto);

        if (updateTherapistDTO == null) {
            return ResponseEntity.badRequest().body("수정이 안되었습니다.");
        }

        return ResponseEntity.ok(updateTherapistDTO);
    }

    //치료사에게 할당된 환자리스트 조회
    @GetMapping("/patient/{therapistId}")
    public ResponseEntity<Object> getTherapistPatientList(@PathVariable(name = "therapistId") String therapistId, HttpServletRequest request) {

        log.info("therapistId : {}", therapistId);
        if (therapistId == null || therapistId.equals("")) {
            return ResponseEntity.badRequest().body("치료사 PK 값이 전달되지 않았습니다.");
        }

        Optional<String> accessToken = jwtService.extractAccessToken(request);
        if (!accessToken.isPresent()) {
            return ResponseEntity.badRequest().body("Token이 전달되지 않았습니다.");
        }

        if (!jwtService.isUserValid(therapistId, accessToken.get())) {
            return ResponseEntity.badRequest().body("권한이 없습니다.");
        }

        List<PatientInfo> patientListByTherapist = therapistService.findPatientListByTherapist(therapistId);

        if (patientListByTherapist == null || patientListByTherapist.size() == 0) {
            return ResponseEntity.badRequest().body("할당된 환자가 없습니다.");
        }
        return ResponseEntity.ok(new Result(patientListByTherapist));
    }

    //치료사가 환자 상세 정보 조회
    @PostMapping("/patient/detail/{therapistId}")
    public ResponseEntity<Object> getTherapistPatientDetail(@PathVariable(name = "therapistId") String therapistId
        , @RequestBody Map<String, String> map
        , HttpServletRequest request) {

        log.info("therapistId : {}", therapistId);
        if (therapistId == null || therapistId.equals("")) {
            return ResponseEntity.badRequest().body("치료사 PK 값이 전달되지 않았습니다.");
        }

        Optional<String> accessToken = jwtService.extractAccessToken(request);
        if (!accessToken.isPresent()) {
            return ResponseEntity.badRequest().body("Token이 전달되지 않았습니다.");
        }

        if (!jwtService.isUserValid(therapistId, accessToken.get())) {
            return ResponseEntity.badRequest().body("권한이 없습니다.");
        }

        log.info("patientId : {}", map.get("patientId"));
        String patientId = map.get("patientId");

        PatientProfileTreatmentDto patientDetailByTherapist = therapistService.findPatientDetailByTherapist(therapistId, patientId);

        if (patientDetailByTherapist == null || patientDetailByTherapist.getName() == null || patientDetailByTherapist.getName().equals("")) {
            return ResponseEntity.badRequest().body("환자정보가 없습니다.");
        }

        return ResponseEntity.ok(patientDetailByTherapist);
    }

    // 모든 정보 조회
    @GetMapping("/all/{therapistId}")
    public ResponseEntity<Object> getAllTherapist(@PathVariable(name = "therapistId") String therapistId) {
        TherapistDto oneTherapist = therapistService.getOneTherapist(therapistId);

        if (oneTherapist == null) {
            return ResponseEntity.badRequest().body("치료사 정보가 없습니다.");
        }

        return ResponseEntity.ok(oneTherapist);
    }
}
