package com.seb45_main_031.routine.feedLike.service;

import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feed.repository.FeedRepository;
import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import com.seb45_main_031.routine.feedLike.repository.FeedLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.OptimisticLockException;
import java.util.Optional;

@Service
@Transactional
public class FeedLikeService {

    private final FeedLikeRepository feedLikeRepository;
    private final FeedRepository feedRepository;

    public FeedLikeService(FeedLikeRepository feedLikeRepository, FeedRepository feedRepository) {
        this.feedLikeRepository = feedLikeRepository;
        this.feedRepository = feedRepository;
    }

    // 피드 좋아요 누르기
    public FeedLike createFeedLike(FeedLike feedLike) {
        try {
            FeedLike findFeedLike = feedLikeRepository.findByMemberMemberIdAndFeedFeedId(
                    feedLike.getMember().getMemberId(),
                    feedLike.getFeed().getFeedId());

            Optional<Feed> optional = feedRepository.findById(feedLike.getFeed().getFeedId());
            Feed findFeed = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEED_NOT_FOUND));

            if (findFeedLike == null) {
                // 처음 좋아요를 눌렀을 경우
                feedLike.setFeedLikes(FeedLike.FeedLikes.LIKE);
                findFeed.setLikeCount(findFeed.getLikeCount() + 1);
                feedLike.setFeed(findFeed);
                return feedLikeRepository.save(feedLike);
            } else {
                // 이전에 좋아요를 눌렀을 경우 취소 / 그렇지 않으면 좋아요를 누른 상태로 변경
                boolean isLiked = findFeedLike.getFeedLikes() == FeedLike.FeedLikes.LIKE;
                if (isLiked) {
                    // 이전에 좋아요를 눌렀다면
                    findFeedLike.setFeedLikes(FeedLike.FeedLikes.NONE);
                    findFeed.setLikeCount(findFeed.getLikeCount() - 1);
                } else {
                    // 이전에 좋아요를 누르지 않았다면
                    findFeedLike.setFeedLikes(FeedLike.FeedLikes.LIKE);
                    findFeed.setLikeCount(findFeed.getLikeCount() + 1);
                }

                feedRepository.save(findFeed);

                return feedLikeRepository.save(findFeedLike);
            }
        } catch (OptimisticLockException e) {
            throw new BusinessLogicException(ExceptionCode.CONCURRENT_MODIFICATION_ERROR);
        }
    }
}
