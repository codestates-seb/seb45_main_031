package com.seb45_main_031.routine.comment.service;

import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.comment.repository.CommentRepository;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final JwtTokenizer jwtTokenizer;

    public CommentService(CommentRepository commentRepository, JwtTokenizer jwtTokenizer) {
        this.commentRepository = commentRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    // 댓글 작성
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment, String accessToken) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        verifiedMemberId(findComment.getMember().getMemberId(), accessToken);

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    // 댓글 삭제
    public void deleteComment(long commentId, String accessToken) {
        Comment findComment = findVerifiedComment(commentId);

        verifiedMemberId(findComment.getMember().getMemberId(), accessToken);

        commentRepository.delete(findComment);
    }

    // 댓글 검증
    public Comment findVerifiedComment(long commentId) {

        Optional<Comment> optional = commentRepository.findById(commentId);

        Comment findComment = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }

    // 회원 검증
    public void verifiedMemberId(long memberId, String accessToken) {

        String secretKey = jwtTokenizer.getSecretKey();
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(secretKey);

        long findMemberId = jwtTokenizer.getMemberIdFromAccessToken(accessToken, base64EncodedSecretKey);

        if (memberId != findMemberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCHED);
        }
    }
}
