package com.seb45_main_031.routine.savedTodo.mapper;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.savedTodo.dto.SavedTodoDto;
import com.seb45_main_031.routine.savedTodo.entity.SavedTodo;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.todoStorage.entity.TodoStorage;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SavedTodoMapper {

    // post -> entity
    default SavedTodo savedTodoPostDtoToSavedTodo(SavedTodoDto.Post savedTodoPostDto){

        SavedTodo savedTodo = new SavedTodo();
        savedTodo.setContent(savedTodoPostDto.getContent());
        savedTodo.setEmoji(savedTodoPostDto.getEmoji());

        Member member = new Member();
        member.setMemberId(savedTodoPostDto.getMemberId());
        savedTodo.setMember(member);

        TodoStorage todoStorage = new TodoStorage();
        todoStorage.setTodoStorageId(savedTodoPostDto.getTodoStorageId());
        savedTodo.setTodoStorage(todoStorage);

        Tag tag = new Tag();
        tag.setTagId(savedTodoPostDto.getTagId());
        savedTodo.setTag(tag);

        return savedTodo;


    }

    default List<SavedTodo> savedTodoPostListDtoToSavedTodos(SavedTodoDto.PostList savedTodoPostListDto){

        long todoStorageId = savedTodoPostListDto.getTodoStorageId();

        savedTodoPostListDto.getPosts().stream()
                .forEach(post -> post.setTodoStorageId(todoStorageId));

        List<SavedTodo> savedTodos = savedTodoPostListDto.getPosts().stream()
                .map(post -> savedTodoPostDtoToSavedTodo(post))
                .collect(Collectors.toList());

        return savedTodos;

    }

    // patch -> entity
    default SavedTodo savedTodoPatchDtoToSavedTodo(SavedTodoDto.Patch savedTodoPatchDto){

        SavedTodo savedTodo = new SavedTodo();
        savedTodo.setSavedTodoId(savedTodoPatchDto.getSavedTodoId());
        savedTodo.setContent(savedTodoPatchDto.getContent());
        savedTodo.setEmoji(savedTodoPatchDto.getEmoji());


        if(savedTodoPatchDto.getTagId() != 0) {
            Tag tag = new Tag();
            tag.setTagId(savedTodoPatchDto.getTagId());

            savedTodo.setTag(tag);
        }

        return savedTodo;

    }


    // entity -> response

    default SavedTodoDto.Response savedTodoToSavedTodoResponseDto(SavedTodo savedTodo){

        SavedTodoDto.Response response = SavedTodoDto.Response.builder()
                .savedTodoId(savedTodo.getSavedTodoId())
                .content(savedTodo.getContent())
                .emoji(savedTodo.getEmoji())
                .build();

        SavedTodoDto.TodoStorageResponse todoStorageResponse = SavedTodoDto.TodoStorageResponse.builder()
                .todoStorageId(savedTodo.getTodoStorage().getTodoStorageId())
                .category(savedTodo.getTodoStorage().getCategory())
                .build();

        response.setTodoStorageResponse(todoStorageResponse);


        SavedTodoDto.UserInfo userInfo = SavedTodoDto.UserInfo.builder()
                .memberId(savedTodo.getMember().getMemberId())
                .build();

        response.setUserInfo(userInfo);



        SavedTodoDto.TagResponse tagResponse = SavedTodoDto.TagResponse.builder()
                .tagId(savedTodo.getTag().getTagId())
                .tagName(savedTodo.getTag().getTagName())
                .build();

        response.setTagResponse(tagResponse);


        return response;

    }

    List<SavedTodoDto.Response> savedTodosToSavedTodoResponseDtos(List<SavedTodo> savedTodos);



}
