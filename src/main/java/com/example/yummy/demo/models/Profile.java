package com.example.yummy.demo.models;

import com.example.yummy.demo.models.Wraper.Follow;
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
@Document(collection = "profiles")
public class Profile {

    @Id
    private String _id;

    @DBRef
    private User user;
    private String location;
    private List<String> favorites;
    private String bio;

    private List<Follow> follows;
    private Date date;
}
