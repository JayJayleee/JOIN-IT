package com.asrai.joinit.user;

import static org.junit.jupiter.api.Assertions.*;

import com.asrai.joinit.config.WebSecurityConfig;
import com.asrai.joinit.domain.User;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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
        boolean matches1 = new WebSecurityConfig().passwordEncoder().matches(password, encoded1);
        boolean matches2 = new WebSecurityConfig().passwordEncoder().matches(password, encoded2);
        boolean matches3 = new WebSecurityConfig().passwordEncoder().matches(password, encoded3);
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
        User user = new User();
        user.setName("asrai");
        user.setLoginId("asraiID");
        user.setPassword("qwer!@#$");
        user.setPhone("010-1234-5678");
        user.setEmail("asrai@asrai.com");
        user.setUserTypeCode("P");
        user.setSocialTypeCode("M01");
        user.setSmsAgree("Y");
        user.setEmailAgree("Y");
        String userId = userService.signUp(user);
        String findUserId = userRepository.findByLoginId("asraiID").getUserId();

        System.out.println("userId = " + userId);
        System.out.println("findUserId = " + findUserId);

        assertEquals(userId, findUserId);
    }


}