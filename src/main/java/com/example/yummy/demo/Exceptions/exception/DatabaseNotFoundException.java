package com.example.yummy.demo.Exceptions.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DatabaseNotFoundException extends RuntimeException{
    public DatabaseNotFoundException(String message) {
        super(message);
    }
}
