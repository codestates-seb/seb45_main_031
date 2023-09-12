package com.seb45_main_031.routine.feedLike.controller;

import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.feedLike.dto.FeedLikeDto;
import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import com.seb45_main_031.routine.feedLike.mapper.FeedLikeMapper;
import com.seb45_main_031.routine.feedLike.service.FeedLikeService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedLikes")
public class FeedLikeController {

    private final FeedLikeService feedLikeService;
    private final FeedLikeMapper mapper;

    public FeedLikeController(FeedLikeService feedLikeService, FeedLikeMapper mapper) {
        this.feedLikeService = feedLikeService;
        this.mapper = mapper;
    }

    // 피드에 좋아요 누르기
    @PostMapping
    public ResponseEntity postFeedLike (@RequestBody FeedLikeDto.Post feedLikePostDto,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {

        FeedLike feedLike = feedLikeService.createFeedLike(mapper.FeedLikePostDtoToFeedLikes(feedLikePostDto), accessToken);

        return new ResponseEntity(new SingleResponseDto<>(mapper.FeedLikeToFeedLikeResponseDto(feedLike)), HttpStatus.OK);
    }
}