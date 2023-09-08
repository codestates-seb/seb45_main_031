package com.seb45_main_031.routine.feed.controller;

import com.seb45_main_031.routine.dto.MultiResponseDto;
import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.feed.dto.FeedDto;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feed.mapper.FeedMapper;
import com.seb45_main_031.routine.feed.service.FeedService;
import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import com.seb45_main_031.routine.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/feeds")
@Validated
public class FeedController {

    private final FeedService feedService;
    private final FeedMapper mapper;
    private final static String FEED_DEFAULT_URL = "/feeds";

    public FeedController(FeedService feedService, FeedMapper mapper) {
        this.feedService = feedService;
        this.mapper = mapper;
    }

    // 피드 작성
    @PostMapping
    public ResponseEntity postFeed(@Valid @RequestBody FeedDto.Post feedPostDto) {

        Feed feed = feedService.createFeed(mapper.feedPostDtoToFeed(feedPostDto));

        URI location = UriCreator.createUri(FEED_DEFAULT_URL, feed.getFeedId());

        return ResponseEntity.created(location).build();
    }

    // 피드 수정
    @PatchMapping("/{feed-id}")
    public ResponseEntity patchFeed(@PathVariable("feed-id") @Positive long feedId,
                                    @Valid @RequestBody FeedDto.Patch feedPatchDto,
                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        feedPatchDto.setFeedId(feedId);

        Feed feed = feedService.updateFeed(mapper.feedPatchDtoToFeed(feedPatchDto), accessToken);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.feedToFeedResponseDto(feed)), HttpStatus.OK);
    }

    // 피드 조회
    @GetMapping("/{feed-id}")
    public ResponseEntity getFeed(@PathVariable("feed-id") @Positive long feedId,
                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {

        Feed feed = feedService.findFeed(feedId);
        long memberId = feedService.findMemberId(accessToken);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.feedToFeedResponseDto(feed, memberId)), HttpStatus.OK);
    }

    // 피드 리스트 조회
    @GetMapping
    public ResponseEntity getFeeds(@RequestParam(required = false, defaultValue = "1") int page,
                                   @RequestParam(required = false, defaultValue = "10") int size,
                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        Page<Feed> pageFeeds = feedService.findFeeds(page - 1, size);
        List<Feed> feeds = pageFeeds.getContent();

        long findMemberId = feedService.findMemberId(accessToken);

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.feedsToFeedResponseDtos(feeds, findMemberId), pageFeeds), HttpStatus.OK);
    }

    // 피드 삭제
    @DeleteMapping("/{feed-id}")
    public ResponseEntity deleteFeed(@PathVariable("feed-id") @Positive long feedId,
                                     @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        feedService.deleteFeed(feedId, accessToken);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    // 회원의 좋아요 피드 조회
//    @GetMapping("/feedLike/{feed-id}")
//    public ResponseEntity getFeedLikeFeed(@PathVariable("feed-id") @Positive long feedId,
//                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
//        Feed feed = feedService.findFeed(feedId);
//        long memberId = feedService.findMemberId(accessToken);
//
//        return new ResponseEntity<>(new SingleResponseDto<>(mapper.feedToFeedResponseDto(feed, memberId)), HttpStatus.OK);
//    }

//    // 회원의 좋아요 피드 리스트 조회
//    @GetMapping("/feedLike")
//    public ResponseEntity getFeedLikeFeeds(@RequestParam(required = false, defaultValue = "1") int page,
//                                           @RequestParam(required = false, defaultValue = "10") int size,
//                                           @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
//        Page<Feed> pageFeeds = feedService.findFeeds(page - 1, size);
//        List<Feed> feeds = pageFeeds.getContent();
//
//        long memberId = feedService.findMemberId(accessToken);
//
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.feedLikeResponses(feeds, memberId), pageFeeds), HttpStatus.OK);
//    }
}
