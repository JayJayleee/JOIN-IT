package com.asrai.joinit.admin;

import static com.asrai.joinit.user.UserServiceImpl.passwordEncoder;

import com.asrai.joinit.config.WebSecurityConfig;
import com.asrai.joinit.domain.Admin;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.domain.UserSequence;
import com.asrai.joinit.exception.UserTypeException;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Slf4j
@Transactional
@RequiredArgsConstructor
public class AdminService {

	//생성자 주입
	private final AdminRepository adminRepository;



	public String signUp(Admin admin) {

		// 비밀번호 암호화
		admin.setPassword(passwordEncoder(admin.getPassword()));
		log.info("password : {}", admin.getPassword());
		log.debug(admin.toString());
		adminRepository.save(admin);

		return admin.getAdminId();
	}

	public Map<String, String> login(Admin admin, String accessToken, String refreshToken) {

		boolean matches = this.checkPassword(admin.getAdminId(), admin.getPassword());

		// ++ JWT 작업 추가
		if (matches) {
			Map<String, String> map = new HashMap<>();
			if(accessToken == null){
				accessToken = "123";
			}
			if(refreshToken == null){
				refreshToken = "456";
			}
			map.put("accessToken", accessToken);
			map.put("refreshToken", refreshToken);
			map.put("userPk", "admin");
			return map;
		} else {
			return null;
		}
//		return
	}

	public boolean checkPassword(String adminId, String password) {
		Admin adminInfo = adminRepository.findByAdminId(adminId);
		boolean matches = new User()
			.passwordEncoder()
			.matches(password, adminInfo.getPassword());
		log.info("matches : {}", matches);

		return matches;
	}

}
