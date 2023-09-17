package com.seb45_main_031.routine.tag.entity;

import com.seb45_main_031.routine.feedTag.entity.FeedTag;
import com.seb45_main_031.routine.todo.entity.Todo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(nullable = false, unique = true)
    private String tagName;

    @OneToMany(mappedBy = "tag")
    private List<FeedTag> feedTags;

    @OneToMany(mappedBy = "tag")
    private List<Todo> todos;

}
