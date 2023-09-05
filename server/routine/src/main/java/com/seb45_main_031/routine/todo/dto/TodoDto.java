package com.seb45_main_031.routine.todo.dto;

import com.seb45_main_031.routine.tag.entity.Tag;

import com.seb45_main_031.routine.todo.entity.Todo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

public class TodoDto {

    @Getter
    @Setter
    public static class Post{

        @NotNull
        private long memberId;

        @Positive(message = "양수 tagId 값을 넣어주세요")
        @NotNull
        private long tagId;

        @NotNull
        @FutureOrPresent(message = "현재 또는 미래의 날짜만 허용합니다.")
        private LocalDate date;

        @NotBlank(message = "내용을 입력해주세요")
        @Size(min = 1, max = 20, message = "내용은 문자의 종류와 관계없이 1자 이상 20자 이하로 입력해주세요(띄어쓰기 포함)")
        private String content;

        @NotNull
        private String todoEmoji = ":person_running:";


    }





    @Getter
    @Setter
    @Builder
    public static class Patch{

        private long todoId;

        private LocalDate date;

        @Size(min = 1, max = 20, message = "내용은 문자의 종류와 관계없이 1자 이상 20자 이하로 입력해주세요(띄어쓰기 포함)")
        private String content;

        private String todoEmoji;

        @Positive(message = "양수 tagId 값을 넣어주세요")
        @NotNull
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
