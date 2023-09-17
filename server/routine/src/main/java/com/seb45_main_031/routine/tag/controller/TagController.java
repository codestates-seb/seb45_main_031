package com.seb45_main_031.routine.tag.controller;

import com.seb45_main_031.routine.dto.MultiResponseDto;
import com.seb45_main_031.routine.dto.SingleResponseDto;
import com.seb45_main_031.routine.tag.dto.TagDto;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.tag.mapper.TagMapper;
import com.seb45_main_031.routine.tag.service.TagService;
import com.seb45_main_031.routine.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tags")
@Validated
public class TagController {

    private final TagService tagService;
    private final TagMapper mapper;

    private static final String TAG_DEFAULT_URL = "/tags";

    public TagController(TagService tagService, TagMapper mapper) {
        this.tagService = tagService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postTag(@RequestBody @Valid TagDto.Post tagPostDto){
        Tag tag = tagService.createTag(mapper.tagPostDtoToTag(tagPostDto));

        URI location = UriCreator.createUri(TAG_DEFAULT_URL, tag.getTagId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{tag-id}")
    public ResponseEntity patchTag(@RequestBody @Valid TagDto.Patch tagPatchDto,
                                   @PathVariable("tag-id") @Positive long tagId){
        tagPatchDto.setTagId(tagId);
        Tag tag = tagService.updateTag(mapper.tagPatchDtoToTag(tagPatchDto));
        return new ResponseEntity(new SingleResponseDto<>(mapper.tagToTagResponseDto(tag)), HttpStatus.OK);
    }

    @GetMapping("/{tag-id}")
    public ResponseEntity getTag(@PathVariable("tag-id") @Positive long tagId){

        Tag tag = tagService.findTag(tagId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.tagToTagResponseDto(tag)), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity getTags(@RequestParam @Positive int page,
                                  @RequestParam @Positive int size){

        Page<Tag> pageTags = tagService.findTags(page - 1, size);
        List<Tag> tags = pageTags.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.tagsToTagResponseDtos(tags), pageTags), HttpStatus.OK);
    }

    @DeleteMapping("/{tag-id}")
    public ResponseEntity delete(@PathVariable("tag-id") @Positive long tagId){

        tagService.deleteTag(tagId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
