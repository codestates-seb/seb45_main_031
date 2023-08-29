package com.seb45_main_031.routine.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_PASSWORD_DOSE_NOT_MATCH(401, "Password dose not match"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    FEED_NOT_FOUND(404, "Feed not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    TODODATE_NOT_FOUND(404, "TodoDate not found"),
    TODO_NOT_FOUND(404, "Todo not found");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
