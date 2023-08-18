package com.asrai.joinit.user;

import com.asrai.joinit.domain.EmailCertCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmailCertCodeRepository extends JpaRepository<EmailCertCode, Long> {

    @Query("select e from EmailCertCode e where e.email = :email")
    EmailCertCode findByEmail(@Param("email") String email);

    @Query("select count(e) from EmailCertCode e where e.email = :email and e.emailCertCode = :emailCertCode")
    Integer findByEmailAndCode(@Param("email") String email, @Param("emailCertCode") String emailCertCode);
}
