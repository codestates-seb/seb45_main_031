package com.seb45_main_031.routine.member.dto;

import com.seb45_main_031.routine.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class MemberDto {

    @Getter
    @Setter
    public static class Post{

        @NotBlank
        @Email(message = "이메일 형식으로 입력해주세요.")
        private String email;

        @NotBlank
        @Pattern(regexp = "^.{8,20}$", message = "8~20자 사이를 입력해주세요.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$", message = "최소 1개의 문자와 숫자가 포함되어야 합니다.")
        @Pattern(regexp = "\\S+", message = "공백없이 입력해주세요.")
        private String password;

        @NotBlank
        @Size(min = 2, max = 10, message = "2~10자 사이를 입력해주세요.")
        @Pattern(regexp = "\\S+", message = "공백없이 입력해주세요.")
        private String nickname;
    }

    @Getter
    @Setter
    public static class Patch{

        private long memberId;

        @Size(min = 2, max = 10, message = "2~10자 사이를 입력해주세요.") // 추가
        @Pattern(regexp = "\\S+", message = "공백없이 입력해주세요.")
        private String nickname;

        private Member.MemberStatus memberStatus;
    }

    @Getter
    @Setter
    public static class Password{
        private String password;
    }

    @Getter
    @Setter
    @Builder
    public static class Response{
        private long memberId;
        private String email;
        private String nickname;
        private Member.MemberStatus memberStatus;
        private int exp;
        private int level;
        private String image;
    }

}
