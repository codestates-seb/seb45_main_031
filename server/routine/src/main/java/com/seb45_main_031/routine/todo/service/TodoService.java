package com.seb45_main_031.routine.todo.service;

import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.tag.service.TagService;
import com.seb45_main_031.routine.todo.entity.Todo;
import com.seb45_main_031.routine.todo.repository.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class TodoService {

    private final TodoRepository todoRepository;

    private final TagService tagService;

    private final JwtTokenizer jwtTokenizer;

    public TodoService(TodoRepository todoRepository, TagService tagService, JwtTokenizer jwtTokenizer) {
        this.todoRepository = todoRepository;
        this.tagService = tagService;
        this.jwtTokenizer = jwtTokenizer;
    }

    public Todo findVerifiedTodo(long todoId){

        Optional<Todo> optionalTodo = todoRepository.findById(todoId);

        Todo findTodo = optionalTodo.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));

        return findTodo;
    }


    public void checkMemberId(long memberId, String accessToken){

        String secretKey = jwtTokenizer.getSecretKey();
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(secretKey);

        long findMemberId = jwtTokenizer.getMemberIdFromAccessToken(accessToken, base64EncodedSecretKey);

        if(memberId != findMemberId){

            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCHED);
        }
    }



    public Todo createTodo(Todo todo){

        Tag findTag = tagService.findVerifiedTag(todo.getTag().getTagId());
        todo.setTag(findTag);

        return todoRepository.save(todo);
    }


    public Todo updateTodo(Todo todo){

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


    public Todo findTodo(long todoId, String accessToken) {

        Optional<Todo> optionalTodo = todoRepository.findById(todoId);

        Todo findTodo = optionalTodo.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));

        checkMemberId(optionalTodo.get().getMember().getMemberId(), accessToken);

        return findTodo;

    }

    public List<Todo> findTodos(LocalDate date, long memberId, String accessToken){

        List<Todo> findTodos = todoRepository.findByDate(date);

        List<Todo> todos =
                findTodos.stream()
                        .filter(todo -> todo.getMember().getMemberId() == memberId)
                        .collect(Collectors.toList());

        checkMemberId(todos.get(0).getMember().getMemberId(), accessToken);

        return todos;
    }



    public void deleteTodo(long todoId){
        Todo findTodo = findVerifiedTodo(todoId);

        todoRepository.delete(findTodo);
    }




}
