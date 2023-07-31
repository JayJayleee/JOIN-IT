package com.asrai.joinit.user.therapist;

import com.asrai.joinit.domain.Therapist;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.multipart.MultipartFile;

@RestController @Slf4j
@RequiredArgsConstructor
@RequestMapping("/therapist")
public class TherapistController {

    private String profileImageDir = "/therapist/profileImage";
    private String licenseImageDir = "/therapist/licenseImage";

    private final TherapistService therapistService;

    //치료사 회원가입시 프로필 추가입력
    @PostMapping("/profile/{therapistId}")
    public ResponseEntity addProfile(@PathVariable(name = "therapistId") String therapistId, @RequestBody Therapist therapist
        , @RequestParam MultipartFile licenseImage, @RequestParam String licenseImageName) {

        log.info("therapistId={}", therapistId);
        log.info("therapist={}", therapist);
        log.info("licenseImage={}", licenseImage);
        log.info("licenseImageName={}", licenseImageName);

        therapistService.addProfile(therapistId, therapist, licenseImage, licenseImageName);
        return new ResponseEntity(HttpStatus.OK);
    }

    //프로필 조회
    @GetMapping("/profile/{therapistId}")
    public ResponseEntity<Therapist> getProfile(@PathVariable(name = "therapistId") String therapistId) {
        Therapist therapist = therapistService.getProfile(therapistId);
        return ResponseEntity.ok(therapist);
    }

    //프로필 수정
    @PutMapping("/profile/{therapistId}")
    public ResponseEntity<Therapist> updateProfile(@PathVariable(name = "therapistId") String therapistId) {
        Therapist therapist = therapistService.updateProfile(therapistId);
        return ResponseEntity.ok(therapist);
    }

    //치료사 프로필 이미지 저장
    @PostMapping("/profile/image/{therapistId}")
    public ResponseEntity addProfileImage(@PathVariable(name = "therapistId") String therapistId
        , @RequestParam MultipartFile profileImage, @RequestParam String profileImageName) {
        therapistService.addProfileImage(therapistId, profileImage, profileImageName);
        return new ResponseEntity(HttpStatus.OK);
    }

    //치료사 프로필 이미지 수정
    @PutMapping("/profile/image/{therapistId}")
    public ResponseEntity updateProfileImage(@PathVariable(name = "therapistId") String therapistId
        , @RequestParam MultipartFile profileImage, @RequestParam String profileImageName) {
        therapistService.updateProfileImage(therapistId, profileImage, profileImageName);
        return new ResponseEntity(HttpStatus.OK);
    }

    //치료사 면허 이미지 입력
//    @PostMapping("/license/image/{therapistId}")
//    public ResponseEntity addLicenseImage() {}

    //치료사에게 할당된 환자리스트 조회
    @GetMapping("/patient/{therapistId}")
    public ResponseEntity getTherapistPatientList() {
        return new ResponseEntity(HttpStatus.OK);
    }

    //치료사가 환자 상세 정보 조회
    @GetMapping("/patient/detail/{therapistId}")
    public ResponseEntity getTherapistPatientDetail() {
        return new ResponseEntity(HttpStatus.OK);
    }

}
