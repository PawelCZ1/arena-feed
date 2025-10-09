package dev.pawelcz.arena_feed.repository;

import dev.pawelcz.arena_feed.entity.UserEntity;
import dev.pawelcz.arena_feed.projection.GetUserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    @Query("SELECT u.username AS username, u.email AS email, u.firstName AS firstName, u.lastName AS lastName FROM UserEntity u")
    List<GetUserProjection> getAllUsers();
}
