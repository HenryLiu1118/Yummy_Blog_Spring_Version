package com.example.yummy.demo.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequest {
    @NotBlank(message = "Cannot be blank")
    private String location;
    @NotBlank(message = "Cannot be blank")
    private String favorites;
    private String bio;
}
