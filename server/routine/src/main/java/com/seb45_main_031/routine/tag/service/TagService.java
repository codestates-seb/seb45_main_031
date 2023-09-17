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

    private void verifyExistsTagName(String tagName){
        Optional<Tag> optionalTag = tagRepository.findByTagName(tagName);

        if(optionalTag.isPresent()){
            throw new BusinessLogicException(ExceptionCode.TAG_EXISTS);
        }
    }

    public Tag createTag(Tag tag){
        verifyExistsTagName(tag.getTagName());
        return tagRepository.save(tag);
    }

    public Tag updateTag(Tag tag){
        Tag findTag = findVerifiedTag(tag.getTagId());

        Optional.ofNullable(tag.getTagName())
                .ifPresent(tagName -> {
                    if(!tagName.equals(findTag.getTagName())){
                        verifyExistsTagName(tagName);
                    }
                    findTag.setTagName(tagName);
                });

        return tagRepository.save(findTag);
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
