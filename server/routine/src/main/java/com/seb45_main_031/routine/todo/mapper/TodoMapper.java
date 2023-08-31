package com.seb45_main_031.routine.todo.mapper;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.todo.dto.TodoDto;
import com.seb45_main_031.routine.todo.entity.Todo;
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


    default TodoDto.AllResponse todosToTodoAllResponseDtos(List<Todo> todos){

        List<TodoDto.Response> responses = todosToTodoResponseDtos(todos);

        int todoCount = (int) responses.stream().count();

        //중간 연산 도중 값이 변할 수 있음
//        int completeCount = (int) responses.stream()
//                .filter(response -> String.valueOf(response.getComplete()).equals("DONE"))
//                .count();

        // map 방식 -> 데이터 변환
        int completeCount = (int) responses.stream()
                .map(response -> response.getComplete())
                .filter(complete -> complete == Todo.Complete.DONE)
                .count();



        TodoDto.AllResponse allResponse = TodoDto.AllResponse.builder()
                .todoCount(todoCount)
                .completeCount(completeCount)
                .todoResponses(responses)
                .build();

        return allResponse;
    }
}
