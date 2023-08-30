package com.seb45_main_031.routine.comment.mapper;

import com.seb45_main_031.routine.comment.dto.CommentDto;
import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    default Comment commentPostDtoToComment(CommentDto.Post commentPostDto) {

        Member member = new Member();
        member.setMemberId(commentPostDto.getMemberId());

        Feed feed = new Feed();
        feed.setFeedId(commentPostDto.getFeedId());


        Comment comment = new Comment();
        comment.setMember(member);
        comment.setFeed(feed);
        comment.setContent(commentPostDto.getContent());

        return comment;
    }

    Comment commentPatchDtoToComment(CommentDto.Patch commentPatchDto);

    default CommentDto.Response commentToCommentResponseDto(Comment comment) {

        CommentDto.Response commentResponseDto = CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .memberId(comment.getMember().getMemberId())
                .feedId(comment.getFeed().getFeedId())
                .email(comment.getMember().getEmail())
                .nickname(comment.getMember().getNickname())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .build();

        return commentResponseDto;
    }
}
