package com.seb45_main_031.routine.auth.config;

import com.seb45_main_031.routine.auth.filter.JwtAuthenticationFilter;
import com.seb45_main_031.routine.auth.filter.JwtVerificationFilter;
import com.seb45_main_031.routine.auth.handler.*;
import com.seb45_main_031.routine.auth.jwt.JwtTokenizer;
import com.seb45_main_031.routine.auth.utils.CustomAuthorityUtils;
import com.seb45_main_031.routine.member.repository.MemberRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberRepository memberRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils customAuthorityUtils,
                                 MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.customAuthorityUtils = customAuthorityUtils;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/members/image").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/members/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members/myPage/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/feeds").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/feeds/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/feeds/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/feeds/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/comments").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/feedLikes").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/todos/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/todos/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/todos/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/todos/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/tags").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/tags/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/tags/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/tags/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/todoStorages").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/todoStorages/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/todoStorages/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/todoStorages/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/savedTodos/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/savedTodos/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/savedTodos/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/savedTodos/**").hasRole("USER")
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2LoginSuccessHandler(jwtTokenizer, customAuthorityUtils, memberRepository)));

        return http.build();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter
                    = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter
                    = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));

        configuration.setAllowedHeaders(Arrays.asList("*"));

        configuration.setExposedHeaders(Arrays.asList("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
