package com.asrai.joinit.user.therapist;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequiredArgsConstructor
@RequestMapping("/therapist")
public class TherapistController {

    private final TherapistService therapistService;

    //치료사 회원가입시 프로필 추가입력
    @PostMapping("/profile/{therapistId}")
    public void addProfile() {}

    //프로필 조회
    @GetMapping("/profile/{therapistId}")
    public void getProfile() {}

    //프로필 수정
    @PutMapping("/profile/{therapistId}")
    public void updateProfile() {}

    //치료사 프로필 이미지 저장
    @PostMapping("/profile/image/{therapistId}")
    public void addProfileImage() {}

    //치료사 프로필 이미지 수정
    @PutMapping("/profile/image/{therapistId}")
    public void updateProfileImage() {}

    //치료사 면허 이미지 입력
    @PostMapping("/license/image/{therapistId}")
    public void addLicenseImage() {}

    //치료사에게 할당된 환자리스트 조회
    @GetMapping("/patient/{therapistId}")
    public void getTherapistPatientList() {}

    //치료사가 환자 상세 정보 조회
    @GetMapping("/patient/detail/{therapistId}")
    public void getTherapistPatientDetail() {}

}
