package com.example.yummy.demo.models.Dtos;

import com.example.yummy.demo.models.Wraper.Follow;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDto {
    private String _id;
    private UserDto user;
    private String location;
    private List<String> favorites;
    private String bio;
    private List<Follow> follows;
    private Date date;
}
