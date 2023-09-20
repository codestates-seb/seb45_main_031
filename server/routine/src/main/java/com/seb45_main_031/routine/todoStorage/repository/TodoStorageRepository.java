package com.seb45_main_031.routine.todoStorage.repository;

import com.seb45_main_031.routine.todoStorage.entity.TodoStorage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TodoStorageRepository extends JpaRepository<TodoStorage, Long> {

    Page<TodoStorage> findByMemberMemberId(long memberId, Pageable pageable);
}
