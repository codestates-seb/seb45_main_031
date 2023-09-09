package com.seb45_main_031.routine.todo.mapper;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.todo.dto.TodoDto;
import com.seb45_main_031.routine.todo.entity.Todo;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TodoMapper {


    default Todo todoPostDtoToTodo(TodoDto.Post todoPostDto){

        Member member = new Member();
        member.setMemberId(todoPostDto.getMemberId());

        Tag tag = new Tag();
        tag.setTagId(todoPostDto.getTagId());


        Todo todo = new Todo();
        todo.setMember(member);
        todo.setTag(tag);

        todo.setContent(todoPostDto.getContent());
        todo.setDate(todoPostDto.getDate());
        todo.setTodoEmoji(todoPostDto.getTodoEmoji());


        return todo;
    }


    default List<Todo> todoPostDtosToTodos(TodoDto.PostList postListDto){

        List<Todo> todos = postListDto.getPostList().stream()
                .map(post -> todoPostDtoToTodo(post))
                .collect(Collectors.toList());

        return todos;
    }


//    Todo todoPatchDtoToTodo(TodoDto.Patch todoPatchDto);
    default Todo todoPatchDtoToTodo(TodoDto.Patch todoPatchDto){


        Todo todo = new Todo();

        Tag tag = new Tag();

        tag.setTagId(todoPatchDto.getTagId());
        todo.setTag(tag);

        todo.setTodoId(todoPatchDto.getTodoId());
        todo.setContent(todoPatchDto.getContent());
        todo.setDate(todoPatchDto.getDate());
        todo.setTodoEmoji(todoPatchDto.getTodoEmoji());


        return todo;
    }


    Todo todoCompletePatchDtoToTodo(TodoDto.CompletePatch todoCompletePatchDto);

//        Todo todo = new Todo();
//        todo.setTodoId(todoCompletePatchDto.getTodoId());
//        todo.setComplete(Boolean.parseBoolean(todoCompletePatchDto.getComplete()));
//
//        return todo;



    default TodoDto.Response todoToTodoResponseDto(Todo todo){

        TodoDto.Response response = TodoDto.Response.builder()
                .todoId(todo.getTodoId())
                .date(todo.getDate())
                .content(todo.getContent())
                .todoEmoji(todo.getTodoEmoji())
                .complete(todo.getComplete())
                .build();


        Tag tag = todo.getTag();

        TodoDto.TagResponse tagResponse = TodoDto.TagResponse.builder()
                .tagId(tag.getTagId())
                .tagName(tag.getTagName())
                .build();

        response.setTagResponse(tagResponse);

        return response;
    }


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
