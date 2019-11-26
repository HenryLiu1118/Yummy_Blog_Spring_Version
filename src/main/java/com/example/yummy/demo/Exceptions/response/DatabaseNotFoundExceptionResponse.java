package com.example.yummy.demo.Exceptions.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DatabaseNotFoundExceptionResponse {
    private String msg;
}
