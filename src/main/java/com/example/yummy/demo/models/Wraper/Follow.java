package com.example.yummy.demo.models.Wraper;

import com.example.yummy.demo.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Follow {

    @DBRef
    @JsonIgnore
    private User user;
    private String userId;
}
