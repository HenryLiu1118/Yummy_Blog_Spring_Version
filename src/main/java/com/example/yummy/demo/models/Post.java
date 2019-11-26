package com.example.yummy.demo.models;

import com.example.yummy.demo.models.Wraper.Comment;
import com.example.yummy.demo.models.Wraper.Like;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String _id;
    @DBRef
    private User user;
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
