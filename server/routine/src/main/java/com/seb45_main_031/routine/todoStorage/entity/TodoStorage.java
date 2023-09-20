package com.seb45_main_031.routine.todoStorage.entity;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.savedTodo.entity.SavedTodo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TodoStorage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoStorageId;

    private String category;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "todoStorage", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<SavedTodo> savedTodos;

}
