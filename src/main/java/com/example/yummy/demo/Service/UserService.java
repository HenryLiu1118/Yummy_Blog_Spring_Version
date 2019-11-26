package com.example.yummy.demo.Service;
import com.example.yummy.demo.Exceptions.exception.DatabaseDuplicateException;
import com.example.yummy.demo.Repository.UserRepo;
import com.example.yummy.demo.Request.RegisterRequest;
import com.example.yummy.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerUser(RegisterRequest registerRequest) {
        User user = userRepo.findByEmail(registerRequest.getEmail());
        if (user != null) {
            throw new DatabaseDuplicateException("DuplicateAccountException");
        }
        user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(bCryptPasswordEncoder.encode(registerRequest.getPassword()))
                .date(new Date())
                .build();

        userRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);

        return new org.springframework.security.core.userdetails.User(email, user.getPassword(), new ArrayList<>());
    }

    public User loadUserById(String id) {
        User user = userRepo.findBy_id(id);
        return user;
    }
}
