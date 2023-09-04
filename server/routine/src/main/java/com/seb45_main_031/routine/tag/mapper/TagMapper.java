package com.seb45_main_031.routine.tag.mapper;

import com.seb45_main_031.routine.tag.dto.TagDto;
import com.seb45_main_031.routine.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {

    Tag tagPostDtoToTag(TagDto.Post tagPostDto);

    TagDto.Response tagToTagResponseDto(Tag tag);

    List<TagDto.Response> tagsToTagResponseDtos(List<Tag> tags);

}
