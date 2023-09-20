package com.seb45_main_031.routine.todoStorage.controller;

import com.seb45_main_031.routine.dto.MultiResponseDto;
import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.member.service.MemberService;
import com.seb45_main_031.routine.todoStorage.dto.TodoStorageDto;
import com.seb45_main_031.routine.todoStorage.entity.TodoStorage;
import com.seb45_main_031.routine.todoStorage.mapper.TodoStorageMapper;
import com.seb45_main_031.routine.todoStorage.service.TodoStorageService;
import com.seb45_main_031.routine.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/todoStorages")
public class TodoStorageController {
    private final TodoStorageService todoStorageService;
    private final MemberService memberService;
    private final TodoStorageMapper mapper;

    private static final String TODOSTORAGE_DEFAULT_URL = "/todoStorages";

    public TodoStorageController(TodoStorageService todoStorageService,
                                 MemberService memberService, TodoStorageMapper mapper) {
        this.todoStorageService = todoStorageService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postTodoStorage(@RequestBody TodoStorageDto.Post todoStoragePostDto,
                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        long findMemberId = memberService.findMemberId(accessToken);
        todoStoragePostDto.setMemberId(findMemberId);

        TodoStorage todoStorage
                = todoStorageService.createTodoStorage(mapper.todoStoragePostDtoToTodoStorage(todoStoragePostDto));

        URI location = UriCreator.createUri(TODOSTORAGE_DEFAULT_URL, todoStorage.getTodoStorageId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{todoStorage-id}")
    public ResponseEntity patchTodoStorage(@RequestBody TodoStorageDto.Patch todoStoragePatchDto,
                                           @PathVariable("todoStorage-id") long todoStorageId,
                                           @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        todoStoragePatchDto.setTodoStorageId(todoStorageId);
        TodoStorage todoStorage
                = todoStorageService.updateTodoStorage(
                        mapper.todoStoragePatchDtoToTodoStorage(todoStoragePatchDto), accessToken);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.todoStorageToTodoStorageResponseDto(todoStorage)), HttpStatus.OK);
    }

    @GetMapping("/{todoStorage-id}")
    public ResponseEntity getTodoStorage(@PathVariable("todoStorage-id") long todoStorageId,
                                         @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){
        TodoStorage todoStorage = todoStorageService.findTodoStorage(todoStorageId, accessToken);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.todoStorageToTodoStorageResponseDto(todoStorage)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getTodoStorages(@RequestParam int page,
                                          @RequestParam int size,
                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        Page<TodoStorage> pageTodoStorages = todoStorageService.findTodoStorages(page-1, size, accessToken);
        List<TodoStorage> todoStorages = pageTodoStorages.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(
                        mapper.todoStoragesToTodoStorageResponseDtos(todoStorages), pageTodoStorages), HttpStatus.OK);
    }

    @GetMapping("/storages/{todoStorage-id}")
    public ResponseEntity getTodosByStorage(@PathVariable("todoStorage-id") long todoStorageId,
                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        TodoStorage todoStorage = todoStorageService.findTodoStorage(todoStorageId, accessToken);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.todoStorageToTodoStorageResponseDtos(todoStorage)), HttpStatus.OK);

    }

    @DeleteMapping("/{todoStorage-id}")
    public ResponseEntity deleteTodoStorage(@PathVariable("todoStorage-id") long todoStorageId,
                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){
        todoStorageService.deleteTodoStorage(todoStorageId, accessToken);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
