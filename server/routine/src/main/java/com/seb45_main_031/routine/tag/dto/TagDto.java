package com.seb45_main_031.routine.tag.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;



public class TagDto {

    @Getter
    @Setter
    public static class Post{
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
