package com.seb45_main_031.routine.auth.handler;

import com.seb45_main_031.routine.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        log.error("error: {}", exception.getMessage());

        if(exception instanceof BadCredentialsException){
            ErrorResponder.sendPasswordErrorResponse(response, HttpStatus.UNAUTHORIZED);
        }

        else{
            ErrorResponder.sendUsernameErrorResponse(response, HttpStatus.UNAUTHORIZED);
        }

    }


}
