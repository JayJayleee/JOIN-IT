package com.asrai.joinit.user.therapist;

import com.asrai.joinit.domain.User;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepositoryTmp {

    private final EntityManager em;


    //환자 이름, 전화번호 입력해서 환자 id 반환
    public User findUser(String userId) {
        return (User)em
            .createNativeQuery("select * from user u where u.user_id = " + userId)
            .getSingleResult();
    }
}
