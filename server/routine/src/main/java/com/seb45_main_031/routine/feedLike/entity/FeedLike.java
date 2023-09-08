package com.seb45_main_031.routine.feedLike.entity;

import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FeedLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long feedLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "FEED_ID")
    private Feed feed;

    @Enumerated(EnumType.STRING)
    private FeedLikes feedLikes;

    public enum FeedLikes{
        LIKE,
        NONE;
    }
}
