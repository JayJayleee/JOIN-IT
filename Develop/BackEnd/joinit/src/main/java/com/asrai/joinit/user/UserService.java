package com.asrai.joinit.user;

import com.asrai.joinit.domain.User;
import com.asrai.joinit.domain.UserCertCode;

public interface UserService {

    /**
     * 회원가입
     * @param user
     * @return
     */
    String signUp(User user);

    /**
     * ID 중복검사
     * @param loginId
     * @return
     */
    boolean duplicateCheckById(String loginId);

    /**
     * 휴대폰 인증번호 생성 및 전송
     * @param phone
     */
    void createPhoneCertCode(String phone);

    /**
     * 휴대폰 인증번호 확인
     * @param userCertCode
     * @return
     */
    boolean checkPhoneCode(UserCertCode userCertCode);

    /**
     * 이메일 인증번호 생성 및 전송
     * @param email
     */
    void createEmailCertCode(String email);

    /**
     * 이메일 인증번호 확인
     * @param userCertCode
     * @return
     */
    boolean checkEmailCode(UserCertCode userCertCode);

    /**
     * 일반 로그인
     * @param user
     * @param accessToken
     * @return
     */
    String login(User user, String accessToken);

    // 소셜 로그인

    /**
     * 인증번호 확인 후 ID 알려주기
     * @param userCertCode
     * @return
     */
    String responseIdAfterCert(UserCertCode userCertCode);

    /**
     * PW 수정
     * @param loginId
     * @param password
     */
    boolean changePassword(String loginId, String password);

    /**
     * 비밀번호 검사
     * @param loginId
     * @param password
     * @return
     */
    boolean checkPassword(String loginId, String password);

    /**
     * 로그아웃
     * @param loginId
     */
    void logout(String loginId);

    /**
     * 회원
     * @param loginId
     */
    boolean signout(String loginId);
}
