package com.asrai.joinit.util.jwt;

import java.util.UUID;

public class PasswordUtil {

    public static String generateRandomPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
