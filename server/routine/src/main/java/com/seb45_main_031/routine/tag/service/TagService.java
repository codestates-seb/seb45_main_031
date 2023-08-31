package com.seb45_main_031.routine.tag.service;

import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.tag.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }


    public Tag createTag(Tag tag){
        return tagRepository.save(tag);
    }

}
