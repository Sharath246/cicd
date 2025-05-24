package com.devops.cicd.User.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import com.devops.cicd.User.DTO.FriendRequestDTO;
import com.devops.cicd.User.DTO.UserDataDTO;
import com.devops.cicd.User.Entity.Friends;
import com.devops.cicd.User.Repository.FriendRepository;
import com.devops.cicd.Utils.Constants;
import org.springframework.stereotype.Service;
import com.devops.cicd.User.DTO.RegisterDTO;
import com.devops.cicd.User.Entity.User;
import com.devops.cicd.User.Repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final FriendRepository friendRepo;

    public UserService(UserRepository userRepo, FriendRepository friendRepo){
        this.userRepo = userRepo;
        this.friendRepo = friendRepo;
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
            List<String> friends= friendRepo.findFriendsOfUserByStatus(user.getUsername(),Constants.FRIEND_REQUEST_ACCEPT).stream().toList();
            return new UserDataDTO(user.getUsername(),user.getEmail(),friends);
        }
        else
            return null;
    }

    public String friendRequest(FriendRequestDTO request){
        try{
            Friends friend = new Friends(request.user(),request.friend(),Constants.FRIEND_REQUEST_AWAIT,new Date());
            friendRepo.save(friend);
            return Constants.SUCCESSFUL;
        }
        catch(Exception e){
            return Constants.FAILED;
        }
    }
}
