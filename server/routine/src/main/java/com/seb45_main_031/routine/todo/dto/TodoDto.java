package com.seb45_main_031.routine.todo.dto;

import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.todo.entity.Todo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;

public class TodoDto {

    @Getter
    @Setter
    public static class Post{

        @Positive
        @NotNull
        private long memberId;

        private long tagId;

        private LocalDate date;
        private String content;
        private String todoEmoji;

    }


    @Getter
    @Setter
    @Builder
    public static class Patch{

        @Positive
        @NotNull
        private long todoId;

        private LocalDate date;
        private String content;
        private String todoEmoji;

        private long tagId;

        //test
//        private boolean complete;



    }

    @Getter
    @Setter
    public static class CompletePatch{

        private long todoId;

        public Todo.Complete complete;
    }


    @Getter
    @Setter
    @Builder
    public static class Response{

        private long todoId;

        private LocalDate date;
        private String content;
        private String todoEmoji;
        private Todo.Complete complete;

        private TagResponse tagResponse;

    }

    @Getter
    @Setter
    @Builder
    public static class AllResponse{
        private List<Response> todoResponses;

        private int todoCount;
        private int completeCount;
    }


    @Getter
    @Setter
    @Builder
    public static class TagResponse{
        private long tagId;
        private String tagName;

    }

}
