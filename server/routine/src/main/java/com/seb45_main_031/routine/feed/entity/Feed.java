package com.seb45_main_031.routine.feed.entity;

import com.seb45_main_031.routine.audit.Auditable;
import com.seb45_main_031.routine.comment.entity.Comment;
import com.seb45_main_031.routine.feedTag.entity.FeedTag;
import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Feed extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "feed", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    private List<FeedTag> feedTags = new ArrayList<>();

}