package com.seb45_main_031.routine.feed.mapper;

import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.feed.dto.FeedDto;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feedTag.entity.FeedTag;
import com.seb45_main_031.routine.member.entity.Member;

import com.seb45_main_031.routine.tag.entity.Tag;
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

        if (feedPostDto.getFeedTagDtos() != null) {

            List<FeedTag> feedTags = feedPostDto.getFeedTagDtos().stream()
                    .map(feedTagDto -> {
                        FeedTag feedTag = new FeedTag();
                        Tag tag = new Tag();
                        tag.setTagId(feedTagDto.getTagId());

                        feedTag.setTag(tag);
                        feedTag.setFeed(feed);

                        return feedTag;
                    }).collect(Collectors.toList());

            feed.setFeedTags(feedTags);
        }
        return feed;
    }

    default Feed feedPatchDtoToFeed(FeedDto.Patch feedPatchDto) {

        Feed feed = new Feed();
        feed.setFeedId(feedPatchDto.getFeedId());
        feed.setContent(feedPatchDto.getContent());

        if (feedPatchDto.getFeedTagDtos() != null) {

            List<FeedTag> feedTags = feedPatchDto.getFeedTagDtos().stream()
                    .map(feedTagDto -> {
                        FeedTag feedTag = new FeedTag();
                        Tag tag = new Tag();
                        tag.setTagId(feedTagDto.getTagId());

                        feedTag.setTag(tag);
                        feedTag.setFeed(feed);

                        return feedTag;
                    }).collect(Collectors.toList());

            feed.setFeedTags(feedTags);
        }
        return feed;
    }

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


        List<FeedTag> feedTags = feed.getFeedTags();

        List<FeedDto.TagResponse> tagResponses = feedTags.stream()
                .map(feedTag -> FeedDto.TagResponse.builder()
                        .tagId(feedTag.getTag().getTagId())
                        .tagName(feedTag.getTag().getTagName())
                        .build()
                ).collect(Collectors.toList());

        feedResponseDto.setTagsResponses(tagResponses);

        return feedResponseDto;
    }
    List<FeedDto.Response> feedsToFeedResponseDtos(List<Feed> feeds);
}