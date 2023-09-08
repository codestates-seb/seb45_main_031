package com.seb45_main_031.routine.feedLike.repository;

import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {
    FeedLike findByMemberMemberIdAndFeedFeedId(Long memberId, Long feedId);
}
