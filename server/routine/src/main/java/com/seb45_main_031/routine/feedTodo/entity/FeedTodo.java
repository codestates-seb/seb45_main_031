package com.seb45_main_031.routine.feedTodo.entity;

import com.seb45_main_031.routine.feed.entity.Feed;
import com.seb45_main_031.routine.todo.entity.Todo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FeedTodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedTodoId;

    @ManyToOne
    @JoinColumn(name = "FEED_ID")
    private Feed feed;

    @ManyToOne
    @JoinColumn(name = "TODO_ID")
    private Todo todo;
}
