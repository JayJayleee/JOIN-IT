package com.asrai.joinit.user.therapist;

import com.asrai.joinit.domain.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TherapistRepository extends JpaRepository<Therapist, String>, TherapistRepositoryCustom {

}
