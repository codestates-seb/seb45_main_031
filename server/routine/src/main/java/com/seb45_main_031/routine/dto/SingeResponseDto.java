package com.seb45_main_031.routine.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SingeResponseDto<T> {
    private T data;
}
