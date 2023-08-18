package com.asrai.joinit.util.mail;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@AllArgsConstructor
public class MailController {

    private final MailService mailService;

    @GetMapping("/mail")
    public String dispmail() {
        return "mail";
    }

    @PostMapping("/mail")
    public ResponseEntity execMail(@RequestBody MailDto mailDto){
        mailService.mailSend(mailDto);
        return ResponseEntity.ok().build();
    }
}
