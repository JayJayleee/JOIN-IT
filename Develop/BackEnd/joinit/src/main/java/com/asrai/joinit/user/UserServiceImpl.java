package com.asrai.joinit.user;

import com.asrai.joinit.config.WebSecurityConfig;
import com.asrai.joinit.domain.EmailCertCode;
import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.PhoneCertCode;
import com.asrai.joinit.domain.Therapist;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.domain.UserSequence;
import com.asrai.joinit.dto.UserDto;
import com.asrai.joinit.user.patient.PatientRepository;
import com.asrai.joinit.user.therapist.TherapistRepository;
import com.asrai.joinit.util.jwt.JwtService;
import com.asrai.joinit.util.mail.MailDto;
import com.asrai.joinit.util.mail.MailService;
import jakarta.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserSequenceRepository userSequenceRepository;
    private final PhoneCertCodeRepository phoneCertCodeRepository;
    private final EmailCertCodeRepository emailCertCodeRepository;
    private final PatientRepository patientRepository;
    private final TherapistRepository therapistRepository;
    private final MailService mailService;
    private final EntityManager em;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Map<String, String> signUp(UserDto userDto) {

        Map<String, String> resultMap = new HashMap<>();

        userDto.setSocialTypeCode(SocialType.NONE); // 일반회원 코드 저장
        String userTypeCode = inputUserTypeCodeAndUserId(userDto); // userId과 userType 저장

        if (!userDto.getPassword().isEmpty()) {
            userDto.setPassword(passwordEncoder(userDto.getPassword())); // 비밀번호 암호화
        } else {
            resultMap.put("error", "비밀번호가 존재하지 않습니다.");
            return resultMap;
        }
        log.info("password : {}", userDto.getPassword());

        Optional<User> byEmail = userRepository.findByEmail(userDto.getEmail());
        if (byEmail.isPresent()) {
            resultMap.put("error", "이미 존재하는 이메일입니다.");
            return resultMap;
        }

        Optional<User> byPhone = userRepository.findByPhone(userDto.getPhone());
        if (byPhone.isPresent()) {
            resultMap.put("error", "이미 존재하는 핸드폰 번호입니다.");
            return resultMap;
        }

        String userId = saveUser(userTypeCode, userDto);
        resultMap.put("userId",userId);

        return resultMap;
    }

    @Transactional
    public String inputUserTypeCodeAndUserId(UserDto userDto) {

        String userId = "";
        String lastNumber = "";
        String userCodeNumber = "";
        String userTypeCode = userDto.getUserTypeCode();
        UserSequence userSequence = new UserSequence(1);

        if (userTypeCode.equals("P")) {
            userId = "P";
            lastNumber = String.valueOf(Integer.parseInt(userSequenceRepository.findLastSeqPatients()) + 1);
            userCodeNumber = getUserCodeNumber(lastNumber).toString();
            userDto.setUserTypeCode("M01"); // 일반환자
            userSequence.setPatientSeq(userCodeNumber);
            userSequence.setTherapistSeq(userSequenceRepository.findLastSeqTherapists());
        } else if (userTypeCode.equals("T")) {
            userId = "T";
            lastNumber = String.valueOf(Integer.parseInt(userSequenceRepository.findLastSeqTherapists()) + 1);
            userCodeNumber = getUserCodeNumber(lastNumber).toString();
            // 테스트 후 M05-미승인 치료사로 변경
            userDto.setUserTypeCode("M04"); //지금은 승인 치료사로 바로 승인처리
            userSequence.setTherapistSeq(userCodeNumber);
            userSequence.setPatientSeq(userSequenceRepository.findLastSeqPatients());
        }
        userSequenceRepository.save(userSequence);
        userId += userCodeNumber;
        userDto.setUserId(userId);
        log.info("userId : {}", userId);

        return userTypeCode;
    }

    @Transactional
    public String saveUser(String userTypeCode, UserDto userDto) {

        if (userTypeCode.equals("P")) {
            Patient user = new Patient(
                userDto.getUserId(),
                userDto.getName(),
                userDto.getLoginId(),
                userDto.getPassword(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getUserTypeCode(),
                userDto.getRole(),
                userDto.getSocialTypeCode(),
                userDto.getSocialId(),
                userDto.getSmsAgree(),
                userDto.getEmailAgree()
            );
            user.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
            user.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
            patientRepository.save(user);
        } else if (userTypeCode.equals("T")) {
            Therapist user = new Therapist(
                userDto.getUserId(),
                userDto.getName(),
                userDto.getLoginId(),
                userDto.getPassword(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getUserTypeCode(),
                userDto.getRole(),
                userDto.getSocialTypeCode(),
                userDto.getSocialId(),
                userDto.getSmsAgree(),
                userDto.getEmailAgree()
            );
            user.setCreateTime(Timestamp.valueOf(LocalDateTime.now()));
            user.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));
            therapistRepository.save(user);
        }

        return userDto.getUserId();
    }

    @Override
    public boolean duplicatedLoginId(String loginId) {

        Integer count = userRepository.countByLoginId(loginId);
        if (count > 0) { // 중복이라는 뜻
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public String createPhoneCertCode(String phone) {

        // 인증코드 생성
        String certCode = createCertCode();

        // 해당 핸드폰 번호에 인증번호가 존재하는지 확인
        PhoneCertCode phoneCertCode = phoneCertCodeRepository.findByPhone(phone);

        if (phoneCertCode != null) { // 휴대폰 번호가 DB에 있다면 수정만 하고
            phoneCertCode.setPhoneCertCode(certCode);
            phoneCertCodeRepository.save(phoneCertCode);
        } else { // DB에 없다면 새로 삽입해야 한다
            PhoneCertCode newPhoneCertCode = new PhoneCertCode();
            newPhoneCertCode.setPhone(phone);
            newPhoneCertCode.setPhoneCertCode(certCode);
            log.info("phoneCertCode : {}", newPhoneCertCode);
            phoneCertCodeRepository.save(newPhoneCertCode);
        }

        return certCode;
    }


    @Override
    public boolean checkPhoneCode(PhoneCertCode phoneCertCode) {

        log.info("phoneCertCode : {}", phoneCertCode);

        Integer exist = phoneCertCodeRepository.findByPhoneAndCode(phoneCertCode.getPhone()
            , phoneCertCode.getPhoneCertCode());

        if (exist == 1) { // 데이터가 조회되면 있는 것이다.
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean createEmailCertCode(String name, String loginId, String email) {

        // loginId가 없으면 ID 찾기, name이 없으면 PW 찾기의 인증이다.
        // User 테이블에 name & email 이 존재하거나 loginId & email이 존재할 때만 번호를 생성하여 발급한다.

        Integer count = null;

        if (loginId == null) {
            count = userRepository.checkExistNameByEmail(name, email);
        } else if (name == null){
            count = userRepository.checkExistLonginIdByEmail(loginId, email);
        } else {
            return false;
        }

        if (count <= 0) {
            return false;
        }

        em.flush();
        em.clear();

        // 해당 이메일에 인증번호가 존재하는지 확인
        EmailCertCode emailCertCode = emailCertCodeRepository.findByEmail(email);

        // 인증코드 생성
        String certCode = createCertCode();
//        String certCode = "1234";

        if (emailCertCode != null) {
            emailCertCode.setEmailCertCode(certCode);
        } else {
            EmailCertCode inputCertCode = new EmailCertCode();
            inputCertCode.setEmail(email);
            inputCertCode.setEmailCertCode(certCode);
            emailCertCodeRepository.save(inputCertCode);
        }

        // ++ 이메일로 인증번호 전송
        mailService.mailSend(new MailDto(email, certCode));

        return true;

    }

    @Override
    public boolean checkEmailCode(EmailCertCode emailCertCode) {

        Integer exist = emailCertCodeRepository.findByEmailAndCode(emailCertCode.getEmail(), emailCertCode.getEmailCertCode());

        if (exist == 1) { // 일치하여 존재하면 true
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public Map<String, String> login(Map<String, String> loginData) {

        Map<String, String> map = new HashMap<>();

        Optional<User> user = userRepository.findByLoginId(loginData.get("loginId"));
        if (!user.isPresent()) {
            map.put("error", "존재하지 않는 로그인 ID");
            return map;
        }

        // 치료사, 환자 검증
        String clientuserType = loginData.get("userType");
        String serverUserType = user.get().getUserId().substring(0, 1);
        if (!clientuserType.equals(serverUserType)) {
            map.put("error", "회원의 유형이 일치하는지 확인 부탁드립니다.");
            return map;
        }

        String userPk = user.get().getUserId();

        boolean matches = this.checkPassword(loginData.get("loginId"), loginData.get("password"));

        // ++ JWT 작업 추가
        if (matches) {
            map.put("userPk", userPk);
            String accessToken = jwtService.createAccessToken(userPk);
            String refreshToken = jwtService.createRefreshToken();
            map.put("accessToken", accessToken);
            map.put("refreshToken", refreshToken);
            userRepository.updateRefreshToken(userPk, refreshToken);
            return map;
        } else {
            map.put("error", "비밀번호가 틀렸습니다.");
            return map;
        }
    }

    // ---------
    // 소셜 로그인 추가 예정
    // ---------
    
    @Override
    public String responseIdByNameAndEmail(String name, String email) {
        log.info("name : {}, email : {}", name, email);
        String userId = userRepository.findIdByNameAndEmail(name, email);
        log.info("userId : {}", userId);
        return userId;
    }

    @Override
    @Transactional
    public boolean changePassword(String loginId, String password) {

        Optional<User> userOptional = userRepository.findByLoginId(loginId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User user = userOptional.get();
        user.setPassword(passwordEncoder(password));

        return true;
    }

    @Override
    public boolean checkPassword(String loginId, String password) {
        Optional<User> userOptional = userRepository.findByLoginId(loginId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User userInfo = userOptional.get();
        boolean matches = new User().passwordEncoder()
            .matches(password, userInfo.getPassword());
        log.info("matches : {}", matches);
        return matches;
    }

    @Override
    @Transactional
    public boolean logout(String userId) {
        int rows = userRepository.logOutUser(userId);
        if (rows == 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    @Transactional
    public boolean signout(String userId) {

        Timestamp endTime = Timestamp.valueOf(LocalDateTime.now().plusDays(30));

        int rows = userRepository.signOutUser(userId, endTime);
        if (rows == 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean duplicatedEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return true;
        }
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
        return new User().passwordEncoder().encode(password);
    }

    public static String createCertCode() {
        Integer certCode = (int) (Math.random() * 900000) + 100000; //code
        return certCode.toString();
    }


}
