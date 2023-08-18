package com.asrai.joinit.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.asrai.joinit.config.WebSecurityConfig;
import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.PhoneCertCode;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.dto.UserDto;
import com.asrai.joinit.user.patient.PatientRepository;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
class UserServiceImplTest {

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private UserSequenceRepository userSequenceRepository;

    @Test
    // 비밀번호를 생성하여
    // 비밀번호를 암호화했을때
    // 잘 암호화 되고, 일치하는가
    void encodedPassword() {
        String password = "qwer!@#$";
        String encoded1 = userService.passwordEncoder(password);
        String encoded2 = userService.passwordEncoder(password);
        String encoded3 = userService.passwordEncoder(password);
        boolean matches1 = new User().passwordEncoder().matches(password, encoded1);
        boolean matches2 = new User().passwordEncoder().matches(password, encoded2);
        boolean matches3 = new User().passwordEncoder().matches(password, encoded3);
        System.out.println("matches = " + matches1);
        System.out.println("matches = " + matches2);
        System.out.println("matches = " + matches3);
        System.out.println("encoded = " + encoded1);
        System.out.println("encoded = " + encoded2);
        System.out.println("encoded = " + encoded3);
        assertTrue(matches1);
        assertTrue(matches2);
        assertTrue(matches3);
    }

    @Test
     // 회원객체를 만들어서
     // 가입 메소드를 진행했을 때
     // 회원 조회가 잘되는가
    void signUp() {

        UserDto userDto = new UserDto();
        userDto.setUserTypeCode("P");
        userService.inputUserTypeCodeAndUserId(userDto);
        userDto.setPassword(userService.passwordEncoder("qwer!@#$"));

        userDto.setName("asrai");
        userDto.setLoginId("asraiID");
        userDto.setPhone("010-1234-5678");
        userDto.setEmail("XXXXXXXXXXXXXXX");
        userDto.setSocialTypeCode(SocialType.NONE);
        userDto.setSmsAgree("Y");
        userDto.setEmailAgree("Y");
        String userId = userService.signUp(userDto).get("userId");
        Optional<User> userOptional = userRepository.findByLoginId("asraiID");
        if (!userOptional.isPresent()) {
            return;
        }

        String findUserId = userOptional.get().getUserId();

        System.out.println("userId = " + userId);
        System.out.println("findUserId = " + findUserId);

        assertEquals(userId, findUserId);
    }
    
    @Test
    // 같은 loginId로 한 명이 먼저 가입하고
    // 다음에 같은 loginId로 아이디를 생성하려 할 때
    // 첫번째 사람은 중복이 아니고, 두번째 사람은 중복이어야 한다.
    void idDuplicated() {
        UserDto userDto = new UserDto();
        userDto.setName("asrai");
        userDto.setLoginId("asrai001");
        userDto.setPassword("qwer!@#$");
        userDto.setPhone("010-1234-5678");
        userDto.setEmail("asrai@asrai.com");
        userDto.setUserTypeCode("P");
        userDto.setSocialTypeCode(SocialType.NONE);
        userDto.setSmsAgree("Y");
        userDto.setEmailAgree("Y");
        boolean check1 = userService.duplicatedLoginId("asrai001");
        String userId = userService.signUp(userDto).get("userId");
        System.out.println("check1 = " + check1);
        System.out.println("userId = " + userId);
        assertFalse(check1);

        Optional<Patient> patientOptional = patientRepository.findById(userId);
        assertThat(patientOptional.get().getLoginId()).isEqualTo("asrai001");

        boolean check2 = userService.duplicatedLoginId("asrai001");
        System.out.println("check2 = " + check2);
        assertTrue(check2);
    }

    @Test
    // 인증코드를 생성했을 때
    // 잘 생성되는가
    void createCertCode() {
        String certCode = userService.createCertCode();
        System.out.println("code = " + certCode);
        assertNotNull(certCode);
    }

    @Test
    // 휴대폰 인증을 하기 위해 휴대폰 번호를 입력해서 발급 받았을 때
    // 인증번호를 확인하여 입력하면
    // 동일한 번호를 입력했을 때 true가 반환되는가
    void checkPhoneCertCode() {
        String certCode = userService.createPhoneCertCode("010-1234-5678");

        PhoneCertCode phoneCertCode = new PhoneCertCode();
        phoneCertCode.setPhone("010-1234-5678");
        phoneCertCode.setPhoneCertCode(certCode);
        boolean checked = userService.checkPhoneCode(phoneCertCode);

        System.out.println("checked = " + checked);
        assertTrue(checked);
    }

}