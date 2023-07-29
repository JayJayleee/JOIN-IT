package com.asrai.joinit.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping()
    public void signUp() {
    }

    //ID 중복검사
    @PostMapping("/duplicate")
    public void duplicate() {
    }

    //휴대폰 인증번호 발급
    @PostMapping("/check/phone")
    public void checkPhone() {
    }

    //이메일 인증번호 발금
    @PostMapping("/check/email")
    public void checkEmail() {
    }

    //일반 로그인
    @PostMapping("/login")
    public void login() {
    }

    //소셜로그인
    @PostMapping("/login/social")
    public void loginSocial() {
    }

    //인증번호 확인 후 ID 알려주기
    @PostMapping("/cert/id")
    public void certId() {
    }

    //PW 찾기 전, 인증번호 확인
    @PostMapping("/cert/password")
    public void certPassword() {}

    //PW 수정
    @PutMapping("/password")
    public void changePassword() {}

    //비밀번호 검사
    @PostMapping("/check/password")
    public void checkPassword() {}

    //로그아웃
    @PutMapping("/{loginId}")
    public void logout() {}

    //탈퇴
    @DeleteMapping()
    public void signout() {}

}