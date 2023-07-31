package com.asrai.joinit.user;

import com.asrai.joinit.domain.PhoneCertCode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PhoneCertCodeRepository extends JpaRepository<PhoneCertCode, Long> {

    @Query("select p from PhoneCertCode p where p.phone = :phone")
    PhoneCertCode findByPhone(String phone);


    @Query("select p from PhoneCertCode p where p.phone = :phone and p.phoneCertCode = :code")
    PhoneCertCode findByPhoneAndCode(String phone, String code);
}
