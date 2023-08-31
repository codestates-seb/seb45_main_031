package com.seb45_main_031.routine.todo.entity;

import com.seb45_main_031.routine.member.entity.Member;
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

    @Column(length = 500, nullable = false)
    private String content;

//    @Column(nullable = false)
//    private boolean complete;

    @Enumerated(EnumType.STRING)
    private Complete complete = Complete.NONE;

    @Column(nullable = false)
    private int todoCount;

    @Column(nullable = false)
    private String todoEmoji;


    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;



    public enum Complete{

        DONE,
        NONE;

    }


}
