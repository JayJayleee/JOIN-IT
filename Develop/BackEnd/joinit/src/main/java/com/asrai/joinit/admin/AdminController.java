package com.asrai.joinit.admin;

import com.asrai.joinit.domain.Admin;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

	//생성자 주입
	private AdminService adminService;


	@PostMapping("/login")
	public String adminLogin(@RequestBody Admin admin){
		if(adminService.findAdminAccount(admin)){
			return "관리자 로그인 성공..";
		}else {
			return "관리자 로그인 실패..";
		}

	}
	//관리자 로그인.. 반환값이 뭐 없음
}
