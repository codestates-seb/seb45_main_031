package com.seb45_main_031.routine.feed.service;

import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feed.repository.FeedRepository;
import com.seb45_main_031.routine.feedTag.repository.FeedTagRepository;
import com.seb45_main_031.routine.feedTodo.repository.FeedTodoRepository;
import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedTagRepository feedTagRepository;
    private final FeedTodoRepository feedTodoRepository;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    public FeedService(FeedRepository feedRepository, FeedTagRepository feedTagRepository, FeedTodoRepository feedTodoRepository,
                       MemberService memberService, JwtTokenizer jwtTokenizer) {
        this.feedRepository = feedRepository;
        this.feedTagRepository = feedTagRepository;
        this.feedTodoRepository = feedTodoRepository;
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
    }

    // 피드 작성
    public Feed createFeed(Feed feed, String accessToken) {

        memberService.checkMemberId(feed.getMember().getMemberId(), accessToken);

        return feedRepository.save(feed);
    }

    // 피드 수정
    public Feed updateFeed(Feed feed, String accessToken) {

        Feed findFeed = findVerifiedFeed(feed.getFeedId());

        memberService.checkMemberId(findFeed.getMember().getMemberId(), accessToken);

        Optional.ofNullable(feed.getContent())
                .ifPresent(content -> findFeed.setContent(content));

        if (feed.getFeedTags() != null) {
            findFeed.getFeedTags().stream()
                    .map(feedTag -> feedTag.getFeedTagId())
                    .forEach(id -> feedTagRepository.deleteById(id));

            findFeed.setFeedTags(feed.getFeedTags());
        }

        if (feed.getFeedTodos() != null) {
            findFeed.getFeedTodos().stream()
                    .map(feedTodo -> feedTodo.getFeedTodoId())
                    .forEach(id -> feedTodoRepository.deleteById(id));

            findFeed.setFeedTodos(feed.getFeedTodos());
        }

        return feedRepository.save(findFeed);
    }

    // 피드 조회
    public Feed findFeed(long feedId) {
        Optional<Feed> optional = feedRepository.findById(feedId);

        Feed findFeed = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEED_NOT_FOUND));

        return findFeed;
    }

    // 피드 리스트 조회
    public Page<Feed> findFeeds(int page, int size) {

        return feedRepository.findAll(PageRequest.of(page, size, Sort.by("feedId").descending()));
    }

    // 피드 삭제
    public void deleteFeed(long feedId, String accessToken) {
        Feed findFeed = findVerifiedFeed(feedId);

        memberService.checkMemberId(findFeed.getMember().getMemberId(), accessToken);

        feedRepository.delete(findFeed);
    }

    // 피드 검증
    public Feed findVerifiedFeed(long feedId) {

        Optional<Feed> optional = feedRepository.findById(feedId);

        Feed findFeed = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEED_NOT_FOUND));

        return findFeed;
    }

    // 액세스 토큰에서 회원ID 찾기
    public long findMemberId(String accessToken) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        long memberId = jwtTokenizer.getMemberIdFromAccessToken(accessToken, base64EncodedSecretKey);

        return memberId;
    }

    public Page<Feed> findFeedsByMember(int page, int size, long memberId){

        Member findMember = memberService.findverifiedMember(memberId);

        List<Long> feedIds
                = findMember.getFeeds().stream()
                .map(feed -> feed.getFeedId())
                .collect(Collectors.toList());

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("feedId").descending());

        Page<Feed> pageFeeds = feedRepository.findByFeedIdIn(feedIds, pageRequest);

        return pageFeeds;

    }
}