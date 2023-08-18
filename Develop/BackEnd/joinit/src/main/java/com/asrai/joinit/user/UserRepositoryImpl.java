package com.asrai.joinit.user;

import static com.asrai.joinit.domain.QPatient.patient;
import static com.asrai.joinit.domain.QUser.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.LocalDateTime;


public class UserRepositoryImpl implements UserRepositoryCustom {


    JPAQueryFactory jpaQueryFactory;

    public UserRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public void updateRefreshToken(String userId, String refreshToken) {
        long execute = jpaQueryFactory
            .update(user)
            .set(user.refreshToken, refreshToken)
            .where(user.userId.eq(userId))
            .execute();
    }

    @Override
    public int logOutUser(String userId) {
        return (int) jpaQueryFactory
            .update(user)
            .set(user.refreshToken, "")
            .where(user.userId.eq(userId))
            .execute();
    }

    @Override
    public int signOutUser(String userId, Timestamp endTime) {

        String userType = userId.substring(0, 1);
        String userTypeCode = "";
        if (userType.equals("P")) {
            userTypeCode = "M02";
        } else {
            userTypeCode = "M06";
        }


        return (int) jpaQueryFactory
            .update(patient)
            .set(patient.endTime, endTime)
            .set(patient.refreshToken, "")
            .set(patient.userTypeCode, userTypeCode)
            .where(patient.userId.eq(userId))
            .execute();
    }
}
