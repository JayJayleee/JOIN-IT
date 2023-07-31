package com.asrai.joinit.exception;

public class UserTypeException extends RuntimeException {

    public UserTypeException() {
        super("Invalid user type");
    }

    public UserTypeException(String message) {
        super(message);
    }

}
