package com.seb45_main_031.routine.feedLike.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

public class FeedLikeDto {

    @Getter
    @Setter
    public static class Post {
        private long memberId;
        private long feedId;
    }

    @Getter
    @Setter
    @Builder
    public static class Response {
        private long feedId;
        private int likeCount;
    }
}
