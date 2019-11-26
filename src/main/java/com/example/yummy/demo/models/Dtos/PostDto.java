package com.example.yummy.demo.models.Dtos;

import com.example.yummy.demo.models.Wraper.Comment;
import com.example.yummy.demo.models.Wraper.Like;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private String _id;
    private UserDto user;
    private String userName;
    private String text;
    private String yelpId;
    private String postName;
    private String image_url;
    private String rating;
    private String location;
    private String price;
    private String phone;
    private String distance;
    private List<Like> likes;
    private List<Comment> comments;
    private Date date;
}
