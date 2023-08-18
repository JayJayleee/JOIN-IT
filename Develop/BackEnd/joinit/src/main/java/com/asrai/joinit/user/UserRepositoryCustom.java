package com.asrai.joinit.user;

import java.sql.Timestamp;

public interface UserRepositoryCustom {

    void updateRefreshToken(String userId, String refreshToken);

    int logOutUser(String userId);

    int signOutUser(String userId, Timestamp endTime);
}
