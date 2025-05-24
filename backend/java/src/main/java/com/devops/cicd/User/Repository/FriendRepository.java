package com.devops.cicd.User.Repository;

import com.devops.cicd.User.Entity.Friends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Collection;

public interface FriendRepository extends JpaRepository<Friends,Long> {

    @Query(value = "Select f.friend from friends f where f.user=:username and status=:status",nativeQuery = true)
    Collection<String> findFriendsOfUserByStatus(@Param("username") String username, @Param("status") String status);
}
