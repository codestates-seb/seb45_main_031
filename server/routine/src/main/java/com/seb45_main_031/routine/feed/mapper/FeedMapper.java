package com.seb45_main_031.routine.feed.mapper;

import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.feed.dto.FeedDto;
import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.feedLike.entity.FeedLike;
import com.seb45_main_031.routine.feedTag.entity.FeedTag;
import com.seb45_main_031.routine.feedTodo.entity.FeedTodo;
import com.seb45_main_031.routine.member.entity.Member;

import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.todo.entity.Todo;
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

        if (feedPostDto.getFeedTodoDtos() != null) {

            List<FeedTodo> feedTodos = feedPostDto.getFeedTodoDtos().stream()
                    .map(feedTodoDto -> {
                        FeedTodo feedTodo = new FeedTodo();
                        Todo todo = new Todo();
                        todo.setTodoId(feedTodoDto.getTodoId());

                        feedTodo.setFeed(feed);
                        feedTodo.setTodo(todo);

                        return feedTodo;
                    }).collect(Collectors.toList());

            feed.setFeedTodos(feedTodos);
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

        if (feedPatchDto.getFeedTodoDtos() != null) {

            List<FeedTodo> feedTodos = feedPatchDto.getFeedTodoDtos().stream()
                    .map(feedTodoDto -> {
                        FeedTodo feedTodo = new FeedTodo();
                        Todo todo = new Todo();
                        todo.setTodoId(feedTodoDto.getTodoId());

                        feedTodo.setFeed(feed);
                        feedTodo.setTodo(todo);

                        return feedTodo;
                    }).collect(Collectors.toList());

            feed.setFeedTodos(feedTodos);
        }

        return feed;
    }

    default FeedDto.Response feedToFeedResponseDto(Feed feed, long findMemberId) {

        FeedDto.Response response = FeedDto.Response.builder()
                .feedId(feed.getFeedId())
                .memberId(feed.getMember().getMemberId())
                .nickname(feed.getMember().getNickname())
                .content(feed.getContent())
                .likeCount(feed.getFeedLikes().size())
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

        List<FeedDto.ParentResponse> parentResponses = comments.stream()
                .filter(comment -> comment.getParent() == null)
                .map(comment -> FeedDto.ParentResponse.builder()
                        .commentId(comment.getCommentId())
                        .memberId(comment.getMember().getMemberId())
                        .feedId(comment.getFeed().getFeedId())
                        .nickname(comment.getMember().getNickname())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .childResponses(
                                comment.getChildren().stream()
                                        .map(childComment -> FeedDto.ChildResponse.builder()
                                                .commentId(childComment.getCommentId())
                                                .parentId(childComment.getParent().getCommentId())
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

        response.setParentResponses(parentResponses);

        List<FeedTag> feedTags = feed.getFeedTags();

        List<FeedDto.TagResponse> tagResponses = feedTags.stream()
                .map(feedTag -> FeedDto.TagResponse.builder()
                        .tagId(feedTag.getTag().getTagId())
                        .tagName(feedTag.getTag().getTagName())
                        .build()
                ).collect(Collectors.toList());

        response.setTagsResponses(tagResponses);

        List<FeedTodo> feedTodos = feed.getFeedTodos();

        List<FeedDto.TodoResponse> todoResponses = feedTodos.stream()
                .map(feedTodo -> FeedDto.TodoResponse.builder()
                        .todoId(feedTodo.getTodo().getTodoId())
                        .date(feedTodo.getTodo().getDate())
                        .content(feedTodo.getTodo().getContent())
                        .complete(feedTodo.getTodo().getComplete())
                        .todoEmoji(feedTodo.getTodo().getTodoEmoji())
                        .tagId(feedTodo.getTodo().getTag().getTagId())
                        .tagName(feedTodo.getTodo().getTag().getTagName())
                        .build()
                ).collect(Collectors.toList());

        response.setTodoResponses(todoResponses);

         return response;
    }

    default List<FeedDto.Response> feedsToFeedResponseDtos(List<Feed> feeds, long findMemberId) {

        List<FeedDto.Response> responses = feeds.stream()
                .map(feed -> feedToFeedResponseDto(feed, findMemberId))
                .collect(Collectors.toList());

        return responses;
    }
}