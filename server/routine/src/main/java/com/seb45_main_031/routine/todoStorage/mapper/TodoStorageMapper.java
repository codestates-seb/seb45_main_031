package com.seb45_main_031.routine.todoStorage.mapper;

import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.savedTodo.entity.SavedTodo;
import com.seb45_main_031.routine.todoStorage.dto.TodoStorageDto;
import com.seb45_main_031.routine.todoStorage.entity.TodoStorage;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TodoStorageMapper {

    // postDto -> entity
    default TodoStorage todoStoragePostDtoToTodoStorage(TodoStorageDto.Post todoStoragePostDto){

        Member member = new Member();
        member.setMemberId(todoStoragePostDto.getMemberId());

        TodoStorage todoStorage = new TodoStorage();
        todoStorage.setCategory(todoStoragePostDto.getCategory());
        todoStorage.setMember(member);

        return todoStorage;
    }

    // patchDto -> entity
    TodoStorage todoStoragePatchDtoToTodoStorage(TodoStorageDto.Patch todoStoragePatchDto);

    // entity -> responseDto
    default TodoStorageDto.Response todoStorageToTodoStorageResponseDto(TodoStorage todoStorage){

        TodoStorageDto.Response response = TodoStorageDto.Response.builder()
                .todoStorageId(todoStorage.getTodoStorageId())
                .category(todoStorage.getCategory())
                .build();

        TodoStorageDto.UserInfo userInfo = TodoStorageDto.UserInfo.builder()
                .memberId(todoStorage.getMember().getMemberId())
                .build();

        response.setUserInfo(userInfo);

        return response;

    }

    List<TodoStorageDto.Response> todoStoragesToTodoStorageResponseDtos(List<TodoStorage> todoStorages);

    default TodoStorageDto.StorageResponse todoStorageToTodoStorageResponseDtos(TodoStorage todoStorage){


        // todoStorage -> List<SavedTodo>
        //     public static class StorageResponse{
        //        private long todoStorageId;
        //        private String category;
        //        private UserInfo userInfo;
        //        private List<SavedTodoResponse> savedTodoResponses;
        //    }
        //
        //    @Getter
        //    @Setter
        //    @Builder
        //    public static class SavedTodoResponse{
        //        private long savedTodoId;
        //        private String content;
        //        private String emoji;
        //        private long tagId;
        //        private String tagName;
        //        private long memberId;
        //    }

        TodoStorageDto.StorageResponse response = TodoStorageDto.StorageResponse.builder()
                .todoStorageId(todoStorage.getTodoStorageId())
                .category(todoStorage.getCategory())
                .build();

        TodoStorageDto.UserInfo userInfo = TodoStorageDto.UserInfo.builder()
                .memberId(todoStorage.getMember().getMemberId())
                .build();

        response.setUserInfo(userInfo);

        List<SavedTodo> savedTodos = todoStorage.getSavedTodos();

        List<TodoStorageDto.SavedTodoResponse> savedTodoResponses
                = savedTodos.stream()
                .map(savedTodo -> {
                    TodoStorageDto.SavedTodoResponse savedTodoResponse
                            = TodoStorageDto.SavedTodoResponse.builder()
                            .savedTodoId(savedTodo.getSavedTodoId())
                            .content(savedTodo.getContent())
                            .emoji(savedTodo.getEmoji())
                            .memberId(savedTodo.getMember().getMemberId())
                            .build();

                    if(savedTodo.getTag() != null){
                        TodoStorageDto.TagResponse tagResponse = TodoStorageDto.TagResponse.builder()
                                .tagId(savedTodo.getTag().getTagId())
                                .tagName(savedTodo.getTag().getTagName())
                                .build();
                        savedTodoResponse.setTagResponse(tagResponse);
                    }
                    return savedTodoResponse;

                }).collect(Collectors.toList());




        response.setSavedTodoResponses(savedTodoResponses);

        return response;

    }


}
