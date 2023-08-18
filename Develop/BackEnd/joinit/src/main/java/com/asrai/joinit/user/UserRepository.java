package com.asrai.joinit.user;

import com.asrai.joinit.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String>, UserRepositoryCustom {

    Optional<User> findByLoginId(String loginId);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    Optional<User> findByRefreshToken(String refreshToken);

    Optional<User> findBySocialTypeCodeAndSocialId(SocialType socialTypeCode, String socialId);

    @Query("select u.loginId from User u where u.name = :name and u.email = :email")
    String findIdByNameAndEmail(@Param("name") String name, @Param("email") String email);

    Integer countByLoginId(@Param("loginId") String loginId);

    @Query("select count(u) from User u where u.name = :name and u.email = :email")
    Integer checkExistNameByEmail(@Param("name") String name, @Param("email") String email);

    @Query("select count(u) from User u where u.loginId = :loginId and u.email = :email")
    Integer checkExistLonginIdByEmail(@Param("loginId") String loginId, @Param("email") String email);

//    User findByUserId(String userId);

    Optional<User> findByUserId(String userId);

    @Query("update User u set u.password = :password where u.loginId = :loginId")
    Integer savePassword(@Param("loginId") String loginId, @Param("password") String password);

    @Query("select u from User u where u.socialTypeCode = :socialType and u.socialId = :socialId")
    Optional<User> findBySocialTypeAndSocialId(@Param("socialType") SocialType socialType, @Param("socialId") String socialId);

}
