package com.asrai.joinit.admin;

import com.asrai.joinit.domain.Admin;
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
