package com.seb45_main_031.routine.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {

    public static URI createUri(String defaultUri, long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUri + "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }
}
