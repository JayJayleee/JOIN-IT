package com.asrai.joinit.user;

import com.asrai.joinit.config.WebSecurityConfig;
import com.asrai.joinit.domain.EmailCertCode;
import com.asrai.joinit.domain.PhoneCertCode;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.domain.UserSequence;
import com.asrai.joinit.exception.UserTypeException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Slf4j
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserSequenceRepository userSequenceRepository;
    private final PhoneCertCodeRepository phoneCertCodeRepository;
    private final EmailCertCodeRepository emailCertCodeRepository;

    @Override
    public String signUp(User user) throws UserTypeException {

        String userId = "";
        String lastNumber = "";
        String userCodeNumber = "";
        String userTypeCode = user.getUserTypeCode();
        UserSequence userSequence = new UserSequence(1);

        // userId 생성
        if (userTypeCode.equals("P")) {
            userId = "P";
            lastNumber = String.valueOf(Integer.parseInt(userSequenceRepository.findLastSeqPatients()) + 1);
            userCodeNumber = getUserCodeNumber(lastNumber).toString();
            userSequence.setPatientSeq(userCodeNumber);
            userSequence.setTherapistSeq(userSequenceRepository.findLastSeqTherapists());
        } else if (userTypeCode.equals("T")) {
            userId = "T";
            lastNumber = String.valueOf(Integer.parseInt(userSequenceRepository.findLastSeqTherapists()) + 1);
            userCodeNumber = getUserCodeNumber(lastNumber).toString();
            userSequence.setTherapistSeq(userCodeNumber);
            userSequence.setPatientSeq(userSequenceRepository.findLastSeqPatients());
        } else {
            throw new UserTypeException();
        }

        userSequenceRepository.save(userSequence);
        userId += userCodeNumber;
        user.setUserId(userId);
        log.info("userId : {}", userId);

        // 비밀번호 암호화
        user.setPassword(passwordEncoder(user.getPassword()));
        log.info("password : {}", user.getPassword());

        // user 저장
        userRepository.save(user);

        return userId;
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean notDuplicatedLoginId(String loginId) {

        User user = userRepository.findByLoginId(loginId);
        if (user == null) { // 조회되지 않으면 중복이 없다.
            return true;
        }
        return false;
    }

    @Override
    public void createPhoneCertCode(String phone) {

        // 해당 핸드폰 번호에 인증번호가 존재하는지 확인
        PhoneCertCode phoneCertCode = phoneCertCodeRepository.findByPhone(phone);

        // 인증코드 생성
        String certCode = createCertCode();

        if (phoneCertCode != null) {
            phoneCertCode.setPhoneCertCode(certCode);
            phoneCertCodeRepository.save(phoneCertCode);
            return;
        }

        phoneCertCode.setPhone(phone);
        phoneCertCode.setPhoneCertCode(certCode);
        phoneCertCodeRepository.save(phoneCertCode);
        
        // ++ 인증번호 전송

    }


    @Override
    public boolean checkPhoneCode(PhoneCertCode phoneCertCode) {

        PhoneCertCode exist = phoneCertCodeRepository
            .findByPhoneAndCode(phoneCertCode.getPhone()
                , phoneCertCode.getPhoneCertCode());

        log.info("phoneCertCode : {}, {}", phoneCertCode.getPhone()
            , phoneCertCode.getPhoneCertCode());

        if (exist != null) {
            return true;
        }
        return false;
    }

    @Override
    public void createEmailCertCode(String email) {

        // 해당 이메일에 인증번호가 존재하는지 확인
        EmailCertCode emailCertCode = emailCertCodeRepository.findByEmail(email);

        // 인증코드 생성
        String certCode = createCertCode();

        if (emailCertCode != null) {
            emailCertCode.setEmailCertCode(certCode);
            emailCertCodeRepository.save(emailCertCode);
            return;
        }

        emailCertCode.setEmail(email);
        emailCertCode.setEmailCertCode(certCode);
        emailCertCodeRepository.save(emailCertCode);

        // ++ 인증번호 전송

    }

    @Override
    public boolean checkEmailCode(EmailCertCode emailCertCode) {
        EmailCertCode exist = emailCertCodeRepository
            .findByEmailAndCode(emailCertCode.getEmail()
                , emailCertCode.getEmailCertCode());

        log.info("emailCertCode : {}, {}", emailCertCode.getEmail()
            , emailCertCode.getEmailCertCode());

        if (exist != null) {
            return true;
        }
        return false;
    }

    @Override
    public Map<String, String> login(User user, String accessToken,  String refreshToken) {

        boolean matches = this.checkPassword(user.getLoginId(), user.getPassword());
        
        // ++ JWT 작업 추가
        if (matches) {
            Map<String, String> map = new HashMap<>();
            map.put("accessToken", accessToken);
            map.put("refreshToken", refreshToken);
            return map;
        } else {
            return null;
        }
    }

    // ---------
    // 소셜 로그인 추가 예정
    // ---------
    
    @Override
    public String responseIdAfterCert(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean changePassword(String loginId, String password) {
        User user = new User();
        user.setLoginId(loginId);
        user.setPassword(passwordEncoder(password));
        User save = userRepository.save(user);
        return save != null;
    }

    @Override
    public boolean checkPassword(String loginId, String password) {
        User userInfo = userRepository.findByLoginId(loginId);
        boolean matches = new WebSecurityConfig()
            .passwordEncoder()
            .matches(password, userInfo.getPassword());
        log.info("matches : {}", matches);

        return matches;
    }

    @Override
    public void logout(String loginId) {

    }

    @Override
    public boolean signout(String loginId) {
        return false;
    }

    private static StringBuilder getUserCodeNumber(String lastNumber) {
        StringBuilder zero = new StringBuilder();
        for (int i = 0; i < 10 - lastNumber.length(); i++) {
            zero.append("0");
        }
        zero.append(lastNumber);
        return zero;
    }

    public static String passwordEncoder(String password) {
        return new WebSecurityConfig().passwordEncoder().encode(password);
    }

    private static String createCertCode() {
        UUID uuid = UUID.randomUUID();
        String certCode = uuid.toString().substring(0, 6);
        return certCode;
    }


}
