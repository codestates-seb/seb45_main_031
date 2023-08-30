package com.seb45_main_031.routine.feed.mapper;

import com.seb45_main_031.routine.feed.dto.FeedDto;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

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

        return feedResponseDto;
    }

    List<FeedDto.Response> feedsToFeedResponseDtos(List<Feed> feeds);
}