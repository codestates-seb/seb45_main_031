package com.seb45_main_031.routine.todo.controller;

//import com.seb45_main_031.routine.dto.SingeResponseDto;
import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.todo.dto.TodoDto;
import com.seb45_main_031.routine.todo.entity.Todo;
import com.seb45_main_031.routine.todo.mapper.TodoMapper;
import com.seb45_main_031.routine.todo.service.TodoService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import javax.websocket.server.PathParam;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    private final TodoMapper mapper;

    public TodoController(TodoService todoService, TodoMapper mapper) {
        this.todoService = todoService;
        this.mapper = mapper;
    }


    @PostMapping
    public ResponseEntity postTodo(@RequestBody TodoDto.Post todoPostDto){

        Todo todo = todoService.createTodo(mapper.todoPostDtoToTodo(todoPostDto));

        return  new ResponseEntity(new SingleResponseDto<>(mapper.todoToTodoResponseDto(todo)), HttpStatus.CREATED);

    }


    @PatchMapping("/{todo-id}")
    public ResponseEntity patchTodo(@RequestBody TodoDto.Patch todoPatchDto,
                                    @PathVariable("todo-id") long todoId){

        todoPatchDto.setTodoId(todoId);
        Todo todo = todoService.updateTodo(mapper.todoPatchDtoToTodo(todoPatchDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.todoToTodoResponseDto(todo)), HttpStatus.OK);

    }



    // Patch Complete
    @PatchMapping("/complete/{todo-id}")
    public ResponseEntity patchTodoComplete(@RequestBody TodoDto.CompletePatch todoCompletePatchDto,
                                            @PathVariable("todo-id") long todoId){

        todoCompletePatchDto.setTodoId(todoId);
        Todo todo = todoService.updateTodoComplete(mapper.todoCompletePatchDtoToTodo(todoCompletePatchDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.todoToTodoResponseDto(todo)), HttpStatus.OK);
    }


    @GetMapping("/{member-id}")
    public ResponseEntity getTodo(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
                                  @PathVariable("member-id") long memberId){

        List<Todo> todos = todoService.findTodos(date, memberId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.todosToTodoAllResponseDtos(todos)), HttpStatus.OK);

    }


    @DeleteMapping("/{todo-id}")
    public ResponseEntity deleteTodo(@PathVariable("todo-id") @Positive long todoId){

        todoService.deleteTodo(todoId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }


}
