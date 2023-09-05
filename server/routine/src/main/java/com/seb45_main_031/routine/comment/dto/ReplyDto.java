package com.seb45_main_031.routine.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class ReplyDto {

    @Getter
    @Setter
    public static class ParentPost {

        @Positive
        @NotNull
        private long memberId;

        @Positive
        @NotNull
        private long feedId;

        @NotBlank(message = "내용을 작성해주세요.")
        private String content;
    }

    @Getter
    @Setter
    public static class ChildPost {

        @Positive
        @NotNull
        private long parentId;

        @Positive
        @NotNull
        private long memberId;

        @Positive
        @NotNull
        private long feedId;

        @NotBlank(message = "내용을 작성해주세요.")
        private String content;
    }
}
