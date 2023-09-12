package com.seb45_main_031.routine.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @Setter
    public static class Post {

        private long memberId;

        @Positive
        @NotNull
        private long feedId;

        @NotBlank(message = "내용을 작성해주세요.")
        private String content;

        private long parentId;
    }

    @Getter
    @Setter
    public static class Patch {
        private long commentId;

        @NotBlank(message = "내용을 작성해주세요.")
        private String content;
    }

    @Getter
    @Setter
    @Builder
    public static class Response {
        private long commentId;
        private long memberId;
        private long feedId;
        private String email;
        private String nickname;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
