package com.seb45_main_031.routine.todo.controller;

import com.seb45_main_031.routine.dto.SingleResponseDto;

import com.seb45_main_031.routine.todo.dto.TodoDto;
import com.seb45_main_031.routine.todo.entity.Todo;
import com.seb45_main_031.routine.todo.mapper.TodoMapper;
import com.seb45_main_031.routine.todo.service.TodoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/todos")
@Validated
@Slf4j
public class TodoController {

    private final TodoService todoService;

    private final TodoMapper mapper;

    public TodoController(TodoService todoService, TodoMapper mapper) {
        this.todoService = todoService;
        this.mapper = mapper;
    }


    //Todo 등록
    @PostMapping
    public ResponseEntity postTodo(@RequestBody @Valid TodoDto.Post todoPostDto,
                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        Todo todo = todoService.createTodo(mapper.todoPostDtoToTodo(todoPostDto), accessToken);

        return  new ResponseEntity(new SingleResponseDto<>(mapper.todoToTodoResponseDto(todo)), HttpStatus.CREATED);

    }


    // Todo 여러 개 등록
    @PostMapping("/todoList")
    public ResponseEntity postTodos(@RequestBody @Valid TodoDto.PostList todoPostListDto,
                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        List<Todo> todo = todoService.createTodos(mapper.todoPostDtosToTodos(todoPostListDto), accessToken);

        return  new ResponseEntity(new SingleResponseDto<>(mapper.todosToTodoResponseDtos(todo)), HttpStatus.CREATED);

    }

    // Todo 수정

    @PatchMapping("/{todo-id}")
    public ResponseEntity patchTodo(@RequestBody @Valid TodoDto.Patch todoPatchDto,
                                    @PathVariable("todo-id") long todoId,
                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        todoPatchDto.setTodoId(todoId);
        Todo todo = todoService.updateTodo(mapper.todoPatchDtoToTodo(todoPatchDto), accessToken);

        return new ResponseEntity(new SingleResponseDto<>(mapper.todoToTodoResponseDto(todo)), HttpStatus.OK);

    }



    // Todo Patch Complete 완료여부
    @PatchMapping("/complete/{todo-id}")
    public ResponseEntity patchTodoComplete(@RequestBody @Valid TodoDto.CompletePatch todoCompletePatchDto,
                                            @PathVariable("todo-id") long todoId,
                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        todoCompletePatchDto.setTodoId(todoId);
        Todo todo = todoService.updateTodoComplete(mapper.todoCompletePatchDtoToTodo(todoCompletePatchDto), accessToken);


        return new ResponseEntity(new SingleResponseDto<>(mapper.todoToTodoResponseDto(todo)), HttpStatus.OK);

    }




    // Todo 단일 조회
    @GetMapping("/single/{todo-id}")
    public ResponseEntity getTodo(@PathVariable("todo-id") @Positive long todoId,
                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        Todo todos = todoService.findTodo(todoId, accessToken);

        return new ResponseEntity(new SingleResponseDto<>(mapper.todoToTodoResponseDto(todos)), HttpStatus.OK);

    }


    // Todo 리스트 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getTodos(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
                                   @PathVariable("member-id") long memberId,
                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        List<Todo> todos = todoService.findTodos(date, memberId, accessToken);

        return new ResponseEntity(new SingleResponseDto<>(mapper.todosToTodoAllResponseDtos(todos)), HttpStatus.OK);

    }


    // Todo 삭제
    @DeleteMapping("/{todo-id}")
    public ResponseEntity deleteTodo(@PathVariable("todo-id") @Positive long todoId,
                                     @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        todoService.deleteTodo(todoId, accessToken);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}
