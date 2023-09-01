package com.seb45_main_031.routine.todo.repository;

import com.seb45_main_031.routine.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByDate(LocalDate date);

    Todo findByTodoId(long todoId);

//    Todo findByDateAndMember(LocalDate date, long memberId);

//    List<Todo> findByComplete(Boolean complete);

}
