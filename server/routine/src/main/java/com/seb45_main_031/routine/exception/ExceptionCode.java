package com.seb45_main_031.routine.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_MATCHED(403, "MemberId not matched"),
    MEMBER_PASSWORD_NOT_MATCHED(403, "Member password not matched"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NICKNAME_EXISTS(409, "Member nickname exists"),
    FEED_NOT_FOUND(404, "Feed not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    TODO_NOT_FOUND(404, "Todo not found"),
    TODO_DATE_NOT_PROPER(400, "Todo date is not proper"),
    TAG_NOT_FOUND(404, "Tag not found"),
    TAG_EXISTS(409, "Tag exists"),
    TODOSTORAGE_NOT_FOUND(404, "TodoStorage not found"),
    SAVEDTODO_NOT_FOUND(404, "SavedTodo not found"),
    FILE_INPUT_STREAM_ERROR(500, "Failed to read image file"),
    FILE_TYPES_NOT_ALLOWED(400, "Type of file not allowed");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
