package com.asrai.joinit.user;

import com.asrai.joinit.domain.User;
import com.asrai.joinit.domain.UserCertCode;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping()
    public ResponseEntity<String> signUp(@RequestBody User user) {
        String userId = userService.signUp(user);
        return ResponseEntity.ok(userId);
    }

    //ID 중복검사
    @PostMapping("/duplicate")
    public ResponseEntity<Boolean> duplicateCheckById(@RequestBody String loginId) {
        boolean duplicated = userService.duplicateCheckById(loginId);
        return ResponseEntity.ok(duplicated);
    }

    //휴대폰 인증번호 생성 및 전송
    /*
        1. 인증 클릭 시, 인증코드를 생성하여 DB의 User_Cert_Code 테이블에 인증코드를 삽입한다.
        2. 삽입된 인증코드를 회원의 핸드폰으로 전송한다.
        3. 회원은 인증번호를 확인하여 화면에 입력한다.
    */
    @PostMapping("/create/phone/cert/code")
    public ResponseEntity createPhoneCertCode(@RequestBody String phone) {
        userService.createPhoneCertCode(phone);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 휴대폰 인증번호 확인
    @PostMapping("/check/phone")
    public ResponseEntity<Boolean> checkPhoneCode(@RequestBody UserCertCode userCertCode) {
        boolean check = userService.checkPhoneCode(userCertCode);
        return ResponseEntity.ok(check);
    }

    //이메일 인증번호 발급
    /*
        1. 인증 클릭 시, 인증코드를 생성하여 DB의 User_Cert_Code 테이블에 인증코드를 삽입한다.
        2. 삽입된 인증코드를 회원의 이메일로 전송한다.
        3. 회원은 인증번호를 확인하여 화면에 입력한다.
    */
    @PostMapping("/create/email/cert/code")
    public ResponseEntity createEmailCertCode(@RequestBody  String email) {
        userService.createEmailCertCode(email);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 이메일 인증번호 확인
    @PostMapping("/check/email")
    public ResponseEntity<Boolean> checkEmailCode(@RequestBody UserCertCode userCertCode) {
        boolean check = userService.checkEmailCode(userCertCode);
        return ResponseEntity.ok(check);
    }

    //일반 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, @RequestBody(required = false) String accessToken) {
        String userId = userService.login(user, accessToken);
        return ResponseEntity.ok(userId);
    }

    //소셜로그인
//    @PostMapping("/login/social")
//    public ResponseEntity loginSocial() {
//        return new ResponseEntity(HttpStatus.OK);
//    }

    //인증번호 확인 후 ID 알려주기
    @PostMapping("/cert/id")
    public ResponseEntity responseIdAfterCert(@RequestBody UserCertCode userCertCode) {
        String loginId = userService.responseIdAfterCert(userCertCode);
        return ResponseEntity.ok(loginId);
    }

    //PW 찾기 전, 인증번호 확인
    /*
    (230729) 이메일 인증 /check/email로 사용하면 됨
    @PostMapping("/cert/password")
    public ResponseEntity certPassword() {
        return new ResponseEntity(HttpStatus.OK);
    }
     */

    //PW 수정
    @PutMapping("/password")
    public ResponseEntity<Boolean> changePassword(@RequestBody Map<String, String> param) {

        String loginId = param.get("loginId");
        String password = param.get("password");

        boolean success = userService.changePassword(loginId, password);
        return ResponseEntity.ok(success);
    }

    //비밀번호 검사
    @PostMapping("/check/password")
    public ResponseEntity<Boolean> checkPassword(@RequestBody Map<String, String> param) {

        String loginId = param.get("loginId");
        String password = param.get("password");

        boolean check = userService.checkPassword(loginId, password);
        return new ResponseEntity(HttpStatus.OK);
    }

    //로그아웃
    @PutMapping("")
    public ResponseEntity logout(@RequestBody String loginId) {
        userService.logout(loginId);
        return new ResponseEntity(HttpStatus.OK);
    }

    //탈퇴
    @DeleteMapping()
    public ResponseEntity<Boolean> signout(@RequestBody String loginId) {
        boolean deleted = userService.signout(loginId);
        return ResponseEntity.ok(deleted);
    }

}