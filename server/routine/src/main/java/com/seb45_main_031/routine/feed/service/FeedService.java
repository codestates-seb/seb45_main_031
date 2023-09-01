package com.seb45_main_031.routine.feed.service;

import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feed.repository.FeedRepository;
import com.seb45_main_031.routine.feedTag.entity.FeedTag;
import com.seb45_main_031.routine.feedTag.repository.FeedTagRepository;
import com.seb45_main_031.routine.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedTagRepository feedTagRepository;

    public FeedService(FeedRepository feedRepository, FeedTagRepository feedTagRepository) {
        this.feedRepository = feedRepository;
        this.feedTagRepository = feedTagRepository;
    }

    // 피드 작성
    public Feed createFeed(Feed feed) {
        return feedRepository.save(feed);
    }

    // 피드 수정
    public Feed updateFeed(Feed feed) {

        Feed findFeed = findVerifiedFeed(feed.getFeedId());

        Optional.ofNullable(feed.getContent())
                .ifPresent(content -> findFeed.setContent(content));

        if (feed.getFeedTags() != null) {
            findFeed.getFeedTags().stream()
                    .map(feedTag -> feedTag.getFeedTagId())
                    .forEach(id -> feedTagRepository.deleteById(id));

            findFeed.setFeedTags(feed.getFeedTags());
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
    public void deleteFeed(long feedId) {
        Feed findFeed = findVerifiedFeed(feedId);

        feedRepository.delete(findFeed);
    }


    // 검증
    public Feed findVerifiedFeed(long feedId) {

        Optional<Feed> optional = feedRepository.findById(feedId);

        Feed findFeed = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEED_NOT_FOUND));

        return findFeed;
    }
}