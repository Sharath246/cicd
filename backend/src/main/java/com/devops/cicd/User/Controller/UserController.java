package com.devops.cicd.User.Controller;

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
        if(service.login(email,password))
            return ResponseEntity.ok("Login Successful");        
        else
            return ResponseEntity.status(201).body("Wrong Password");
        
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO userDetails) {
        if(service.saveUser(userDetails).equals("Success"))
            return ResponseEntity.ok("Success");
        else
            return ResponseEntity.status(501).body("Wrong Password");
    }
    
    
}
