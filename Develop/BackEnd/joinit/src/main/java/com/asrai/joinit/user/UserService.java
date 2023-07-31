package com.asrai.joinit.user;

import com.asrai.joinit.domain.EmailCertCode;
import com.asrai.joinit.domain.PhoneCertCode;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.exception.UserTypeException;
import java.util.Map;

public interface UserService {

    /**
     * 회원가입
     * @param user : name loginId password phone email userTypeCode smsAgree emailAgree
     *             password는 암호화하여 DB에 저장한다.
     * @return userId : 회원 코드역할을 하는 ID를 생성하여 반환 (로그인 ID랑 다름)
     */
    String signUp(User user) throws UserTypeException;

    /**
     * ID 중복검사
     * @param loginId : 로그인할 때 사용하는 ID가 이미 사용 중인지 확인
     * @return boolean : 사용여부 반환
     */
    boolean notDuplicatedLoginId(String loginId);

    /**
     * 휴대폰 인증번호 생성 및 전송
     * @param phone : 인증번호를 생성하여 DB에 (phone, certCode)를 저장한 후에, 해당 phone 번호로 인증번호를 전송한다.
     */
    void createPhoneCertCode(String phone);

    /**
     * 휴대폰 인증번호 확인
     * @param phoneCertCode : (phone, certCode)를 전달받아서 DB와 동일한지 확인한다.
     * @return boolean : 일치여부 반환
     */
    boolean checkPhoneCode(PhoneCertCode phoneCertCode);

    /**
     * 이메일 인증번호 생성 및 전송
     * @param email : 인증번호를 생성하여 DB에 (email, certCode)를 저장한 후에, 해당 email로 인증번호를 전송한다.
     */
    void createEmailCertCode(String email);

    /**
     * 이메일 인증번호 확인
     * @param emailCertCode : (email, certCode)를 전달받아서 DB와 동일한지 확인한다.
     * @return boolean : 일치여부 반환
     */
    boolean checkEmailCode(EmailCertCode emailCertCode);

    /**
     * 일반 로그인
     * @param user : loginId, password - PW는 암호화하여 DB에 저장되어있는 값과 비교
     *             만일 탈퇴 예정 코드를 지닌 사용자가 재로그인을 한다면 정상 사용자 코드로 변경하고 탈퇴일을 null로 변경한다.
     * @param accessToken : accessToken
     * @param refreshToken : refreshToken
     * @return : userId, accessToken, refreshToken
     */
    Map<String, String> login(User user, String accessToken, String refreshToken);

    // ---------
    // 소셜 로그인 추가 예정
    // ---------

    /**
     * 인증번호 확인 후 로그인 ID 알려주기
     * @param email : email로 User DB를 확인하여 해당하는 loginId 반환
     * @return loginId
     */
    String responseIdAfterCert(String email);

    /**
     * PW 수정
     * @param loginId : 해당 로그인 ID의 PW를 수정할 것인데
     * @param password : 들어온 PW를 암호화하여 수정한다.
     */
    boolean changePassword(String loginId, String password);

    /**
     * 탈퇴하기 전, 비밀번호 검사
     * @param loginId : 해당 로그인 ID의
     * @param password : PW를 입력받아서 암호화했을 때 DB와 동일한지 확인
     * @return boolean : 동일여부 반환
     */
    boolean checkPassword(String loginId, String password);

    /**
     * 로그아웃
     * @param loginId : 로그인 ID 로그아웃. 해당 ID의 refreshToken DB에서 삭제한다.
     */
    void logout(String loginId);

    /**
     * 회원
     * @param loginId : 해당 로그인 ID의 상태코드를 탈퇴 예정 코드로 수정하고, 탈퇴일을 현재 날짜의 +30일로 만든다.
     *                탈퇴일이 된다면 개인정보를 쓰레기값으로 바꾸며, 치료/처방 데이터는 유지한다.
     *                만일 탈퇴 예정 코드를 지닌 사용자가 재로그인을 한다면 정상 사용자 코드로 변경하고 탈퇴일을 null로 변경한다.
     */
    boolean signout(String loginId);
}
