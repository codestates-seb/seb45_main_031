package com.seb45_main_031.routine.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PageInfo {

    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

}
