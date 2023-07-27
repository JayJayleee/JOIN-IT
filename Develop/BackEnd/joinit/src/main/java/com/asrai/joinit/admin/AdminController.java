package com.asrai.joinit.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

	
	//환부_운동종류 리스트 조회

	//운동 등록
//	@PostMapping(/)

	//운동 리스트 조회

	@PostMapping("/login")
	public String adminLogin(@RequestBody AdminLoginVO adminLoginVO){
		System.out.println("Asd");
		System.out.println(adminLoginVO);
		return "123123";
	}
}
