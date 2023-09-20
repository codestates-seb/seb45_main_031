package com.seb45_main_031.routine.feedTodo.repository;

import com.seb45_main_031.routine.feedTodo.entity.FeedTodo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedTodoRepository extends JpaRepository<FeedTodo, Long> {
}
