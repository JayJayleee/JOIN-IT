package com.asrai.joinit.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequestMapping("/login/oauth2/code")
public class OAuthLoginController {

    @GetMapping("/naver")
    public String naverLogin(@RequestParam String code) {

        log.info("code : {}", code);
        log.info("일단 Redirct는 된다.");

        return "네이버로 소셜로그인 했을 때 뜨는 창. 추후 api를 지우고, front에서 화면이 보여지도록 하자";
    }

    @GetMapping("/kakao")
    public String kakaoLogin() {
        return "redirect:/oauth2/authorization/kakao";
    }


}
