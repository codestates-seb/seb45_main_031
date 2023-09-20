package com.seb45_main_031.routine.tag.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


public class TagDto {

    @Getter
    @Setter
    public static class Post{
        @NotBlank
        private String tagName;
    }

    @Getter
    @Setter
    public static class Patch{
        private long tagId;
        private String tagName;
    }

    @Getter
    @Setter
    @Builder
    public static class Response{
        private long tagId;
        private String tagName;
    }


}
