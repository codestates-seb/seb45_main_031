package com.seb45_main_031.routine.comment.entity;

import com.seb45_main_031.routine.audit.Auditable;
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
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "FEED_ID")
    private Feed feed;
}
