package com.seb45_main_031.routine.comment.repository;

import com.seb45_main_031.routine.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
