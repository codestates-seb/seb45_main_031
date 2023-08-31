package com.seb45_main_031.routine.todo.dto;

import com.seb45_main_031.routine.todo.entity.Todo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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

        private LocalDate date;
        private String content;
        private String todoEmoji;

    }


    @Getter
    @Setter
    public static class Patch{

        @Positive
        @NotNull
        private long todoId;

        private LocalDate date;
        private String content;
        private String todoEmoji;

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



        // todoCount
        // completCount
        // todoTag


    }

    @Getter
    @Setter
    @Builder
    public static class AllResponse{
        private List<Response> todoResponses;

        private int todoCount;
        private int completeCount;
    }

}
