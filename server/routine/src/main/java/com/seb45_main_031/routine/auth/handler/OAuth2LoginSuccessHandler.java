package com.seb45_main_031.routine.auth.handler;

import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.auth.utils.CustomAuthorityUtils;
import com.seb45_main_031.routine.member.entity.Member;
import com.seb45_main_031.routine.member.repository.MemberRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberRepository memberRepository;

    public OAuth2LoginSuccessHandler(JwtTokenizer jwtTokenizer,
                                     CustomAuthorityUtils customAuthorityUtils,
                                     MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.customAuthorityUtils = customAuthorityUtils;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));

        Optional<Member> findMemberByEmailAndSignupType
                = memberRepository.findByEmailAndSignupType(email, Member.SignupType.GOOGLE_OAUTH2);

        if(findMemberByEmailAndSignupType.isPresent()){

            redirect(request, response, findMemberByEmailAndSignupType.get());

        }
        else{

            Member savedMember = saveMemberToDB(email, nickname);
            redirect(request, response, savedMember);

        }

    }

    private Member saveMemberToDB(String email, String nickname){
        Member member = new Member();
        member.setEmail(email);

        member.setSignupType(Member.SignupType.GOOGLE_OAUTH2);

        List<String> roles = customAuthorityUtils.createRoles(email);

        member.setRoles(roles);

        Optional<Member> findMemberByNickname = memberRepository.findByNickname(nickname);

        if(findMemberByNickname.isPresent()){
            nickname = nickname + System.currentTimeMillis();
            member.setNickname(nickname);
        }
        else{
            member.setNickname(nickname);
        }

        return memberRepository.save(member);

    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member) throws IOException{

        String accessToken = "Bearer " + delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        String uri = createURI(accessToken, refreshToken, member).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(Member member){
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member){
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(claims, subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken, Member member){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();

        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("memberId", String.valueOf(member.getMemberId()));

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("healthier31.vercel.app")
                .port(443)
                .path("/receive")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
