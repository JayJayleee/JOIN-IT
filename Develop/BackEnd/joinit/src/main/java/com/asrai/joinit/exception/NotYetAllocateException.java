package com.asrai.joinit.exception;

public class NotYetAllocateException extends RuntimeException {

    public NotYetAllocateException() {
        super("not yet allocate");
    }

    public NotYetAllocateException(String message) {
        super(message);
    }

}
