package com.seb45_main_031.routine.auth.utils;

import com.google.gson.Gson;
import com.seb45_main_031.routine.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {

    private static void common(HttpServletResponse response,
                               HttpStatus httpStatus,
                               ErrorResponse errorResponse) throws IOException{

        Gson gson = new Gson();

        response.setStatus(httpStatus.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));

    }

    public static void sendErrorResponse(HttpServletResponse response, HttpStatus httpStatus) throws IOException{

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusAndMessageFromHttpStatus(httpStatus);

        common(response, httpStatus, errorResponse);

    }

    public static void sendUsernameErrorResponse(HttpServletResponse response, HttpStatus httpStatus) throws IOException{

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusAndMessageFromHttpStatusAndMessage(
                httpStatus, "Username not found");

        common(response, httpStatus, errorResponse);

    }

    public static void sendPasswordErrorResponse(HttpServletResponse response, HttpStatus httpStatus) throws IOException{

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusAndMessageFromHttpStatusAndMessage(
                httpStatus, "Password is not correct");

        common(response, httpStatus, errorResponse);

    }


    public static void sendJwtErrorResponse(HttpServletResponse response, HttpStatus httpStatus) throws IOException{

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusAndMessageFromHttpStatusAndMessage(
                httpStatus, "AccessToken expired");

        common(response, httpStatus, errorResponse);

    }
}
