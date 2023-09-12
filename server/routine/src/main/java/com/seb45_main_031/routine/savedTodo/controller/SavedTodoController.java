package com.seb45_main_031.routine.savedTodo.controller;

import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.member.service.MemberService;
import com.seb45_main_031.routine.savedTodo.dto.SavedTodoDto;
import com.seb45_main_031.routine.savedTodo.entity.SavedTodo;
import com.seb45_main_031.routine.savedTodo.mapper.SavedTodoMapper;
import com.seb45_main_031.routine.savedTodo.service.SavedTodoService;
import com.seb45_main_031.routine.utils.UriCreator;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/savedTodos")
public class SavedTodoController {

    private final SavedTodoService savedTodoService;
    private final MemberService memberService;
    private final SavedTodoMapper mapper;
    private static final String SAVEDTODO_DEFAULT_URL = "/savedTodos";

    public SavedTodoController(SavedTodoService savedTodoService, MemberService memberService, SavedTodoMapper mapper) {
        this.savedTodoService = savedTodoService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postSavedTodo(@RequestBody SavedTodoDto.Post savedTodoPostDto,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        long findMemberId = memberService.findMemberId(accessToken);
        savedTodoPostDto.setMemberId(findMemberId);

        SavedTodo savedTodo = savedTodoService.createSavedTodo(mapper.savedTodoPostDtoToSavedTodo(savedTodoPostDto));

        URI location = UriCreator.createUri(SAVEDTODO_DEFAULT_URL, savedTodo.getSavedTodoId());

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/lists")
    public ResponseEntity postSavedTodos(@RequestBody SavedTodoDto.PostList savedTodoPostListDto,
                                         @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        long findMemberId = memberService.findMemberId(accessToken);

        savedTodoPostListDto.getPosts().stream()
                .forEach(post -> post.setMemberId(findMemberId));

        List<SavedTodo> savedTodos
                = savedTodoService.createSavedTodos(mapper.savedTodoPostListDtoToSavedTodos(savedTodoPostListDto));

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/{savedTodo-id}")
    public ResponseEntity patchSavedTodo(@RequestBody SavedTodoDto.Patch savedTodoPatchDto,
                                         @PathVariable("savedTodo-id") long savedTodoId,
                                         @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        savedTodoPatchDto.setSavedTodoId(savedTodoId);

        SavedTodo savedTodo
                = savedTodoService.updateSavedTodo(mapper.savedTodoPatchDtoToSavedTodo(savedTodoPatchDto), accessToken);

        return new ResponseEntity(new SingleResponseDto<>(mapper.savedTodoToSavedTodoResponseDto(savedTodo)), HttpStatus.OK);
    }

    @GetMapping("/{savedTodo-id}")
    public ResponseEntity getSavedTodo(@PathVariable("savedTodo-id") long savedTodoId,
                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){

        SavedTodo savedTodo = savedTodoService.findSavedTodo(savedTodoId, accessToken);

        return new ResponseEntity(new SingleResponseDto<>(mapper.savedTodoToSavedTodoResponseDto(savedTodo)), HttpStatus.OK);
    }


    @DeleteMapping("/{savedTodo-id}")
    public ResponseEntity deleteSavedTodo(@PathVariable("savedTodo-id") long savedTodoId,
                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken){
        savedTodoService.deleteSavedTodo(savedTodoId, accessToken);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}

