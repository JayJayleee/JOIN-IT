package com.asrai.joinit.user.patient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequiredArgsConstructor
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;

    //소셜 회원가입
    @PostMapping("/social")
    public void socialSignUp() {}

    //환자 회원가입시 프로필 추가 입력
    @PostMapping("/profile/{patientId}")
    public void addProfile(@PathVariable String patientId) {}

    //프로필 입력시 닉네임 중복검사
    @PostMapping("/profile/duplicate")
    public void checkNickname() {}

    //프로필 조회
    @GetMapping("/profile/{patientId}")
    public void getProfile() {}

    //프로필 수정
    @PutMapping("/profile/{patientId}")
    public void updateProfile() {}

    // 환자가 치료마다 치료번호 등록
    @PutMapping("/treatment")
    public void addTreatmentNumber() {}

}
