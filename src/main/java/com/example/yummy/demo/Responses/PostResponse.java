package com.example.yummy.demo.Responses;

import com.example.yummy.demo.models.Dtos.PostDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponse {
    private List<PostDto> posts;
    private int count;
}
