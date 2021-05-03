package com.example.yummy.demo.Repository;

import com.example.yummy.demo.models.Post;
import com.example.yummy.demo.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface PostRepo extends MongoRepository<Post, String> {
    Post findBy_id(String _id);

    //for regular list
    List<Post> findAllByUser(User user);

    //for page
    Page<Post> findAll(Pageable pageableRequest);
    Page<Post> findAllByUser(User user, Pageable pageableRequest);
}
