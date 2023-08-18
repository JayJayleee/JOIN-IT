package com.asrai.joinit.user.patient;

import java.sql.Timestamp;
import java.time.LocalDate;
import lombok.Data;

@Data
public class PatientInfo {
    private String userId;
    private String name;
    private String phone;
    private String isCompleted;
    private LocalDate endTime;

    public PatientInfo(String userId, String name, String phone, String isCompleted, LocalDate endTime) {
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.isCompleted = isCompleted;
        this.endTime = endTime;
    }
}
