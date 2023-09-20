package com.seb45_main_031.routine.savedTodo.repository;

import com.seb45_main_031.routine.savedTodo.entity.SavedTodo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedTodoRepository extends JpaRepository<SavedTodo, Long> {

//    Page<SavedTodo> findByTodoStorageTodoStorageId(long todoStorageId, Pageable pageable);
}
