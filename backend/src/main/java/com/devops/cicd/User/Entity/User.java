package com.devops.cicd.User.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;
    private String username;
    private String password;

    public User(String e, String u, String p){
        password = p;
        username = u;
        email = e;
    }

    public String getPassword(){
        return password;
    }
    public String getUsername(){
        return username;
    }
    public String getEmail(){
        return email;
    }
    public Long getId(){
        return id;
    }

    public void setPassword(String p){
        password = p;
    }
    public void setUsername(String p){
        username = p;
    }
    public void setEmail(String p){
        email = p;
    }

}
