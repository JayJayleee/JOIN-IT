package com.asrai.joinit.treatment;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TreatmentRepository {

	private final EntityManager em;




}
