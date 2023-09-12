package com.seb45_main_031.routine.savedTodo.service;

import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.member.service.MemberService;
import com.seb45_main_031.routine.savedTodo.entity.SavedTodo;
import com.seb45_main_031.routine.savedTodo.repository.SavedTodoRepository;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.tag.service.TagService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SavedTodoService {

    private final SavedTodoRepository savedTodoRepository;
    private final MemberService memberService;
    private final TagService tagService;

    public SavedTodoService(SavedTodoRepository savedTodoRepository, MemberService memberService, TagService tagService) {
        this.savedTodoRepository = savedTodoRepository;
        this.memberService = memberService;
        this.tagService = tagService;
    }



    private SavedTodo findVerifiedSavedTodo(long savedTodoId){
        Optional<SavedTodo> optionalSavedTodo = savedTodoRepository.findById(savedTodoId);
        SavedTodo findSavedTodo = optionalSavedTodo.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.SAVEDTODO_NOT_FOUND));

        return findSavedTodo;
    }

    public SavedTodo createSavedTodo(SavedTodo savedTodo){
        return savedTodoRepository.save(savedTodo);
    }

    public List<SavedTodo> createSavedTodos(List<SavedTodo> savedTodos){
        return savedTodoRepository.saveAll(savedTodos);
    }

    public SavedTodo updateSavedTodo(SavedTodo savedTodo, String accessToken){

        SavedTodo findSavedTodo = findVerifiedSavedTodo(savedTodo.getSavedTodoId());
        memberService.checkMemberId(findSavedTodo.getMember().getMemberId(), accessToken);

        Optional.ofNullable(savedTodo.getContent())
                        .ifPresent(content -> findSavedTodo.setContent(content));
        Optional.ofNullable(savedTodo.getEmoji())
                .ifPresent(emoji -> findSavedTodo.setEmoji(emoji));

        if(savedTodo.getTag() != null){
            Tag findTag = tagService.findVerifiedTag(savedTodo.getTag().getTagId());
            findSavedTodo.setTag(findTag);
        }

        return savedTodoRepository.save(findSavedTodo);

    }

    public SavedTodo findSavedTodo(long savedTodoId, String accessToken){

        SavedTodo findSavedTodo = findVerifiedSavedTodo(savedTodoId);

        memberService.checkMemberId(findSavedTodo.getMember().getMemberId(), accessToken);

        return findSavedTodo;
    }


    public void deleteSavedTodo(long savedTodoId, String accessToken){

        SavedTodo findSavedTodo = findVerifiedSavedTodo(savedTodoId);

        memberService.checkMemberId(findSavedTodo.getMember().getMemberId(), accessToken);

        savedTodoRepository.delete(findSavedTodo);

    }



}

