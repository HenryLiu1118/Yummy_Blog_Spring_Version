package com.example.yummy.demo.models.Wraper;

import com.example.yummy.demo.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Like {
    @DBRef
    @JsonIgnore
    private User user;
    private String userId;
}
