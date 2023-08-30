package com.seb45_main_031.routine.todo.mapper;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.todo.dto.TodoDto;
import com.seb45_main_031.routine.todo.entity.Todo;
import com.seb45_main_031.routine.todo.repository.TodoRepository;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TodoMapper {


    default Todo todoPostDtoToTodo(TodoDto.Post todoPostDto){

        Member member = new Member();
        member.setMemberId(todoPostDto.getMemberId());

        Todo todo = new Todo();
        todo.setMember(member);
        todo.setContent(todoPostDto.getContent());
        todo.setDate(todoPostDto.getDate());
        todo.setTodoEmoji(todoPostDto.getTodoEmoji());

        return todo;
    }


    Todo todoPatchDtoToTodo(TodoDto.Patch todoPatchDto);

    Todo todoCompletePatchDtoToTodo(TodoDto.CompletePatch todoCompletePatchDto);

//        Todo todo = new Todo();
//        todo.setTodoId(todoCompletePatchDto.getTodoId());
//        todo.setComplete(Boolean.parseBoolean(todoCompletePatchDto.getComplete()));
//
//        return todo;


    TodoDto.Response todoToTodoResponseDto(Todo todo);

    List<TodoDto.Response> todosToTodoResponseDtos(List<Todo> todos);
}
