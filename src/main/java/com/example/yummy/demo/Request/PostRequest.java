package com.example.yummy.demo.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostRequest {
    @NotBlank(message = "Text cannot be blank")
    private String text;
    private String yelpId;
    private String postName;
    private String image_url;
    private String rating;
    private String price;
    private String phone;
    private String distance;
    private String location;
}
