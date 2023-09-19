package com.seb45_main_031.routine.feedLike.service;

import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import com.seb45_main_031.routine.feedLike.repository.FeedLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FeedLikeService {

    private final FeedLikeRepository feedLikeRepository;

    public FeedLikeService(FeedLikeRepository feedLikeRepository) {
        this.feedLikeRepository = feedLikeRepository;
    }

    // 피드 좋아요 토글기능
    public void toggleFeedLike (FeedLike feedLike) {
        FeedLike findFeedLike = feedLikeRepository.findByMemberMemberIdAndFeedFeedId(
                feedLike.getMember().getMemberId(),
                feedLike.getFeed().getFeedId());

        // (이전에 좋아요를 누르지 않았을 경우) DB에 feedLike를 저장
        if (findFeedLike == null) {
            feedLikeRepository.save(feedLike);
        } else { // (이전에 좋아요를 눌렀을 경우) DB에서 기존 정보(findFeedLike)를 삭제
            feedLikeRepository.delete(findFeedLike);
        }
    }
}