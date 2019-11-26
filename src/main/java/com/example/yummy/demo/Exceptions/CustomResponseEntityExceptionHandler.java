package com.example.yummy.demo.Exceptions;

import com.example.yummy.demo.Exceptions.exception.DatabaseDuplicateException;
import com.example.yummy.demo.Exceptions.exception.DatabaseNotFoundException;
import com.example.yummy.demo.Exceptions.response.DatabaseDuplicateExceptionResponse;
import com.example.yummy.demo.Exceptions.response.DatabaseNotFoundExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleDatabaseDuplicateException(DatabaseDuplicateException ex, WebRequest request) {
        DatabaseDuplicateExceptionResponse response = new DatabaseDuplicateExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDatabaseNotFoundException(DatabaseNotFoundException ex, WebRequest request) {
        DatabaseNotFoundExceptionResponse response = new DatabaseNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
