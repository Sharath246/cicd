package com.devops.cicd.User.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.devops.cicd.User.Entity.User;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByEmail(String email);
}
