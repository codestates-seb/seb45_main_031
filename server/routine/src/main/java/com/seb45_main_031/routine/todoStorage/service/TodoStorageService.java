package com.seb45_main_031.routine.todoStorage.service;

import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.member.service.MemberService;
import com.seb45_main_031.routine.todoStorage.entity.TodoStorage;
import com.seb45_main_031.routine.todoStorage.repository.TodoStorageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TodoStorageService {

    private final TodoStorageRepository todoStorageRepository;
    private final MemberService memberService;

    public TodoStorageService(TodoStorageRepository todoStorageRepository, MemberService memberService) {
        this.todoStorageRepository = todoStorageRepository;
        this.memberService = memberService;
    }


    private TodoStorage findVerifiedTodoStorage(long todoStorageId){
        Optional<TodoStorage> optionalTodoStorage = todoStorageRepository.findById(todoStorageId);

        TodoStorage findTodoStorage = optionalTodoStorage
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODOSTORAGE_NOT_FOUND));

        return findTodoStorage;

    }

    public TodoStorage createTodoStorage(TodoStorage todoStorage){

        return todoStorageRepository.save(todoStorage);
    }

    public TodoStorage updateTodoStorage(TodoStorage todoStorage, String accessToken){
        TodoStorage findTodoStorage = findVerifiedTodoStorage(todoStorage.getTodoStorageId());

        memberService.checkMemberId(findTodoStorage.getMember().getMemberId(), accessToken);

        Optional.ofNullable(todoStorage.getCategory())
                        .ifPresent(category -> findTodoStorage.setCategory(category));

        return todoStorageRepository.save(findTodoStorage);
    }

    public TodoStorage findTodoStorage(long todoStorageId, String accessToken){
        TodoStorage findTodoStorage = findVerifiedTodoStorage(todoStorageId);

        memberService.checkMemberId(findTodoStorage.getMember().getMemberId(), accessToken);

        return findTodoStorage;

    }

    public Page<TodoStorage> findTodoStorages(int page, int size, String accessToken){

        long findMemberId = memberService.findMemberId(accessToken);

        return todoStorageRepository
                .findByMemberMemberId(findMemberId, PageRequest.of(page, size, Sort.by("todoStorageId")));
    }

    public void deleteTodoStorage(long todoStorageId, String accessToken){

        TodoStorage findTodoStorage = findVerifiedTodoStorage(todoStorageId);
        memberService.checkMemberId(findTodoStorage.getMember().getMemberId(), accessToken);

        todoStorageRepository.delete(findTodoStorage);
    }
}
