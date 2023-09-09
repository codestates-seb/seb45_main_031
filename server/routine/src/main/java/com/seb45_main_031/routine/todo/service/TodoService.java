package com.seb45_main_031.routine.todo.service;

import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.member.service.MemberService;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.tag.service.TagService;
import com.seb45_main_031.routine.todo.entity.Todo;
import com.seb45_main_031.routine.todo.repository.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class TodoService {

    private final TodoRepository todoRepository;
    private final TagService tagService;
    private final MemberService memberService;


    public TodoService(TodoRepository todoRepository, TagService tagService, MemberService memberService) {
        this.todoRepository = todoRepository;
        this.tagService = tagService;
        this.memberService = memberService;
    }

    // todoId로 특정 Todo 객체 찾는 로직
    public Todo findVerifiedTodo(long todoId){

        Optional<Todo> optionalTodo = todoRepository.findById(todoId);

        Todo findTodo = optionalTodo.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));

        return findTodo;
    }


    // Todo 할 일 등록
    public Todo createTodo(Todo todo, String accessToken){

        Tag findTag = tagService.findVerifiedTag(todo.getTag().getTagId());
        todo.setTag(findTag);

        memberService.checkMemberId(todo.getMember().getMemberId(), accessToken);

        return todoRepository.save(todo);
    }

    // Todo 할 일 여러 개 등록
    public List<Todo> createTodos(List<Todo> todos, String accessToken){

        for (Todo todo : todos){

            Tag findTag = tagService.findVerifiedTag(todo.getTag().getTagId());
            todo.setTag(findTag);
        }

        memberService.checkMemberId(todos.get(0).getMember().getMemberId(), accessToken);

        return todoRepository.saveAll(todos);
    }

    // Todo 수정

    public Todo updateTodo(Todo todo, String accessToken){

        Todo findTodo = findVerifiedTodo(todo.getTodoId());

        Tag findTag = tagService.findVerifiedTag(todo.getTag().getTagId());
        todo.setTag(findTag);

        Optional.ofNullable(todo.getContent())
                .ifPresent(content -> findTodo.setContent(content));

        Optional.ofNullable(todo.getDate())
                .ifPresent(date -> findTodo.setDate(date));

        Optional.ofNullable(todo.getTodoEmoji())
                .ifPresent(todoEmoji -> findTodo.setTodoEmoji(todoEmoji));

        Optional.ofNullable(todo.getTag())
                .ifPresent(tagId -> findTodo.setTag(tagId));

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);


        return todoRepository.save(findTodo);
    }

    // Todo 완료 여부
    public Todo updateTodoComplete(Todo todo, String accessToken){

        Todo findTodo = findVerifiedTodo(todo.getTodoId());

        if(todo.getComplete() != findTodo.getComplete()){

            findTodo.setComplete(todo.getComplete());
        }

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);

        return todoRepository.save(findTodo);
    }


    // Todo 단일 조회
    public Todo findTodo(long todoId, String accessToken) {

        Todo findTodo = findVerifiedTodo(todoId);

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);

        return findTodo;

    }


    // Todo 리스트 조회
    public List<Todo> findTodos(LocalDate date, long memberId, String accessToken){

//        List<Todo> findTodos = todoRepository.findByDate(date);
//
//        List<Todo> todos =
//                findTodos.stream()
//                        .filter(todo -> todo.getMember().getMemberId() == memberId)
//                        .collect(Collectors.toList());

        List<Todo> todos = todoRepository.findByMemberMemberIdAndDate(memberId, date);

        memberService.checkMemberId(memberId, accessToken);

        return todos;
    }



    // Todo 삭제
    public void deleteTodo(long todoId, String accessToken){

        Todo findTodo = findVerifiedTodo(todoId);

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);

        todoRepository.delete(findTodo);
    }
}
