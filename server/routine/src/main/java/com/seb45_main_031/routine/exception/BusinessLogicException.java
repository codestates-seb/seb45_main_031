package com.seb45_main_031.routine.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException{
    // 사용자 정의 Exception

    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

}
