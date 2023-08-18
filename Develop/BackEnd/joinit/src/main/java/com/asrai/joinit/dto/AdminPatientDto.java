package com.asrai.joinit.dto;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminPatientDto {

    private String name;
    private String loginId;
    private String nickname;
    private String codeDetailName; // userTypeCode
    private String smsAgree;
    private String emailAgree;
    private Timestamp createTime;
    private String phone;
}
