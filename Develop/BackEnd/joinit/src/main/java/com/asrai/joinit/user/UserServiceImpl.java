package com.asrai.joinit.user;

import com.asrai.joinit.domain.User;
import com.asrai.joinit.domain.UserCertCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Slf4j
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public String signUp(User user) {
        return null;
    }

    @Override
    public boolean duplicateCheckById(String loginId) {
        return false;
    }

    @Override
    public void createPhoneCertCode(String phone) {

    }

    @Override
    public boolean checkPhoneCode(UserCertCode userCertCode) {
        return false;
    }

    @Override
    public void createEmailCertCode(String email) {

    }

    @Override
    public boolean checkEmailCode(UserCertCode userCertCode) {
        return false;
    }

    @Override
    public String login(User user, String accessToken) {
        return null;
    }

    @Override
    public String responseIdAfterCert(UserCertCode userCertCode) {
        return null;
    }

    @Override
    public boolean changePassword(String loginId, String password) {
        return false;
    }

    @Override
    public boolean checkPassword(String loginId, String password) {
        return false;
    }

    @Override
    public void logout(String loginId) {

    }

    @Override
    public boolean signout(String loginId) {
        return false;
    }
}
