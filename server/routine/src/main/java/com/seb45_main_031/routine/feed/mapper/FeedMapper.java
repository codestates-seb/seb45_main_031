package com.seb45_main_031.routine.feed.mapper;

import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.feed.dto.FeedDto;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FeedMapper {
    default Feed feedPostDtoToFeed(FeedDto.Post feedPostDto) {

        Member member = new Member();
        member.setMemberId(feedPostDto.getMemberId());

        Feed feed = new Feed();
        feed.setMember(member);
        feed.setContent(feedPostDto.getContent());

        return feed;
    }

    Feed feedPatchDtoToFeed(FeedDto.Patch feedPatchDto);

    default FeedDto.Response feedToFeedResponseDto(Feed feed) {

        FeedDto.Response feedResponseDto = FeedDto.Response.builder()
                .feedId(feed.getFeedId())
                .memberId(feed.getMember().getMemberId())
                .nickname(feed.getMember().getNickname())
                .content(feed.getContent())
                .createdAt(feed.getCreatedAt())
                .modifiedAt(feed.getModifiedAt())
                .build();

        List<Comment> comments = feed.getComments();

        List<FeedDto.CommentResponse> commentResponses = comments.stream()
                .map(comment -> FeedDto.CommentResponse.builder()
                        .commentId(comment.getCommentId())
                        .memberId(comment.getMember().getMemberId())
                        .feedId(comment.getFeed().getFeedId())
                        .nickname(comment.getMember().getNickname())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .build()
                ).collect(Collectors.toList());

        feedResponseDto.setComments(commentResponses);

        return feedResponseDto;
    }
    List<FeedDto.Response> feedsToFeedResponseDtos(List<Feed> feeds);
}