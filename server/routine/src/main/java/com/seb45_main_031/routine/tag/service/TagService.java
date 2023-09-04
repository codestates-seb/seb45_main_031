package com.seb45_main_031.routine.tag.service;

import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.tag.entity.Tag;
import com.seb45_main_031.routine.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag findVerifiedTag(long tagId){
        Optional<Tag> optionalTag = tagRepository.findById(tagId);

        Tag findTag = optionalTag.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        return findTag;
    }

    public Tag createTag(Tag tag){
        return tagRepository.save(tag);
    }

    public Tag findTag(long tagId){
        return findVerifiedTag(tagId);
    }

    public Page<Tag> findTags(int page, int size){
        return tagRepository.findAll(PageRequest.of(page, size, Sort.by("tagId")));
    }

    public void deleteTag(long tagId){
        Tag findTag = findVerifiedTag(tagId);
        tagRepository.delete(findTag);
    }




}
