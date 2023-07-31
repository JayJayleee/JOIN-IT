package com.asrai.joinit.user;

import com.asrai.joinit.domain.EmailCertCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmailCertCodeRepository extends JpaRepository<EmailCertCode, Long> {

    @Query("select e from EmailCertCode e where e.email = :email")
    EmailCertCode findByEmail(String email);

    @Query("select e from EmailCertCode e where e.email = :email and e.emailCertCode = :emailCertCode")
    EmailCertCode findByEmailAndCode(String email, String emailCertCode);
}
