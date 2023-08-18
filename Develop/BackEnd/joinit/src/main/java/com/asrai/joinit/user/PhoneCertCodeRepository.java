package com.asrai.joinit.user;

import com.asrai.joinit.domain.PhoneCertCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PhoneCertCodeRepository extends JpaRepository<PhoneCertCode, Long> {

    @Query("select p from PhoneCertCode p where p.phone = :phone")
    PhoneCertCode findByPhone(@Param("phone") String phone);


    @Query("select count(p) from PhoneCertCode p where p.phone = :phone and p.phoneCertCode = :code")
    Integer findByPhoneAndCode(@Param("phone") String phone, @Param("code") String code);
}
