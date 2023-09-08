package com.seb45_main_031.routine.feed.repository;

import com.seb45_main_031.routine.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<Feed, Long> {
}
