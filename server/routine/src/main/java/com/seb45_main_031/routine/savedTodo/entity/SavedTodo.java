package com.seb45_main_031.routine.savedTodo.entity;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.todoStorage.entity.TodoStorage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SavedTodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long savedTodoId;

    private String content;

    private String emoji;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "TODOSTORAGE_ID")
    private TodoStorage todoStorage;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;
}
