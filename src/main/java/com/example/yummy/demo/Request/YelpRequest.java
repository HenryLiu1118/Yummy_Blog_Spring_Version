package com.example.yummy.demo.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YelpRequest {
    private String term;
    @NotBlank(message = "location cannot be blank")
    private String location;
    private String categories;
    private String limit;
    private String price;
}
