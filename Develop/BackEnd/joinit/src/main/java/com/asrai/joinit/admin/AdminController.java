package com.asrai.joinit.admin;

import com.asrai.joinit.domain.Admin;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.exception.UserTypeException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    //생성자 주입
    private final AdminService adminService;

    //관리자 회원 가입 금지..
//	@PostMapping
//	public ResponseEntity<String> signUp(@RequestBody Admin admin) {
//		log.debug(admin.toString());
//		String adminId;
//		adminId = adminService.signUp(admin);
//		return ResponseEntity.ok(adminId);
//	}


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Admin admin
        , @RequestBody(required = false) String accessToken
        , @RequestBody(required = false) String refreshToken
    ) {

        Map<String, String> adminInfo = adminService.login(admin, accessToken, refreshToken);
        if (adminInfo != null) {
            return ResponseEntity.ok(adminInfo);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
    //관리자 로그인
}
