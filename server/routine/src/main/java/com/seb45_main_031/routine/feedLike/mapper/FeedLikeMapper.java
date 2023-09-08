package com.seb45_main_031.routine.feedLike.mapper;

import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feedLike.dto.FeedLikeDto;
import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import com.seb45_main_031.routine.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FeedLikeMapper {

    default FeedLike FeedLikePostDtoToFeedLikes(FeedLikeDto.Post feedLikePostDto) {

        Member member = new Member();
        member.setMemberId(feedLikePostDto.getMemberId());

        Feed feed = new Feed();
        feed.setFeedId(feedLikePostDto.getFeedId());

        FeedLike feedLike = new FeedLike();
        feedLike.setMember(member);
        feedLike.setFeed(feed);

        return feedLike;
    }

    default FeedLikeDto.Response FeedLikeToFeedLikeResponseDto(FeedLike feedLike) {

        FeedLikeDto.Response response = FeedLikeDto.Response.builder()
                .feedId(feedLike.getFeed().getFeedId())
                .likeCount(feedLike.getFeed().getLikeCount())
                .build();

        return response;
    }
}
