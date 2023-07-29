package com.asrai.joinit.joint;

import com.asrai.joinit.domain.Joint;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JointRepository {

	private final EntityManager em;

	public List<Joint> findJointList() {
		return em.createQuery("select j from Joint j", Joint.class).getResultList();
	}
	//환부 전체 리스트 조회

}
