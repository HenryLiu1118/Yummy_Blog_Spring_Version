package com.example.yummy.demo.Repository;

import com.example.yummy.demo.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    User findBy_id(String _id);
    User findByEmail(String email);
}
