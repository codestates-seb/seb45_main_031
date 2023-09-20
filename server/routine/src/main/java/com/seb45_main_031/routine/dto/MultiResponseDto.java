package com.seb45_main_031.routine.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber()+1, page.getSize(),
                                            page.getTotalElements(), page.getTotalPages());

        // page -> Page<Member>
        // -> page -> number +1
        // -> page -> size
        // -> page -> 전체 레코드 개수
        // -> page -> 전체 페이지

    }
}
