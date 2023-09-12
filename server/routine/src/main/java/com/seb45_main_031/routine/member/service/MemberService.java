package com.seb45_main_031.routine.member.service;

import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.auth.utils.CustomAuthorityUtils;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;

    public MemberService(MemberRepository memberRepository,
                         CustomAuthorityUtils customAuthorityUtils,
                         PasswordEncoder passwordEncoder,
                         JwtTokenizer jwtTokenizer) {
        this.memberRepository = memberRepository;
        this.customAuthorityUtils = customAuthorityUtils;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenizer = jwtTokenizer;
    }

    public Member findverifiedMember(long memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        Member findMember = optionalMember
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);

        if(member.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    private void verifyExistsNickname(String nickname){
        Optional<Member> member = memberRepository.findByNickname(nickname);

        if(member.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NICKNAME_EXISTS);
        }
    }

    public void checkMemberId(long memberId, String accessToken){

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        long findMemberId = jwtTokenizer.getMemberIdFromAccessToken(accessToken, base64EncodedSecretKey);

        if(memberId != findMemberId){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCHED);
        }
    }

    public long findMemberId(String accessToken){
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        long findMemberId = jwtTokenizer.getMemberIdFromAccessToken(accessToken, base64EncodedSecretKey);

        return findMemberId;
    }

    private long verifyRefreshToken(String refreshToken, String base64EncodedSecretKey){

        long findMemberId = jwtTokenizer.getMemberIdFromRefreshToken(refreshToken, base64EncodedSecretKey);

        return findMemberId;
    }

    private String delegateAccessToken(long findMemberId, String base64EncodedSecretKey){

        Member findMember = findverifiedMember(findMemberId);

        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", findMember.getMemberId());
        claims.put("username", findMember.getEmail());
        claims.put("roles", findMember.getRoles());

        String subject = findMember.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;

    }


    public Member createMember(Member member){

        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = customAuthorityUtils.createRoles(member.getEmail());

        member.setRoles(roles);

        return memberRepository.save(member);

    }

    public String renewAccessToken(String refreshToken){

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        long findMemberId = verifyRefreshToken(refreshToken, base64EncodedSecretKey);

        String accessToken = delegateAccessToken(findMemberId, base64EncodedSecretKey);

        return "Bearer " + accessToken;

    }


    public Member updateMember(Member member, String accessToken){
        Member findMember = findverifiedMember(member.getMemberId());

        checkMemberId(findMember.getMemberId(), accessToken);

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> {
                    if(!nickname.equals(findMember.getNickname())){
                        verifyExistsNickname(nickname);
                    }
                    findMember.setNickname(nickname);
                });

        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

        return memberRepository.save(findMember);

    }

    public Member findMember(long memberId, String accessToken){

        Member findMember = findverifiedMember(memberId);

        checkMemberId(findMember.getMemberId(), accessToken);

        return findMember;
    }

    public Page<Member> findMembers(int page, int size){
        return memberRepository.findAll(
                PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId, String password, String accessToken){
        Member findMember = findverifiedMember(memberId);
        checkMemberId(findMember.getMemberId(), accessToken);

        if(!passwordEncoder.matches(password, findMember.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_PASSWORD_NOT_MATCHED);
        }

        memberRepository.delete(findMember);

    }

}
