package com.asrai.joinit.admin;

import com.asrai.joinit.Training.JointTrainingMapping;
import com.asrai.joinit.domain.Admin;
import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

	//생성자 주입
	private final AdminRepository adminRepository;


	public boolean findAdminAccount(Admin admin){
		return adminRepository.findAdminAccount(admin);

	}

}
