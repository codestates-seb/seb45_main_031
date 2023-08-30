package com.seb45_main_031.routine.todo.service;

import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.member.repository.MemberRepository;
import com.seb45_main_031.routine.todo.entity.Todo;
import com.seb45_main_031.routine.todo.repository.TodoRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo findVerifiedTodo(long todoId){

        Optional<Todo> optionalTodo = todoRepository.findById(todoId);

        Todo findTodo = optionalTodo.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));

        return findTodo;
    }


    public Todo createTodo(Todo todo){

        return todoRepository.save(todo);
    }


    public Todo updateTodo(Todo todo){

        Todo findTodo = findVerifiedTodo(todo.getTodoId());

        Optional.ofNullable(todo.getContent())
                .ifPresent(content -> findTodo.setContent(content));

        Optional.ofNullable(todo.getDate())
                .ifPresent(date -> findTodo.setDate(date));

        Optional.ofNullable(todo.getTodoEmoji())
                .ifPresent(todoEmoji -> findTodo.setTodoEmoji(todoEmoji));


        /* complete Test
       findTodo.setComplete(todo.isComplete());*/


        return todoRepository.save(findTodo);
    }

    public Todo updateTodoComplete(Todo todo){

        Todo findTodo = findVerifiedTodo(todo.getTodoId());

        if(todo.getComplete() != findTodo.getComplete()){

            findTodo.setComplete(todo.getComplete());
        }


        return todoRepository.save(findTodo);
    }


    public List<Todo> findTodos(LocalDate date, long memberId){

        List<Todo> findTodos = todoRepository.findByDate(date);

        List<Todo> todos =
                findTodos.stream()
                        .filter(todo -> todo.getMember().getMemberId() == memberId)
                        .collect(Collectors.toList());

        return todos;
    }



    public void deleteTodo(long todoId){
        Todo findTodo = findVerifiedTodo(todoId);

        todoRepository.delete(findTodo);
    }




}
