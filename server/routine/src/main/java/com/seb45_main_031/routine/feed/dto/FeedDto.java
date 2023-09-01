package com.seb45_main_031.routine.feed.dto;

import com.seb45_main_031.routine.feedTag.dto.FeedTagDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class FeedDto {
    @Getter
    @Setter
    public static class Post {

        @Positive
        @NotNull
        private long memberId;

        @NotBlank(message = "내용을 작성해주세요.")
        private String content;

        private List<FeedTagDto> feedTagDtos;
    }

    @Getter
    @Setter
    public static class Patch {
        private long feedId;

        @NotBlank(message = "내용을 작성해주세요.")
        private String content;

        private List<FeedTagDto> feedTagDtos;
    }

    @Getter
    @Setter
    @Builder
    public static class Response {
        private long feedId;
        private long memberId;
        private String nickname;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<CommentResponse> comments;
        private List<TagResponse> tagsResponses;
    }

    @Getter
    @Setter
    @Builder
    public static class CommentResponse {
        private long commentId;
        private long memberId;
        private long feedId;
        private String nickname;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    @Builder
    public static class TagResponse {
        private long tagId;
        private String tagName;
    }
}