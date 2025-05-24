package com.devops.cicd.User.Entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "friends")
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String user;
    private String friend;
    private String status;
    private Date created;

    public Friends(String user, String friend,String status, Date d){
        this.user = user;
        this.friend = friend;
        this.status = status;
        this.created = d;
    }

    public Long getId(){
        return id;
    }
    public String getUser(){
        return user;
    }
    public String getFriend(){
        return friend;
    }
    public String getStatus(){
        return status;
    }
    public Date getDate(){
        return created;
    }
    public void setId(Long i){
        id = i;
    }
    public void setUser(String i){
        user = i;
    }
    public void setFriend(String i){
        friend = i;
    }
    public void setStatus(String i){
        status = i;
    }
    public void setDate(Date d){
        created = d;
    }
}
