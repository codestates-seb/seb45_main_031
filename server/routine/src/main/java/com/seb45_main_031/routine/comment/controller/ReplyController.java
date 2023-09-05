package com.seb45_main_031.routine.comment.controller;

import com.seb45_main_031.routine.comment.dto.CommentDto;
import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.comment.mapper.CommentMapper;
import com.seb45_main_031.routine.comment.service.CommentService;
import com.seb45_main_031.routine.utils.UriCreator;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/comments")
@Validated
public class ReplyController {
    private final CommentService commentService;
    private final CommentMapper mapper;
    private final static String COMMENT_DEFAULT_URL = "/comments";

    public ReplyController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    // 대댓글 작성
    @PostMapping("/{parent-comment-id}/reply")
    public ResponseEntity postReply(@PathVariable("parent-comment-id") long parentCommentId,
                                    @Valid @RequestBody CommentDto.Post commentPostDto) {
        Comment parentComment = commentService.findVerifiedComment(parentCommentId);

        Comment comment = mapper.commentPostDtoToComment(commentPostDto);
        comment.setParentComment(parentComment);

        Comment savedComment = commentService.createComment(comment);

        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL, savedComment.getCommentId());

        return ResponseEntity.created(location).build();
    }
}
