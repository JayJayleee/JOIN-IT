package com.asrai.joinit.user.patient;

import com.asrai.joinit.dto.PatientDto;
import com.asrai.joinit.dto.PatientProfileDto;
import com.asrai.joinit.util.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;
    @Autowired
    private JwtService jwtService;

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    //환자 리스트 조회
    @GetMapping()
    public ResponseEntity<Result> getPatientList() {
        return ResponseEntity.ok(new Result(patientService.getPatientList()));
    }

    //소셜 회원가입
//    @PostMapping("/social")
//    public void socialSignUp() {}

    //환자 회원가입시 프로필 추가 입력
    @PostMapping("/profile/{patientId}")
    public ResponseEntity<String> addProfile(@PathVariable(name = "patientId") String userId, @RequestBody Map<String, Object> dataMap) {

        log.info("userId : {}", userId);
        log.info("dataMap : {}", dataMap);

        if (userId == null || dataMap.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        log.info("dataMap.get(\"nickname\") : {}", dataMap.get("nickname"));;

        PatientDto patientDto = new PatientDto();
        patientDto.setHeight((Integer) dataMap.get("height"));
        patientDto.setWeight((Integer) dataMap.get("weight"));
        patientDto.setBirth(Timestamp.valueOf((String) dataMap.get("birth") + " 00:00:00"));
        patientDto.setGender((String) dataMap.get("gender"));
        patientDto.setNickname((String) dataMap.get("nickname"));
        patientDto.setEtc((String) dataMap.get("etc"));
        patientDto.setPastAccidentDetails((String) dataMap.get("pastAccidentDetails"));
        patientDto.setSignificant((String) dataMap.get("significant"));
        log.info("patient : {}", patientDto);

        List<String> patientDiseaseList = (List<String>) dataMap.get("patientDiseaseList");
        log.info("patientDiseaseList : {}", patientDiseaseList);

        boolean isSuccess = patientService.addProfile(userId, patientDto, patientDiseaseList);

        if (isSuccess) {
            return ResponseEntity.ok().body("환자 회원가입 성공!!");
        }
        return ResponseEntity.badRequest().body("환자 회원가입 실패!!");
    }

    //프로필 입력시 닉네임 중복검사
    @PostMapping("/profile/duplicate")
    public ResponseEntity<String> checkNickname(@RequestBody Map<String, String> map) {

        log.info("map : {}", map);

        if (map == null) {
            return ResponseEntity.badRequest().build();
        }

        String nickname = map.get("nickname");
        log.info("nickname : {}", nickname);

        boolean isDuplicate = patientService.usedNickname(nickname);

        log.info("isDuplicate : {}", isDuplicate);

        if (isDuplicate) {
            return ResponseEntity.badRequest().body("중복입니다.");
        }
        return ResponseEntity.ok().body("사용 가능합니다.");
    }

    //프로필 조회
    @GetMapping("/profile/{patientId}")
    public ResponseEntity<Object> getProfile(@PathVariable(name = "patientId") String patientId, HttpServletRequest request) {
        
        log.info("patientId : {}", patientId);
        if (patientId == null || patientId.equals("")) {
            return ResponseEntity.badRequest().body("환자 PK 값이 전달되지 않았습니다.");
        }

        Optional<String> accessToken = jwtService.extractAccessToken(request);
        if (!accessToken.isPresent()) {
            return ResponseEntity.badRequest().body("Token이 전달되지 않았습니다.");
        }

        if (!jwtService.isUserValid(patientId, accessToken.get())) {
            return ResponseEntity.badRequest().body("권한이 없습니다.");
        }

        PatientProfileDto patientProfileDto = patientService.getProfile(patientId);
        log.info("patientProfileDto : {}", patientProfileDto);

        if (patientProfileDto == null) {
            return ResponseEntity.badRequest().body("없는 회원정보 입니다.");
        }
        return ResponseEntity.ok(patientProfileDto);
    }

    //프로필 수정
    @PutMapping("/profile/{patientId}")
    public ResponseEntity<Object> updateProfile(@PathVariable(name = "patientId") String patientId
        , @RequestBody Map<String, Object> dataMap
        , HttpServletRequest request) {

        log.info("patientId : {}", patientId);
        if (patientId == null || patientId.equals("")) {
            return ResponseEntity.badRequest().body("환자 PK 값이 전달되지 않았습니다.");
        }

        Optional<String> accessToken = jwtService.extractAccessToken(request);
        if (!accessToken.isPresent()) {
            return ResponseEntity.badRequest().body("Token이 전달되지 않았습니다.");
        }

        if (!jwtService.isUserValid(patientId, accessToken.get())) {
            return ResponseEntity.badRequest().body("권한이 없습니다.");
        }

        log.info("dataMap : {}", dataMap);

        if (patientId == null || dataMap == null) {
            return ResponseEntity.badRequest().build();
        }

        String Email = (String) dataMap.get("email");
        String Phone = (String) dataMap.get("phone");
        String Nickname = (String) dataMap.get("nickname");
        Integer Height = (Integer) dataMap.get("height");
        Integer Weight = (Integer) dataMap.get("weight");
        String etc = (String) dataMap.get("etc");
        String PastAccidentDetails = (String) dataMap.get("pastAccidentDetails");
        String Significant = (String) dataMap.get("significant");
        List<String> patientDiseaseList = (List<String>) dataMap.get("patientDiseaseList");

        PatientProfileDto patientProfileDto = new PatientProfileDto();
        patientProfileDto.setEmail(Email);
        patientProfileDto.setPhone(Phone);
        patientProfileDto.setNickname(Nickname);
        patientProfileDto.setHeight(Height);
        patientProfileDto.setWeight(Weight);
        patientProfileDto.setEtc(etc);
        patientProfileDto.setPastAccidentDetails(PastAccidentDetails);
        patientProfileDto.setSignificant(Significant);

        PatientProfileDto updatedPatientDto = patientService.updateProfile(patientId, patientProfileDto, patientDiseaseList);
        if (updatedPatientDto == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updatedPatientDto);
    }

    // 환자가 치료마다 치료번호 등록
    @PutMapping("/treatment")
    public void addTreatmentNumber() {}

}
