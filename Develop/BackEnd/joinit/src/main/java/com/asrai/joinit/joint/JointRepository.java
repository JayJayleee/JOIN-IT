package com.asrai.joinit.joint;

import com.asrai.joinit.domain.Joint;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class JointRepository {

	@PersistenceContext private EntityManager em;

	public List<Joint> findJointList() {
		return em.createQuery("select j from Joint j", Joint.class).getResultList();
	}
	//환부 전체 리스트 조회

}
