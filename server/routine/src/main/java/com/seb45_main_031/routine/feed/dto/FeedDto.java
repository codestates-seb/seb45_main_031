package com.seb45_main_031.routine.feed.dto;

import com.seb45_main_031.routine.feedTag.dto.FeedTagDto;
import com.seb45_main_031.routine.feedTodo.dto.FeedTodoDto;
import com.seb45_main_031.routine.todo.entity.Todo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class FeedDto {
    @Getter
    @Setter
    public static class Post {

        private long memberId;

        @Size(min = 1, max = 2000, message = "내용은 문자의 종류와 관계없이 1자 이상 2000자 이하로 입력해주세요(띄어쓰기 포함)")
        private String content;

        @Valid
        private List<FeedTagDto> feedTagDtos;

        @Valid
        private List<FeedTodoDto> feedTodoDtos;
    }

    @Getter
    @Setter
    public static class Patch {
        private long feedId;

        @Size(min = 1, max = 2000, message = "내용은 문자의 종류와 관계없이 1자 이상 2000자 이하로 입력해주세요(띄어쓰기 포함)")
        private String content;

        @Valid
        private List<FeedTagDto> feedTagDtos;

        @Valid
        private List<FeedTodoDto> feedTodoDtos;
    }

    @Getter
    @Setter
    @Builder
    public static class Response {
        private long feedId;
        private long memberId;
        private String nickname;
        private String content;
        private int likeCount;
        private FeedLikeInfo feedLikeInfo;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<ParentResponse> parentResponses;
        private List<TagResponse> tagsResponses;
        private List<TodoResponse> todoResponses;
    }

    @Getter
    @Setter
    @Builder
    public static class ParentResponse {
        private long commentId;
        private long memberId;
        private long feedId;
        private String nickname;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<ChildResponse> childResponses;
    }

    @Getter
    @Setter
    @Builder
    public static class TagResponse {
        private long tagId;
        private String tagName;
    }

    @Getter
    @Setter
    @Builder
    public static class ChildResponse {
        private long commentId;
        private long parentId;
        private long memberId;
        private String nickname;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    @Builder
    public static class FeedLikeInfo {
        private long memberId;
        private String nickname;
        private String feedLikes;
    }

    @Getter
    @Setter
    @Builder
    public static class TodoResponse {
        private long todoId;
        private LocalDate date;
        private String content;
        private Todo.Complete complete;
        private String todoEmoji;
        private long tagId;
        private String tagName;
    }
}