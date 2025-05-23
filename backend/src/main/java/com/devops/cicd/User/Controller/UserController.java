package com.devops.cicd.User.Controller;

import com.devops.cicd.User.DTO.UserDataDTO;
import org.springframework.web.bind.annotation.*;
import com.devops.cicd.User.DTO.RegisterDTO;
import com.devops.cicd.User.Service.UserService;
import org.springframework.http.ResponseEntity;

@RestController
public class UserController {

    private final UserService service;

    public UserController(UserService ser){
        service = ser;
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestHeader String email, @RequestHeader String password) {
        String response = service.login(email,password);
        return ResponseEntity.status(200).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO userDetails) {
        if(service.saveUser(userDetails).equals("Success"))
            return ResponseEntity.ok("Success");
        else
            return ResponseEntity.status(501).body("Wrong Password");
    }

    @GetMapping("/getUserDetails")
    public ResponseEntity<UserDataDTO> userDetails(@RequestHeader String email) {
        return ResponseEntity.ok(service.getUserDetails(email));
    }
    
}
