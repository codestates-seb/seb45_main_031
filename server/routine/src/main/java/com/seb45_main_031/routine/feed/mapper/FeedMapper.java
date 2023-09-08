package com.seb45_main_031.routine.feed.mapper;

import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.feed.dto.FeedDto;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feedLike.entity.FeedLike;
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

    default FeedDto.Response feedToFeedResponseDto(Feed feed, long findMemberId) {

        FeedDto.Response response = FeedDto.Response.builder()
                .feedId(feed.getFeedId())
                .memberId(feed.getMember().getMemberId())
                .nickname(feed.getMember().getNickname())
                .content(feed.getContent())
                .likeCount(feed.getLikeCount())
                .createdAt(feed.getCreatedAt())
                .modifiedAt(feed.getModifiedAt())
                .build();

        // feedLike 에서 memberId 일치 / 아니면 null
        FeedLike feedLike = feed.getFeedLikes().stream()
                .filter(feedLikes -> feedLikes.getMember().getMemberId() == findMemberId)
                .findAny().orElse(null);

        // feedLike가 null이 아닐 경우
        if (feedLike != null) {
            FeedDto.FeedLikeInfo feedLikeInfo = FeedDto.FeedLikeInfo.builder()
                    .memberId(feedLike.getMember().getMemberId())
                    .nickname(feedLike.getMember().getNickname())
                    .feedLikes(feedLike.getFeedLikes())
                    .build();

            response.setFeedLikeInfo(feedLikeInfo);
        }

        List<Comment> comments = feed.getComments();

        List<FeedDto.CommentResponse> commentResponses = comments.stream()
                .filter(comment -> comment.getParentComment() == null)
                .map(comment -> FeedDto.CommentResponse.builder()
                        .commentId(comment.getCommentId())
                        .memberId(comment.getMember().getMemberId())
                        .feedId(comment.getFeed().getFeedId())
                        .nickname(comment.getMember().getNickname())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .replyResponses(
                                comment.getChildren().stream()
                                        .map(childComment -> FeedDto.ReplyResponse.builder()
                                                .commentId(childComment.getCommentId())
                                                .parentId(childComment.getParentComment().getCommentId())
                                                .memberId(childComment.getMember().getMemberId())
                                                .content(childComment.getContent())
                                                .nickname(childComment.getMember().getNickname())
                                                .createdAt(childComment.getCreatedAt())
                                                .modifiedAt(childComment.getModifiedAt())
                                                .build())
                                        .collect(Collectors.toList())
                        )
                        .build()
                ).collect(Collectors.toList());

        response.setComments(commentResponses);

        List<FeedTag> feedTags = feed.getFeedTags();

        List<FeedDto.TagResponse> tagResponses = feedTags.stream()
                .map(feedTag -> FeedDto.TagResponse.builder()
                        .tagId(feedTag.getTag().getTagId())
                        .tagName(feedTag.getTag().getTagName())
                        .build()
                ).collect(Collectors.toList());

        response.setTagsResponses(tagResponses);

        return response;
    }

//    default FeedDto.FeedLikeResponse feedLikeResponse(Feed feed, long memberId) {
//
//        FeedDto.FeedLikeResponse response = FeedDto.FeedLikeResponse.builder()
//                .feedId(feed.getFeedId())
//                .content(feed.getContent())
//                .likeCount(feed.getLikeCount())
//                .build();
//
//        // feedLike 에서 memberId 일치 / 아니면 null
//        FeedLike feedLike = feed.getFeedLikes().stream()
//                .filter(feedLikes -> feedLikes.getMember().getMemberId() == memberId)
//                .findAny().orElse(null);
//
//        // feedLike가 null이 아닐 경우
//        if (feedLike != null) {
//            FeedDto.FeedLikeInfo feedLikeInfo = FeedDto.FeedLikeInfo.builder()
//                    .memberId(feedLike.getMember().getMemberId())
//                    .nickname(feedLike.getMember().getNickname())
//                    .feedLikes(feedLike.getFeedLikes())
//                    .build();
//            response.setFeedLikeInfo(feedLikeInfo);
//        }
//
//        return response;
//    }

    default List<FeedDto.Response> feedsToFeedResponseDtos(List<Feed> feeds, long findMemberId) {

        List<FeedDto.Response> responses = feeds.stream()
                .map(feed -> feedToFeedResponseDto(feed, findMemberId))
                .collect(Collectors.toList());

        return responses;
    }
}