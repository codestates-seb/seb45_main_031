package com.seb45_main_031.routine.feedLike.controller;

import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feed.service.FeedService;
import com.seb45_main_031.routine.feedLike.dto.FeedLikeDto;
import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import com.seb45_main_031.routine.feedLike.mapper.FeedLikeMapper;
import com.seb45_main_031.routine.feedLike.service.FeedLikeService;
import com.seb45_main_031.routine.member.service.MemberService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedLikes")
public class FeedLikeController {

    private final FeedLikeService feedLikeService;
    private final MemberService memberService;
    private final FeedService feedService;
    private final FeedLikeMapper mapper;

    public FeedLikeController(FeedLikeService feedLikeService, MemberService memberService, FeedService feedService, FeedLikeMapper mapper) {
        this.feedLikeService = feedLikeService;
        this.memberService = memberService;
        this.feedService = feedService;
        this.mapper = mapper;
    }

    // 피드 좋아요 토글기능
    @PostMapping
    public ResponseEntity toggleFeedLike (@RequestBody FeedLikeDto.Post feedLikePostDto,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {

        long findMemberId = memberService.findMemberId(accessToken);
        feedLikePostDto.setMemberId(findMemberId);

        Feed findFeed = feedService.findVerifiedFeed(feedLikePostDto.getFeedId());

        feedLikeService.toggleFeedLike(mapper.FeedLikePostDtoToFeedLikes(feedLikePostDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.FeedToFeedLikeResponseDto(findFeed)), HttpStatus.OK);
    }
}
