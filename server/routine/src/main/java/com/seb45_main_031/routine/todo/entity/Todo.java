package com.seb45_main_031.routine.todo.entity;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(length = 20, nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    private Complete complete = Complete.NONE;

    @Column(nullable = false)
    private String todoEmoji;


    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;



    public enum Complete{

        DONE,
        NONE;
    }
}
