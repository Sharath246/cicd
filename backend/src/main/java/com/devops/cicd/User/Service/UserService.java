package com.devops.cicd.User.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.devops.cicd.User.DTO.LoginDTO;
import com.devops.cicd.User.DTO.RegisterDTO;
import com.devops.cicd.User.Entity.User;
import com.devops.cicd.User.Repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    public String saveUser(RegisterDTO registerDTO){
        try{
            User user = new User(registerDTO.email(), registerDTO.username(), registerDTO.password() );
            userRepo.save(user);
            return "Success";
        }
        catch(Exception e){
            return e.getMessage();
        }
    }

    public Optional<User> getUserByEmail(String email){
        return userRepo.findByEmail(email);
    }

    public boolean login(String email, String password){
        Optional<User> user = getUserByEmail(email);
        return user.map(value -> value.getPassword().equals(password)).orElse(false);
    }
}
