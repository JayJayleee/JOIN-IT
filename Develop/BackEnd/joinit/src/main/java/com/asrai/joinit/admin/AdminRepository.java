package com.asrai.joinit.admin;


import com.asrai.joinit.Training.JointTrainingMapping;
import com.asrai.joinit.domain.Admin;
import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {

	@PersistenceContext
	private EntityManager em;

	public boolean findAdminAccount(Admin admin){
		Map<String, Object> map = new HashMap<>();
		map.put("password", admin.getPassword());
		Admin admin1 = em.find(Admin.class, admin.getAdminId(), map);
		if(admin1 != null){
			return true;
		} else {
			return false;
		}
	}
	//관리자 로그인.. 일단 암호화 없이 row 데이터 입력


}
