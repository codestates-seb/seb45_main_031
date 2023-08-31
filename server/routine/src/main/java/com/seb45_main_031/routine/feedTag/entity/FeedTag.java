package com.seb45_main_031.routine.feedTag.entity;

import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FeedTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedTagId;

    @ManyToOne
    @JoinColumn(name = "FEED_ID")
    private Feed feed;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

}
