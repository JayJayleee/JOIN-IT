package com.asrai.joinit.user;

import com.asrai.joinit.domain.EmailCertCode;
import com.asrai.joinit.domain.PhoneCertCode;
import com.asrai.joinit.dto.UserDto;
import com.asrai.joinit.util.jwt.JwtService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    //회원가입
    @PostMapping()
    public ResponseEntity<String> signUp(@RequestBody UserDto userDto) {

        log.info("user : {}", userDto);

        String userId;
        Map<String, String> resultMap;
        resultMap = userService.signUp(userDto);

        if (resultMap.get("error") != null) {
            return ResponseEntity.badRequest().body(resultMap.get("error"));
        }

        return ResponseEntity.ok(resultMap.get("userId"));
    }

    //ID 중복검사
    @PostMapping("/duplicate")
    public ResponseEntity<String> duplicateCheckById(@RequestBody Map<String, String> map) {

        String loginId = map.get("loginId");

        log.info("loginId : {}", loginId);

        boolean duplicated = userService.duplicatedLoginId(loginId);

        if (duplicated) {
            return ResponseEntity.badRequest().body("중복입니다.");
        }
        return ResponseEntity.ok("중복이 없으니 사용하셔도 좋아요.");
    }

    //Email 중복검사
    @PostMapping("/duplicate/email")
    public ResponseEntity<String> duplicateCheckByEmail(@RequestBody Map<String, String> map) {

        String email = map.get("email");

        log.info("email : {}", email);

        boolean duplicated = userService.duplicatedEmail(email);

        if (duplicated) {
            return ResponseEntity.badRequest().body("중복입니다.");
        }
        return ResponseEntity.ok("중복이 없으니 사용하셔도 좋아요.");
    }

    //휴대폰 인증번호 생성 및 전송
    /*
        1. 인증 클릭 시, 인증코드를 생성하여 DB의 User_Cert_Code 테이블에 인증코드를 삽입한다.
        2. 삽입된 인증코드를 회원의 핸드폰으로 전송한다.
        3. 회원은 인증번호를 확인하여 화면에 입력한다.
        2023-08-02 => SMSController에서 실행함
    */
//    @PostMapping("/create/phone/cert/code")
//    public ResponseEntity createPhoneCertCode(@RequestBody PhoneCertCode phoneCertCode, RedirectAttributes attributes) {
//        log.info(phoneCertCode.getPhone());
//        String phone = phoneCertCode.getPhone();
//        phoneCertCode.setPhoneCertCode(userService.createPhoneCertCode(phone));
//        attributes.addFlashAttribute("phoneCertCode", phoneCertCode);
//        return new ResponseEntity(HttpStatus.OK);
//    }

    // 휴대폰 인증번호 확인
    @PostMapping("/check/phone")
    public ResponseEntity<String> checkPhoneCode(@RequestBody PhoneCertCode phoneCertCode) {

        log.info("phoneCertCode : {}", phoneCertCode);

        if (phoneCertCode.getPhone() == null || phoneCertCode.getPhoneCertCode() == null
            || phoneCertCode.getPhone().equals("") || phoneCertCode.getPhoneCertCode().equals("")) {
            return ResponseEntity.badRequest().body("요청 주신 데이터가 부족합니다.");
        }

        boolean check = userService.checkPhoneCode(phoneCertCode);
        if (check) {
            return ResponseEntity.ok("인증이 완료되었습니다.");
        }
        return ResponseEntity.badRequest().body("인증에 실패하였습니다.");
    }

    //이메일 인증번호 발급
    /*
        1. 인증 클릭 시, 인증코드를 생성하여 DB의 User_Cert_Code 테이블에 인증코드를 삽입한다.
        2. 삽입된 인증코드를 회원의 이메일로 전송한다.
        3. 회원은 인증번호를 확인하여 화면에 입력한다.
    */
    @PostMapping("/create/email/cert/code")
    public ResponseEntity<String> createEmailCertCode(@RequestBody Map<String, Object> emailCheck) {

        log.info("emailCheck : {}", emailCheck);

        String name = (String) emailCheck.getOrDefault("name", null);
        String loginId = (String) emailCheck.getOrDefault("loginId", null);
        String email = (String) emailCheck.get("email");

        log.info("name : {}, loginId : {}, email : {}", name, loginId, email);

        boolean exist = userService.createEmailCertCode(name, loginId, email);
        if (!exist) {
            return ResponseEntity.badRequest().body("입력하신 정보가 잘못되었습니다.");
        }
        return ResponseEntity.ok().body("인증번호가 발급되었습니다.");
    }

    // 이메일 인증번호 확인
    @PostMapping("/check/email")
    public ResponseEntity<String> checkEmailCode(@RequestBody EmailCertCode emailCertCode) {

        log.info("emailCertCode : {}", emailCertCode);

        if (emailCertCode == null) {
            return ResponseEntity.badRequest().body("이메일 혹은 인증번호가 입력되지 않았습니다.");
        } else if (emailCertCode.getEmail() == null || emailCertCode.getEmailCertCode() == null ||
            emailCertCode.getEmail().equals("") || emailCertCode.getEmailCertCode().equals("")) {
            return ResponseEntity.badRequest().body("이메일 혹은 인증번호가 입력되지 않았습니다.");
        }

        boolean check = userService.checkEmailCode(emailCertCode);

        if (check) {
            return ResponseEntity.ok().body("이메일 인증에 성공하였습니다.");
        }
        return ResponseEntity.badRequest().body("이메일 인증에 실패하였습니다.");
    }

    //일반 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {

        Map<String, String> userInfo = new HashMap<>();

        String loginId = loginData.get("loginId");
        String password = loginData.get("password");
        String userType = loginData.get("userType");

        if (loginId == null || password == null || loginId.equals("") || password.equals("")) {
            userInfo.put("error",  "ID 또는 PW가 입력되지 않았습니다.");
            return ResponseEntity.badRequest().body(userInfo);
        }

        if (userType == null || userType.equals("")) {
            userInfo.put("error",  "userType이 입력되지 않았습니다.");
            return ResponseEntity.badRequest().body(userInfo);
        }

        userInfo = userService.login(loginData);

        if(!userInfo.containsKey("error")){
            return ResponseEntity.ok(userInfo);
        }else {
            return ResponseEntity.badRequest().body(userInfo);
        }
    }

//    @PostMapping("/login/token")
//    public ResponseEntity<Map<String, String>> loginToken(@RequestBody Map<String, String> loginData, ServletRequest httpRequest) {
//        Map<String, String> userInfo = new HashMap<>();
//        return ResponseEntity.ok().body(userInfo);
//    }

    //인증번호 확인 후 ID 알려주기
    @PostMapping("/cert/id")
    public ResponseEntity<String> responseIdAfterCert(@RequestBody Map<String, Object> dataMap) {

        log.info("dataMap : {}", dataMap);

        String name = (String) dataMap.get("name");
        String email = (String) dataMap.get("email");
        Boolean emailCheck = (Boolean) dataMap.get("emailCheck");

        log.info("name : {}, email : {}, emailCheck : {}", name, email, emailCheck);

        if (emailCheck == null || !emailCheck) {
            return ResponseEntity.badRequest().body("이메일 인증이 안되었습니다.");
        } else {
            String loginId = userService.responseIdByNameAndEmail(name, email);
            return ResponseEntity.ok().body(loginId);
        }
    }

    //PW 수정
    @PutMapping("/password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> param) {

        log.info("param : {}", param);

        String loginId = param.get("loginId");
        String password = param.get("password");

        if (loginId == null || password == null || loginId.equals("") || password.equals("")) {
            return ResponseEntity.badRequest().body("입력이 안되었습니다.");
        }

        boolean success = userService.changePassword(loginId, password);

        if (success) {
            return ResponseEntity.ok().body("비밀번호가 변경되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("비밀번호 변경 중 문제가 발생하였습니다.");
        }
    }

    //탈퇴 전, 비밀번호 검사
    @PostMapping("/check/password")
    public ResponseEntity<String> checkPassword(@RequestBody Map<String, String> param) {

        log.info("param : {}", param);

        String loginId = param.get("loginId");
        String password = param.get("password");

        if (loginId == null || password == null || loginId.equals("") || password.equals("")) {
            return ResponseEntity.badRequest().body("입력이 안되었습니다.");
        }

        boolean success = userService.checkPassword(loginId, password);

        if (success) {
            return ResponseEntity.ok().body("비밀번호가 일치합니다.");
        } else {
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }
    }

    //로그아웃
    @PutMapping()
    public ResponseEntity<String> logout(@RequestBody Map<String, String> dataMap) {

        String userId = dataMap.get("userId");
        String accessToken = dataMap.get("accessToken");
        log.info("userId : {},  accessToken : {}", userId, accessToken);

        boolean userValid = jwtService.isUserValid(userId, accessToken);
        if (!userValid) {
            return ResponseEntity.badRequest().body("유효하지 않은 회원입니다.");
        }

        boolean logout = userService.logout(userId);

        if (logout) {
            return ResponseEntity.ok().body("로그아웃 성공");
        } else {
            return ResponseEntity.badRequest().body("로그아웃 실패");
        }
    }

    //탈퇴
    @DeleteMapping()
    public ResponseEntity<String> signout(@RequestBody Map<String, String> dataMap) {

        String userId = dataMap.get("userId");
        String accessToken = dataMap.get("accessToken");
        log.info("userId : {},  accessToken : {}", userId, accessToken);

        boolean userValid = jwtService.isUserValid(userId, accessToken);
        if (!userValid) {
            return ResponseEntity.badRequest().body("유효하지 않은 회원입니다.");
        }

        boolean deleted = userService.signout(userId);

        if (deleted) {
            return ResponseEntity.ok().body("삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("삭제 실패했습니다.");
        }

    }


}