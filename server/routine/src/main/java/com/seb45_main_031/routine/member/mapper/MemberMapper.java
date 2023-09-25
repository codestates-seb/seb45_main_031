package com.seb45_main_031.routine.member.mapper;

import com.seb45_main_031.routine.member.dto.MemberDto;
import com.seb45_main_031.routine.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post memberPostDto);
    // memberPostDto -> Member -> return

    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);

    MemberDto.Response memberToMemberResponseDto(Member member);

    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

    MemberDto.ImageResponse memberToMemberImageResponseDto(Member member);




}
