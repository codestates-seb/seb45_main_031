package com.seb45_main_031.routine.todo.service;

import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.member.entity.Member;
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

    public double calculatePercent(long memberId, LocalDate date){
        // 특정 member / 특정 date -> todo List 완료율 계산

        List<Todo> todos = todoRepository.findByMemberMemberIdAndDate(memberId, date);

        if(todos == null){
            return 0;
        }

        long totalTodos = todos.stream().count();

        long doneTodos = todos.stream()
                .map(beTodo -> beTodo.getComplete())
                .filter(complete -> complete == Todo.Complete.DONE).count();

        return (double) doneTodos/totalTodos;
    }

    public void setExpAndLevel(long memberId, double beforePercent, double afterPercent){

        Member findMember = memberService.findverifiedMember(memberId);

        if(afterPercent == 1){

            findMember.setExp(findMember.getExp() + 1);
            // member -> exp +1

            int exp = findMember.getExp();

            if(exp == 1 || exp == 3 || exp == 8 || exp == 13 || exp == 18 ||
                    exp == 23 || exp == 28 || exp == 33 || exp == 38 || exp == 43){

                findMember.setLevel(findMember.getLevel() + 1);
            }
        }

        if(afterPercent < 1) {

            if (beforePercent == 1) {

                findMember.setExp(findMember.getExp() - 1);

                int exp = findMember.getExp();

                if (exp < 1 || exp == 2 || exp == 7 || exp == 12 || exp == 17 ||
                        exp == 22 || exp == 27 || exp == 32 || exp == 37 || exp == 42) {

                    findMember.setLevel(findMember.getLevel() - 1);

                }
            }
        }
    }




    // Todo 할 일 등록
    public Todo createTodo(Todo todo){

        long findMemberId = todo.getMember().getMemberId();
        LocalDate findDate = todo.getDate();

        double beforePercent = calculatePercent(findMemberId, findDate);

        if(beforePercent == 0) {

            return todoRepository.save(todo);
        }
        else{

            Todo savedTodo = todoRepository.save(todo);

            double afterPercent = calculatePercent(findMemberId, findDate);

            setExpAndLevel(findMemberId, beforePercent, afterPercent);

            return savedTodo;
        }
    }

    // Todo 할 일 여러 개 등록
    public void createTodos(List<Todo> todos){

        long findMemberId = todos.stream().map(todo -> todo.getMember().getMemberId()).findAny().orElse(null);
        LocalDate date = todos.stream().map(todo -> todo.getDate()).findAny().orElse(null);

        double beforePercent = calculatePercent(findMemberId, date);


        if(beforePercent == 0){

            todoRepository.saveAll(todos);

        }

        else {

            todoRepository.saveAll(todos);

            double afterPercent = calculatePercent(findMemberId, date);

            setExpAndLevel(findMemberId, beforePercent, afterPercent);

        }
    }

    // Todo 수정

    public Todo updateTodo(Todo todo, String accessToken){

        Todo findTodo = findVerifiedTodo(todo.getTodoId());

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);

        Optional.ofNullable(todo.getContent())
                .ifPresent(content -> findTodo.setContent(content));

        Optional.ofNullable(todo.getDate())
                .ifPresent(date -> findTodo.setDate(date));

        Optional.ofNullable(todo.getTodoEmoji())
                .ifPresent(todoEmoji -> findTodo.setTodoEmoji(todoEmoji));


        if(todo.getTag() != null){

            Tag findTag = tagService.findVerifiedTag(todo.getTag().getTagId());
            todo.setTag(findTag);

            findTodo.setTag(findTag);
        }

        return todoRepository.save(findTodo);
    }

    // Todo 완료 여부
    public Todo updateTodoComplete(Todo todo, String accessToken){

        Todo findTodo = findVerifiedTodo(todo.getTodoId());

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);

        long findMemberId = findTodo.getMember().getMemberId();
        LocalDate findDate = findTodo.getDate();

        double beforePercent = calculatePercent(findMemberId, findDate);

        if(todo.getComplete() != findTodo.getComplete()){

            findTodo.setComplete(todo.getComplete());
        }


        Todo updatedTodo = todoRepository.save(findTodo);

        double afterPercent = calculatePercent(findMemberId, findDate);

        setExpAndLevel(findMemberId, beforePercent, afterPercent);

        return updatedTodo;
    }


    // Todo 단일 조회
    public Todo findTodo(long todoId, String accessToken) {

        Todo findTodo = findVerifiedTodo(todoId);

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);

        return findTodo;
    }


    // Todo 리스트 조회
    public List<Todo> findTodos(LocalDate date, long memberId, String accessToken){

        memberService.checkMemberId(memberId, accessToken);

//        List<Todo> findTodos = todoRepository.findByDate(date);
//
//        List<Todo> todos =
//                findTodos.stream()
//                        .filter(todo -> todo.getMember().getMemberId() == memberId)
//                        .collect(Collectors.toList());

        List<Todo> todos = todoRepository.findByMemberMemberIdAndDate(memberId, date);

        return todos;
    }



    // Todo 삭제
    public void deleteTodo(long todoId, String accessToken){

        Todo findTodo = findVerifiedTodo(todoId);

        memberService.checkMemberId(findTodo.getMember().getMemberId(), accessToken);

        long findMemberId = findTodo.getMember().getMemberId();
        LocalDate findDate = findTodo.getDate();

        double beforePercent = calculatePercent(findMemberId, findDate);

        todoRepository.delete(findTodo);

        double afterPercent = calculatePercent(findMemberId, findDate);

        setExpAndLevel(findMemberId, beforePercent, afterPercent);
    }
}
