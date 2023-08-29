package com.seb45_main_031.routine.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class MemberDto {

    @Getter
    @Setter
    public static class Post{
        @NotBlank
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String nickname;
    }

    @Getter
    @Setter
    public static class Patch{
        private long memberId;
        private String nickname;
    }


    @Getter
    @Setter
    @Builder
    public static class Response{
        private long memberId;
        private String email;
        private String nickname;
    }

}
