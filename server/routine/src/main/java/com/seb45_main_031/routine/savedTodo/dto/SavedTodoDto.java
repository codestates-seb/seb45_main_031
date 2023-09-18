package com.seb45_main_031.routine.savedTodo.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class SavedTodoDto {

    @Getter
    @Setter
    public static class Post{

        @NotBlank
        @Size(max = 20)
        private String content;

        @NotBlank
        @Size(max = 50)
        private String emoji;

        @NotBlank
        private long todoStorageId;

        @NotBlank
        private long tagId;

        private long memberId;

    }

    @Getter
    @Setter
    public static class PostList{
        @Valid
        private List<Post> posts;

        private long todoStorageId;
    }

    @Getter
    @Setter
    public static class Patch{
        private long savedTodoId;

        @Size(max = 20)
        private String content;

        @Size(max = 50)
        private String emoji;

        private long tagId;
    }

    @Getter
    @Setter
    @Builder
    public static class Response{
        private long savedTodoId;
        private String content;
        private String emoji;

        private UserInfo userInfo;
        private TodoStorageResponse todoStorageResponse;
        private TagResponse tagResponse;

    }

    @Getter
    @Setter
    @Builder
    public static class UserInfo{
        private long memberId;
    }

    @Getter
    @Setter
    @Builder
    public static class TodoStorageResponse{
        private long todoStorageId;
        private String category;
    }

    @Getter
    @Setter
    @Builder
    public static class TagResponse{
        private long tagId;
        private String tagName;

    }

}
