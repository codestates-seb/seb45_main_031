package com.seb45_main_031.routine.comment.service;

import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.comment.repository.CommentRepository;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feed.repository.FeedRepository;
import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.member.repository.MemberRepository;
import com.seb45_main_031.routine.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final FeedRepository feedRepository;

    public CommentService(CommentRepository commentRepository, MemberService memberService, MemberRepository memberRepository, FeedRepository feedRepository) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.feedRepository = feedRepository;
    }

    // 댓글 작성
    public Comment createComment(Comment comment) {
//        Member member = memberRepository.findById(comment.getMember().getMemberId()).get();
//        Feed feed = feedRepository.findById(comment.getFeed().getFeedId()).get();
//
//        comment.setMember(member);
//        comment.setFeed(feed);

        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment, String accessToken) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        memberService.checkMemberId(findComment.getMember().getMemberId(), accessToken);

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    // 댓글 삭제
    public void deleteComment(long commentId, String accessToken) {
        Comment findComment = findVerifiedComment(commentId);

        memberService.checkMemberId(findComment.getMember().getMemberId(), accessToken);

        commentRepository.delete(findComment);
    }

    // 댓글 검증
    public Comment findVerifiedComment(long commentId) {

        Optional<Comment> optional = commentRepository.findById(commentId);

        Comment findComment = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
}
