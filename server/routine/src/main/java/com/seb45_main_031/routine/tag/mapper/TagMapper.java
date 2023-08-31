package com.seb45_main_031.routine.tag.mapper;

import com.seb45_main_031.routine.tag.dto.TagDto;
import com.seb45_main_031.routine.tag.entity.Tag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {

    Tag tagPostDtoToTag(TagDto.Post tagPostDto);

}
