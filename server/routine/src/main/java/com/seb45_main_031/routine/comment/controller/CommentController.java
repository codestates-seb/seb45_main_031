package com.seb45_main_031.routine.comment.controller;

import com.seb45_main_031.routine.comment.dto.CommentDto;
import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.comment.mapper.CommentMapper;
import com.seb45_main_031.routine.comment.service.CommentService;
import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;
    private final static String COMMENT_DEFAULT_URL = "/comments";

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    // 댓글 작성
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post commentPostDto) {

        Comment comment = mapper.commentPostDtoToComment(commentPostDto);

        Comment savedComment = commentService.createComment(comment);

        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL, savedComment.getCommentId());

        return ResponseEntity.created(location).build();
    }

    // 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.Patch commentPatchDto) {
        commentPatchDto.setCommentId(commentId);
        Comment comment = mapper.commentPatchDtoToComment(commentPatchDto);

        Comment updateComment = commentService.updateComment(comment);

        CommentDto.Response response = mapper.commentToCommentResponseDto(updateComment);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
