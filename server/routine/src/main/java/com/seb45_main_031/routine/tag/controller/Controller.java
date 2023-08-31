package com.seb45_main_031.routine.tag.controller;

import com.seb45_main_031.routine.tag.dto.TagDto;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.tag.mapper.TagMapper;
import com.seb45_main_031.routine.tag.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tags")
public class Controller {

    private final TagService tagService;
    private final TagMapper mapper;

    public Controller(TagService tagService, TagMapper mapper) {
        this.tagService = tagService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postTag(@RequestBody TagDto.Post tagPostDto){

        Tag tag = tagService.createTag(mapper.tagPostDtoToTag(tagPostDto));

        return new ResponseEntity(HttpStatus.CREATED);

    }


}
