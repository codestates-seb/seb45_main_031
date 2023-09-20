package com.seb45_main_031.routine.feed.repository;

import com.seb45_main_031.routine.feed.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {
    Page<Feed> findByFeedIdIn(List<Long> feedIds, Pageable pageable);
}
