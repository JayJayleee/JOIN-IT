package com.asrai.joinit.exception;

public class PrescriptionTypeException extends RuntimeException {

    public PrescriptionTypeException() {
        super("Invalid prescription type");
    }

    public PrescriptionTypeException(String message) {
        super(message);
    }

}
