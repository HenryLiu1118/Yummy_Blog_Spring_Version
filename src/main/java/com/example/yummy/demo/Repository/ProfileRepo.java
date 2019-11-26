package com.example.yummy.demo.Repository;

import com.example.yummy.demo.models.Profile;
import com.example.yummy.demo.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepo extends MongoRepository<Profile, String> {
    Profile findBy_id(String _id);
    Profile findByUser(User user);
}
