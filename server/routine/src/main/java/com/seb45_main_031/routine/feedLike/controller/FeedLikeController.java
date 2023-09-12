package com.seb45_main_031.routine.feedLike.controller;

import com.seb45_main_031.routine.dto.SingleResponseDto;
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
    private final FeedLikeMapper mapper;

    public FeedLikeController(FeedLikeService feedLikeService, MemberService memberService, FeedLikeMapper mapper) {
        this.feedLikeService = feedLikeService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 피드에 좋아요 누르기
    @PostMapping
    public ResponseEntity postFeedLike (@RequestBody FeedLikeDto.Post feedLikePostDto,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {

        long findMemberId = memberService.findMemberId(accessToken);
        feedLikePostDto.setMemberId(findMemberId);

        FeedLike feedLike = feedLikeService.createFeedLike(mapper.FeedLikePostDtoToFeedLikes(feedLikePostDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.FeedLikeToFeedLikeResponseDto(feedLike)), HttpStatus.OK);
    }
}
