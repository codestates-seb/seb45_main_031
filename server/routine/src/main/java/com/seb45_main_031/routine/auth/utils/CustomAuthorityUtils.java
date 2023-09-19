package com.seb45_main_031.routine.auth.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    // 권한정보를 생성하는 유틸

    @Value("${mail.address.admin}")
    private String adminMailAddress;

    private final List<String> ADMIN_ROLE = List.of("USER", "ADMIN");
    private final List<String> USER_ROLE = List.of("USER");

    // 권한 정보 생성하는 메소드
    public List<String> createRoles(String email){
        if(email.equals(adminMailAddress)){
            return ADMIN_ROLE;
        }
        return USER_ROLE;
    }

    public List<GrantedAuthority> createAuthorities(List<String> roles){
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());

        return authorities;
    }

}
