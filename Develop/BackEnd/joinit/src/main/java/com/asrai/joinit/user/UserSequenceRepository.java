package com.asrai.joinit.user;

import com.asrai.joinit.domain.UserSequence;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserSequenceRepository extends JpaRepository<UserSequence, Long> {

    @Query("select u from UserSequence u where u.pkSeq = 1")
    Optional<UserSequence> findUserSequence();

    @Query(value = "select patient_seq from user_sequence where pk_seq = 1", nativeQuery = true)
    String findLastSeqPatients();

    @Query(value = "select therapist_seq from user_sequence where pk_seq = 1", nativeQuery = true)
    String findLastSeqTherapists();

}
