package com.devops.cicd.User.Service;

import java.util.Optional;

import com.devops.cicd.User.DTO.UserDataDTO;
import com.devops.cicd.Utils.Constants;
import org.springframework.stereotype.Service;
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

    public String login(String email, String password){
        Optional<User> person = getUserByEmail(email);
        if(person.isPresent())
        {
            User user = person.get();
            if(user.getPassword().equals(password))
                return Constants.SUCCESSFUL;
            else
                return Constants.INCORRECT_PASSWORD;
        }
        else
            return Constants.USER_NOT_FOUND;
    }

    public UserDataDTO getUserDetails(String email){
        Optional<User> person = getUserByEmail(email);
        if(person.isPresent())
        {
            User user = person.get();
            return new UserDataDTO(user.getUsername(),user.getEmail());
        }
        else
            return null;
    }
}
