package dev.pawelcz.arena_feed.service;


import dev.pawelcz.arena_feed.dto.CreateUserDto;
import dev.pawelcz.arena_feed.entity.UserEntity;
import dev.pawelcz.arena_feed.projection.GetAllUsersProjection;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<GetAllUsersProjection> getAllUsers();
    Optional<UserEntity> getUserById(Long id);
    CreateUserDto createUser(CreateUserDto dto);
}
